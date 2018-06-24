import { ObjectID } from "mongodb"
import mongo from "../../modules/mongo"
import response from "../../modules/response"
import { DB_DEFAULT_LIMIT, DB_DEFAULT_PAGE } from "../../const"
import { queryToObj } from "string-manager"

import postTransformer from "../../transformers/post"
import userTransformer from "../../transformers/user"

export function list(req, res) {
  const { page, limit, user_id } = req.getQuery()
    ? queryToObj(req.getQuery())
    : {}

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

  // filter by author
  if (user_id)
    aggregate.push({
      $match: { user_id: ObjectID(user_id) }
    })

  mongo().then(db => {
    db.collection("posts")
      .aggregate(aggregate)
      .skip(parseInt(page) || 0)
      .limit(parseInt(limit) || DB_DEFAULT_LIMIT)
      .toArray((err, result) => {
        // error from database
        if (err) {
          console.log(err)
          return res.send(500, response(500, "something wrong with mongo"))
        }

        // transform data
        result.map(n => {
          const author = userTransformer(n.author[0])
          n = postTransformer(n)
          n.author = author
        })

        // success
        return res.send(200, response(200, "success", { result }))
      })
  })
}

export function detail(req, res) {
  const { id } = req.params
  if (id.length != 24) return res.send(200, response(204, "post not found"))

  mongo().then(db => {
    db.collection("posts")
      .aggregate([
        {
          $match: { _id: ObjectID(id) }
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "author"
          }
        }
      ])
      .toArray((err, result) => {
        // error from database
        if (err) {
          console.log(err)
          return res.send(500, response(500, "something wrong with mongo"))
        }

        if (result.length < 0) res.send(200, response(204, "post not found"))

        res.send(200, response(200, "success", result[0]))
      })
  })
}
