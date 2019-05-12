import mongo from "./mongo"
import response from "../modules/response"
import userTransformer from "../transformers/user"

/**
 * @description function to get user profile by username
 * @param {string} req.params.username
 */
export const profileUser = (req, res, {username, callback}) => {
  mongo().then(({db, client}) => {
    db.collection("users").aggregate([
      {
        $match: { username }
      },
    ]).toArray((err, result) => {
      // error from database
      if (err) {
        console.log(err)
        return res.send(500, response(500, "something wrong with mongo"))
      }

      client.close()

      if (result.length < 1) {
        return res.send(200, response(204, "user not found"))
      }

      const user = userTransformer(result[0])
      return callback(user)
    })
  }) 
}
