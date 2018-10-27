import * as postModule from "../modules/post"
import * as userModule from "../modules/user"
import { stripTags } from "string-manager/dist/modules/html"
import { truncate } from "string-manager/dist/modules/truncate"

export const generateMetaPostList = (req, res, next) => {
  let title = "Post"

  if(req.params.tag) title = `${title} by tag ${req.params.tag}`

  req.meta = {
    title,
    desc: `${title} on Oopsreview`,
    url: `https://oopsreview.com/${req.originalUrl}`,
    image: "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"
  }   

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
