import mongo from "../../modules/mongo"
import { toSlug } from "../../../../node_modules/string-manager/dist/modules/slug";
import { stripTags } from "../../../../node_modules/string-manager/dist/modules/html";
import { truncate } from "../../../../node_modules/string-manager/dist/modules/truncate";

/**
 * @description function to get feed / rss (xml)
 */
export function getFeed(req, res) {
  res.setHeader("Content-Type", "application/xml")
  let items = ""

  let aggregate = [
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "author"
      }
    }
  ]

  aggregate.push({
    $sort: {
      created_on: -1
    }
  })

  mongo().then(db => {
    db.collection("posts")
      .aggregate(aggregate)
      .skip(0)
      .limit(10)
      .toArray((err, result) => {
        if (err) {
          res.end("error get feed")
        } else {
          result.map(n => {
            items += `
            <item>
              <title>${n.title}</title>
              <description>${truncate(stripTags(n.content), 500, '[READ MORE...]')}</description>
              <link>https://oopsreview.com/post/${toSlug(n.title)}-${n._id}</link>
              <category domain="https://oopsreview.com">${n.tags.split(',').join('/')}</category>
              <pubDate>${n.created_on}</pubDate>
            </item>
            `
          })
          res.end(xmlFeedWrapper(items, result[0].created_on))
        }
      })
  })
}

// ref: http://www.feedforall.com/sample.xml
function xmlFeedWrapper(items = "",update_date = 0) {
  return `
  <rss version="2.0">
    <channel>Oopsreview Feed</channel>
    <description>Oopsreview is software review specialist</description>
    <link>https://oopsreview.com</link>
    <category domain="https://oopsreview.com">computers/software/internet</category>
    <copyright>Copyright 2017-2018 Id More Team.</copyright>
    <lastBuildDate>${update_date}</lastBuildDate>
    <language>en-us</language>
    <image>
      <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,h_60/v1532272510/oopsreview/2018/oopsreview.png</url>
      <title>Oopsreview Feed</title>
      <link>https://oopsreview.com</link>
      <description>Oopsreview is software review specialist</description>
      <width>60</width>
      <height>60</height>
    </image>
    ${items}
  </rss>
  `
}
