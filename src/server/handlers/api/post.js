import mongo from '../../modules/mongo'
import response from '../../modules/response'
import { DB_DEFAULT_LIMIT, DB_DEFAULT_PAGE } from '../../const'

import postTransformer from '../../transformers/post'
import userTransformer from '../../transformers/user'

export default (req, res) => {
  const { page, limit } = req.query
  mongo().then(db => {
    db.collection('posts').aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'author'
            }
        }
    ]).skip(page || 0).limit(limit || DB_DEFAULT_LIMIT)
      .toArray((err, result) => {
          // error from database
          if(err) {
              console.log(err)
              return res.send(500, response(500, 'something wrong with mongo'))
          }

          // transform data
          result.map(n => {
              n = postTransformer(n)
              n.author = userTransformer(n.author[0])
          })

          // success
          return res.send(200, response(200, 'success', { result }))
    })
  })
}