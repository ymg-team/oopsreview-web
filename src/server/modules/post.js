import mongo from "./mongo"
import { ObjectId } from "mongodb"
import response from "../modules/response"
import userTransformer from "../transformers/user"
import postTransformer from "../transformers/post"

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

  mongo().then(({db, client}) => {
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

        client.close()

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

export const detailPost = (req, res, {id, callback}) => {
  if (id.length != 24) {
    if(req.no_count) return callback()
    return res.send(200, response(204, "post not found"))
  }

  mongo().then(({db, client}) => {
    db.collection("posts")
      .aggregate([
        {
          $match: { _id: ObjectId(id) }
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "author"
          }
        },
        {
          $lookup: {
            from: "apps",
            localField: "app_id",
            foreignField: "_id",
            as: "app"
          }
        }
      ])
      .toArray((err, result) => {
        // error from database
        if (err) {
          console.log(err)
          return res.send(500, response(500, "something wrong with mongo"))
        }

        client.close()

        if (result.length < 1) {
          if(req.no_count) return callback()
          return res.send(200, response(204, "post not found"))
        }

        // transform result
        const author = userTransformer(result[0].author[0])
        result = postTransformer(result[0])
        result.author = author

        // update: increment views
        if(!req.no_count)
          db.collection("posts").update(
            { _id: ObjectId(result._id) },
            { $set: { views: result.views + 1 } }
          )
        return callback(result)
      })
  })
}
