import { ObjectID } from "mongodb"
import mongo from "../../modules/mongo"
import response from "../../modules/response"
import { encString, decString, hashPassword } from "../../modules/password"
import * as cookies from "../../modules/cookies"

export function login(req, res) {
  const { email, password } = req.body
  const passHash = hashPassword(password)
  mongo().then(db => {
    db.collection("users")
      .find({ email, password: passHash })
      .toArray((err, result) => {
        // error from database
        if (err) {
          console.log(err)
          return res.send(500, response(500, "something wrong with mongo"))
        }
        if (result.length < 1) {
          return res.send(204, "email dan password tidak valid")
        } else {
          // login success and save userdata to session
          console.log("logged in success, save userdata to session")
          const encCookies = encString(JSON.stringify(result[0]))
          cookies.set(req, res, "oopsreview_session", encCookies)
          return res.send(201, response(201, "login success", result[0]))
        }
      })
  })
}

export function logout(req, res) {
  cookies.set(req, res, "oopsreview_session", "")
  return res.send(200, { message: "logout success" })
}

/**
 * function to to check is user logged in
 */
export function checkLogin(req, res, next) {
  const cookies = req.cookies.oopsreview_session
  let sessiondata = {}
  if (cookies) {
    sessiondata = decString(cookies)
    sessiondata = JSON.parse(sessiondata)
  }

  res.json(sessiondata || {})
}
