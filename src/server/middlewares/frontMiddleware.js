import * as postModule from "../modules/post"
import { stripTags } from "string-manager/dist/modules/html"
import { truncate } from "string-manager/dist/modules/truncate"

export const generateMetaPost = (req, res, next) => {
  const title_arr = req.params.title.split("-")
  const id = title_arr[title_arr.length - 1]
  req.no_count = true
  postModule.detailPost(req, res, {
    id,
    callback: json => {
      if(json && json._id) {
        req.meta = {
          title: json.title,
          desc: truncate(
            stripTags(json.content),
            500,
            "..."
          ),
          url: `https://oopsreview.com/post/${req.params.title}`,
          image: json.image.original
        }
      }
      return next()
    }
  })
}

export const generateMetaUser = (req, res, next) => {
  return next()
}
