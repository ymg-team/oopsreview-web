import mongodb from 'mongodb'
import debug from 'debug'

const mongoclient = mongodb.MongoClient
const debugMongo = debug('app:mongo')
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`
export default () => {
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(url, (err, client) => {
      if(err) {
        debugMongo('[error] to connect mongo')
        debugMongo(err, 'mongo')
      } else {
        debugMongo('[success] connected mongo server')
        const db = client.db(process.env.MONGO_DB)
        resolve(db)
      }
    })
  }).catch(e => {
    debugMongo(e)
  })
}