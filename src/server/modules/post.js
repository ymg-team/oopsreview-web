import mongo from "./mongo"
import { ObjectId } from "mongodb"
import response from "../modules/response"

/**
 * @description function to update post on mongo db by post_id
 *
 */
export const updatePost = (req, res) => {
  const { title, content, tags, draft = false, image, video = '' } = req.body
  const currentTime = Math.round(new Date().getTime() / 1000)
  const _id = ObjectId(req.params.id)
  const postdata = {
    title,
    content,
    tags,
    draft: Boolean(draft == 'true' || draft == true),
    updated_on: currentTime,
    video
  }

  if(image) postdata.image = image

  mongo().then(db => {
    // is post available
    db.collection("posts")
      .aggregate([
        {
          $match: { _id }
        },
        {
          // select from specific key: https://stackoverflow.com/a/45738049/2780875
          $project: {
            _id: 1
          }
        }
      ])
      .toArray((err, result) => {
        if (err) {
          console.log(err)
          return res.send(500, response(500, "something wrong with mongo"))
        }

        if (result.length > 0) {
          // update data on mongo
          db.collection("posts").update({ _id }, { $set: postdata })

          res.send(201, response(201, "Post Updated"))
        } else {
          // post not available
          res.send(204, response(204, "Post not found"))
        }
      })
  })
}
