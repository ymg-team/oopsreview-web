'use strict';

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _seal = require('./handlers/seal');

var _seal2 = _interopRequireDefault(_seal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE_ENV = process.env.NODE_ENV;

// load .env configuration


// handlers

if (NODE_ENV == 'development') {
  require('dotenv').config();
}

var debugServer = (0, _debug2.default)('app:server');

var server = _restify2.default.createServer();
var port = process.env.PORT || 19090;

// global handler initial
server.use(_restify2.default.plugins.gzipResponse());
server.use(_restify2.default.plugins.bodyParser({
  mapParams: false,
  mapFiles: false,
  maxFieldsSize: 2 * 1024 * 1024
}));

// routes
(0, _routes2.default)(server);

if (NODE_ENV == 'development') {
  server.get('/api/generate-seal', _seal2.default);
}

// serve static file from public directory
server.get(/\/?.*\//, _restify2.default.plugins.serveStatic({
  directory: __dirname + '/../../public',
  maxAge: 0
}));

// render vuejs
server.on('NotFound', _render2.default);

server.listen(port, function () {
  debugServer('App SUCCESS run on port  ' + port);
});