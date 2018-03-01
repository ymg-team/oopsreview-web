import restify from 'restify'
// import routes from './routes'
import render from './render'
import debug from 'debug'

const debugServer = debug('app:server')

// handlers
import mongo from './handlers/mongo'

const server = restify.createServer()
const port = process.env.PORT || 19090

// handlers initial
server.use(mongo)

// api route

// serve static file from public directory
server.get(/\/?.*\//, restify.plugins.serveStatic({
  directory: `${__dirname}/../../public`,
  maxAge: 0
}))

// render vuejs
server.on('NotFound', render)

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})