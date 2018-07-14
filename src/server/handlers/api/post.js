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
    username,
    featured,
    lastid,
    lastcreatedon,
    tag,
    keyword
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

  // filter post by author username
  if (username) {
    aggregate.push({
      $match: { "author.username": username }
    })
  }

  // if tag: filter post by tagname
  if (tag) {
    aggregate.push({
      $match: { tags: { $regex: ".*" + tag + ".*" } }
    })
  }

  // if sort by featured post most viewed
  let sort = {}
  if (featured === "true") {
    sort = {
      $sort: {
        views: -1
      }
    }
  } else {
    sort = {
      $sort: {
        created_on: -1
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

  // filter / search by keyword
  if(keyword) {
    // ref: https://stackoverflow.com/a/2712896/2780875
    const re = new RegExp(keyword, "i")
    aggregate.push({
      $match: { title: re}
    })
  }

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

        if (result.length < 0)
          return res.send(200, response(204, "post not found"))

        // transform result
        const author = userTransformer(result[0].author[0])
        result = postTransformer(result[0])
        result.author = author

        // update: increment views
        db.collection("posts").update(
          { _id: ObjectID(result._id) },
          { $set: { views: result.views + 1 } }
        )

        res.send(200, response(200, "success", result))
      })
  })
}

export function create(req, res) {
  // get all post data

  const { title, content, tags = '' } = req.body
  const { image } = req.files

  // normalize tags
  let postdata = {
    title, 
    content,
    // ref: https://stackoverflow.com/a/39704153/2780875
    tags: tags.replace(/\s*,\s*/g, ","),
    comments: 0,
    views: 0,
    created_at: '',
    updated_at: '',
    user_id: 0
  }

  console.log(postdata)

  res.send(201, response(201, "Posted"))
}
