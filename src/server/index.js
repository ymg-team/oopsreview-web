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

// server.get(/\/build\/?.*/, restify.serveStatic({
//   directory: '../public/build'
// }))

// function respond(req, res, next) {
//   res.writeHead(200, {
//     'Content-Type': 'text/html'
//   });
//   res.write('<b>ready</b>')
//   res.end()
// }

// routes for api

// render vuejs
server.on('NotFound', render)

server.listen(port, () => {
  debugServer(`App SUCCESS run on port  ${port}`)
})