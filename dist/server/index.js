'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _mongo = require('./handlers/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import routes from './routes'
var debugServer = (0, _debug2.default)('app:server');

// handlers


var server = _restify2.default.createServer();
var port = process.env.PORT || 19090;

// handlers initial
server.use(_mongo2.default);

// api route

// serve static file from public directory
server.get(/\/?.*\//, _restify2.default.plugins.serveStatic({
  directory: __dirname + '/../../public',
  maxAge: 0
}));

// routes for api

// render vuejs
server.on('NotFound', _render2.default);

server.listen(port, function () {
  debugServer('App SUCCESS run on port  ' + port);
});