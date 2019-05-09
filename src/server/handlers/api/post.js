import { ObjectId } from "mongodb"
import mongo from "../../modules/mongo"
import response from "../../modules/response"
import { DB_DEFAULT_LIMIT, DB_DEFAULT_PAGE } from "../../const"
import { queryToObj } from "string-manager"
import * as post from "../../modules/post"
import * as cookies from "../../modules/cookies"
import * as file from "../../modules/file"
import * as cloudinary from "../../modules/cloudinary"

import postTransformer from "../../transformers/post"
import userTransformer from "../../transformers/user"

/**
 * @description function to select post by _id
 * @param {number} req.params.id id of post
 */
export function detail(req, res) {
  post.detailPost(req, res, {
    id: req.params.id,
    callback: json => {
      return res.send(200, response(200, "success", json))
    }
  })
}

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
    notid,
    lastcreatedon,
    tag,
    keyword,
    draft
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

  // don't get post by id
  // ref: https://stackoverflow.com/a/26118110/2780875
  if (notid) {
    aggregate.push({
      $match: { _id: { $nin: [ObjectId(notid)] } }
    })
  }

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

  // filter post by draft
  if (typeof draft != "undefined") {
    aggregate.push({
      $match: { draft: draft == "true" }
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
  if (keyword) {
    // ref: https://stackoverflow.com/a/2712896/2780875
    const re = new RegExp(keyword, "i")
    aggregate.push({
      $match: { title: re }
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
          return res.send(204, response(204, "no post available"))
        }
      })
  })
}

export function create(req, res) {
  // get all post data

  const { title, content, tags = "", draft = false, video = "" } = req.body
  const { image } = req.files || {}
  const currentTime = Math.round(new Date().getTime() / 1000)
  const user_id = cookies.get(req, res, "oopsreview_session")._id

  // not upload main image
  if (!image)
    return res.send(200, response(400, "Failed to post, image is required"))

  // upload image
  const filename = file.encName(image)
  const upload_path = `oopsreview/${new Date().getFullYear()}/${filename}`

  cloudinary.upload(image.path, upload_path, (err, result) => {
    if (err) {
      console.log("cloudinary error", err)
      res.send(
        201,
        response(201, "Terjadi Masalah Ketika Upload di Cloudinary")
      )
    } else {
      // normalize tags
      let postdata = {
        title,
        content,
        image: result.secure_url,
        // ref: https://stackoverflow.com/a/39704153/2780875
        tags: tags.replace(/\s*,\s*/g, ","),
        comments: 0,
        views: 0,
        created_on: currentTime,
        updated_on: currentTime,
        draft: Boolean(draft == "true" || draft == true),
        user_id: ObjectId(user_id),
        video
      }

      console.log("postdata", postdata)

      mongo().then(db => {
        // check is same title available
        db.collection("posts")
          .aggregate([
            {
              $match: { title }
            },
            {
              // select from specific key: https://stackoverflow.com/a/45738049/2780875
              $project: {
                _id: 1
              }
            }
          ])
          .toArray((err, results) => {
            if (err) {
              console.log(err)
              return res.send(500, response(500, "something wrong with mongo"))
            }

            if (results.length > 0) {
              // post available
              res.send(400, response(400, "Failed to post, duplicated title"))
            } else {
              // insert to mongodb
              db.collection("posts").insert(postdata)
              res.send(201, response(201, "Post Created"))
            }
          })
      })
    }
  })
}

/**
 * @description function to update post
 * @param {object} req.body
 * @param {object} req.files
 */
export function update(req, res) {
  const { image } = req.files || {}
  if (image) {
    // upload image
    const filename = file.encName(image)
    const upload_path = `oopsreview/${new Date().getFullYear()}/${filename}`
    cloudinary.upload(image.path, upload_path, (err, result) => {
      if (err) {
        console.log("cloudinary error", err)
        res.send(
          201,
          response(201, "Terjadi Masalah Ketika Upload di Cloudinary")
        )
      } else {
        req.body.image = result.secure_url
        return post.updatePost(req, res)
      }
    })
  } else {
    return post.updatePost(req, res)
  }
}

/**
 * @description function to delete post
 * @param {object} req.params
 * @param {number} req.params.id
 */
export function deletePost(req, res) {
  const { id } = req.params

  // mongodb query execution
  mongo().then(db => {
    db.collection("post").remove({ _id: id })
    // api response
    res.send(200, response(200, "Post deleted"))
  })
}

/**
 * @description function to test upload to cloudinary
 * @see https://cloudinary.com/documentation/node_image_upload
 */
export function testUploadCloudinary(req, res) {
  const { image } = req.files

  if (!image) {
    res.send(400, { message: "bad request" })
  } else {
    // create new name
    const filename = file.encName(image)

    const sample_image =
      "https://res.cloudinary.com/demo/image/upload/v1371282172/sample.jpg"

    cloudinary.upload(image.path, `oopsreview/test/${filename}`)
    res.send(201, { message: "file uploaded" })
  }
}
