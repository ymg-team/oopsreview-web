import mongo from "../../modules/mongo"
import { epochToFormat } from "../../modules/dateTime"

/**
 * @description function to genereate sitemap of tags
 */
export function getSitemapTags(req, res) {
  res.setHeader("Content-Type", "application/xml")
  let items = ""

  let aggregate = []

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  })

  mongo().then(({db, client}) => {
    db.collection("tags")
      .aggregate(aggregate)
      .toArray((err, result) => {
        if (err) {
          res.end("error get sitemap")
        } else {

          client.close()

          // generate xml
          result.map(n => {
            items += `
            <url>
              <loc>https://oopsreview.com/tag/${n.tag.toLowerCase()}</loc>
              <lastmod>2018-08-09</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
          </url>
            `
          })
          res.end(xmlSitemapWrapper(items, 0))
        }
      })
  })
}

/**
 * @description function to generate sitemap of author
 */
export function getSitemapUsers(req, res) {
  res.setHeader("Content-Type", "application/xml")
  let items = ""

  let aggregate = []

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  })

  mongo().then(({db, client}) => {
    db.collection("users")
      .aggregate(aggregate)
      .toArray((err, result) => {
        if (err) {
          res.end("error get sitemap")
        } else {

          client.close()

          // generate xml
          result.map(n => {
            items += `
            <url>
              <loc>https://oopsreview.com/author/${n.username.toLowerCase()}</loc>
              <lastmod>${epochToFormat(n.created_on, "Y-M-D")}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
          </url>
            `
          })
          res.end(xmlSitemapWrapper(items, 0))
        }
      })
  })
}

/**
 * @description function to generate sitemap of posts
 */
export function getSitemapPosts(req, res) {
  res.setHeader("Content-Type", "application/xml")
  let items = ""

  let aggregate = []

  // order by desc
  aggregate.push({
    $sort: {
      created_on: -1
    }
  })

  mongo().then(({db, client}) => {
    db.collection("posts")
      .aggregate(aggregate)
      .toArray((err, result) => {
        if (err) {
          res.end("error get sitemap")
        } else {

          client.close()

          // generate xml
          result.map(n => {
            items += `
            <url>
              <loc>https://oopsreview.com/post/${(n.title.replace(/ /g,'-')).toLowerCase()}-${n._id}</loc>
              <lastmod>${epochToFormat(n.created_on, "Y-M-D")}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
          </url>
            `
          })
          res.end(xmlSitemapWrapper(items, 0))
        }
      })
  })
}

function xmlSitemapWrapper(items = "", update_date = 0) {
  return `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${items}
    </urlset> 
  `
}
