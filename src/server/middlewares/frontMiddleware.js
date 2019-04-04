import * as postModule from "../modules/post"
import * as userModule from "../modules/user"
import { stripTags } from "string-manager/dist/modules/html"
import { truncate } from "string-manager/dist/modules/truncate"

export const generateMetaPostList = (req, res, next) => {
  let title = "Post"

  if (req.params.tag) title = `${title} by tag ${req.params.tag}`

  req.meta = {
    title,
    desc: `${title} on Oopsreview`,
    url: `https://oopsreview.com/${req.originalUrl}`,
    image:
      "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"
  }

  req.html = `
    <div class="post-list">
      <h1>${`${title} on Oopsreview`}</h1>
      <div>Available ${title} on Oopsreview</div>
    </div>
  `

  return next()
}

export const generateMetaPost = (req, res, next) => {
  const title_arr = req.params.title.split("-")
  const id = title_arr[title_arr.length - 1]
  req.no_count = true
  return postModule.detailPost(req, res, {
    id,
    callback: json => {
      if (json && json._id) {
        req.meta = {
          title: json.title,
          desc: truncate(stripTags(json.content), 500, "..."),
          url: `https://oopsreview.com/post/${req.params.title}`,
          image: json.image.original
        }

        // generate html stringify
        req.html = `
          <div class="post-detail">
            <h1>${json.title}</h1>
            <figure>
              <img src="${json.image.original}" alt="${json.title}">
              <figcaption>${json.title}</figcaption>
            </figure>
            <article>
              ${json.content}
            </article>
            <div class="post-detail_tag">
              ${json.tags.map(n => {
                return `<a href="/tag/${n}">${n}</a>`
              })}
            </div>
          </div>
        `
      }

      return next()
    }
  })
}

export const generateMetaUser = (req, res, next) => {
  const { username } = req.params

  return userModule.profileUser(req, res, {
    username,
    callback: json => {
      if (json.username) {
        req.meta = {
          title: username,
          desc: `Post created by ${json.fullname || username}`,
          url: `https://oopsreview.com/author/${username}`,
          image: json.avatar.original
        }

        req.html = `
          <div className="author">
            <h1>Posted by ${username}</h1>
            <figure>
              <img src="${json.avatar.original}" alt="${username}" />
              <figcaption>${username}</figcaption>
            <figure>
          </div>
        `
      } else {
        req.meta = {
          title: "User Not Found",
          desc: "User Not Found",
          url: `https://oopsreview.com/author/${username}`
        }
        
      }

      return next()
    }
  })
}
