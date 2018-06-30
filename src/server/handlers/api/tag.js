import mongo from "../../modules/mongo"
import response from "../../modules/response"

export function detail(req, res) {
  mongo().then(db => {
    db.collection('tags')
      .find({tag: req.params.name})
      .toArray((err, result) => {
        if(result.length > 0) {
          return res.send(200, response(200, 'OK', result[0]))
        } else {
          return res.send(response(204, 'tag not found'))
        }
      })
  })
}
