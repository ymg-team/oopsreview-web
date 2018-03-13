import mongo from '../../modules/mongo'
import response from '../../modules/response'

export default (req, res, next) => {
  mongo().then(db => {
    db.collection('posts').find().toArray((err, result) => {
      if(err) res.send(500, response(500, 'something wrong with mongo'))
      res.send(200, result)
    })
  })
}