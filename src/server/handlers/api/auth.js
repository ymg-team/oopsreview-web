import { ObjectID } from 'mongodb'
import mongo from '../../modules/mongo'
import response from '../../modules/response'

export function login (req, res) {
  const {email, password} = req.body
  mongo().then(db => {
    db.collection('users').find({email, password})
    .toArray((err, result) => {
      // error from database
      if(err) {
          console.log(err)
          return res.send(500, response(500, 'something wrong with mongo'))
      }
      if(result.length < 1) res.send(204, 'email dan password tidak valid')
      res.send(201, response(201, 'login success', result[0]))
    })
  })
}
