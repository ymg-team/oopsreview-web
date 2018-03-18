import { ObjectID } from 'mongodb'
import mongo from '../../modules/mongo'
import response from '../../modules/response'

export function login (req, res) {
  mongo().then(db => {
    db.collection('users').find({})
  })

  res.send(201, response(201, 'login success'))
}
