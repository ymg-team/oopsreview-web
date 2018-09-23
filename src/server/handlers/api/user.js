/**
 * created by yussan
 * created at 17/03/18 23.41
 * created using WebStorm
 */

import * as user from "../../modules/user"
import response from "../../modules/response" 

// get list users
export function getUsers(req, res) {
  
}

// get detail user by id
export function getUser(req, res) {
  user.profileUser(req, res, {
    username: req.params.username,
    callback: json => {
      return res.send(200, response(200, "success get user profile", json))
    }
  })
}
