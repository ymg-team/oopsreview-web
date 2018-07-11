import { ObjectID } from "mongodb"
import mongo from "../../modules/mongo"
import response from "../../modules/response"
import { encPassword } from "../../modules/password"

export function login(req, res) {
  const { email, password } = req.body
  encPassword(password, (err, passHash) => {
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
            console.log('logged in success, save userdata to session')
            return res.send(201, response(201, "login success", result[0]))
          }
        })
    })
  })
}

export function logout(req, res){
  console.log('logout success, destory session')
}
