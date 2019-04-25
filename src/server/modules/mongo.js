import mongodb from 'mongodb'
import debug from 'debug'

const {MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_HOST} = process.env
const debugMongo = debug('app:mongo')
let url = ""
if(MONGO_USER && MONGO_PASSWORD) {
  url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
} else {
  url = `mongodb://${MONGO_HOST}`
}
export default () => {
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(url, (err, client) => {
      if(err) {
        debugMongo('[error] to connect mongo')
        debugMongo(err, 'mongo')
      } else {
        debugMongo('[success] connected mongo server')
        const db = client.db(MONGO_DB)
        resolve(db)
      }
    })
  }).catch(e => {
    debugMongo(e)
  })
}