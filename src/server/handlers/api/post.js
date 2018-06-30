import { ObjectID } from "mongodb"
import mongo from "../../modules/mongo"
import response from "../../modules/response"
import { DB_DEFAULT_LIMIT, DB_DEFAULT_PAGE } from "../../const"
import { queryToObj } from "string-manager"

import postTransformer from "../../transformers/post"
import userTransformer from "../../transformers/user"

/**
 * @description function to select post list by parameters
 * @param {limit} req.getQuery().limit total data to show
 */
export function list(req, res) {
  const {
    page,
    limit,
    user_id,
    featured,
    lastid,
    lastcreatedon,
    tag
  } = req.getQuery() ? queryToObj(req.getQuery()) : {}

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

  // if tag: filter post by tagname 
  if (tag) {
    aggregate.push({
      $match: { tags: {$regex: ".*" + tag + ".*"} }
    })
  }

  // if sort by featured post most viewed
  let sort = {}
  if (featured === "true") {
    sort = {
      $sort: {
        "views": -1
      }
    }
  } else {
    sort = {
      $sort: {
        "created_on": -1
      }
    }
  }
  aggregate.push(sort)

  // get loadmore data
  if (lastcreatedon) {
    aggregate.push({
      $match: { created_on: { $lt: parseInt(lastcreatedon) } }
    })
  }

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

        if (result.length > 0) {
          // transform data
          result.map((n, key) => {
            const author = userTransformer(n.author[0])
            result[key] = postTransformer(n)
            result[key].author = author
          })

          // success
          return res.send(200, response(200, "success", { result }))
        } else {
          return res.send(200, response(204, "no post available"))
        }
      })
  })
}

/**
 * @description function to select post by _id
 * @param {number} req.params.id id of post
 */
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

        if (result.length < 0)
          return res.send(200, response(204, "post not found"))

        // transform result
        const author = userTransformer(result[0].author[0])
        result = postTransformer(result[0])
        result.author = author

        res.send(200, response(200, "success", result))
      })
  })
}
