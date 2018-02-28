'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NODE_ENV = process.env.NODE_ENV;


var html = '<!DOCTYPE html>   \n<html lang="en">\n  <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">\n      <title>Oopsreview - Software Review Specialist</title>\n      <link rel="manifest" href="/manifest.json">\n      <link rel="icon" href="/images/icons/icon-72x72.png">\n      <style>\n        body {\n          background-color: #000000;\n          color: $FFFFFF;\n        }\n      </style>\n  </head>\n  <body>\n      <div id="app">oopsreview rendering...</div>\n      ' + getScript() + '\n  </body>\n</html>';

function getScript() {
  var webpackAssets = require('../../public/webpack-assets.json');
  return '\n    <script src="/build/' + (NODE_ENV == 'production' ? webpackAssets.vendor.js : 'vendor.js') + '"></script>\n    <script src="/build/' + (NODE_ENV == 'production' ? webpackAssets.app.js : 'app.js') + '"></script>\n  ';
}

exports.default = function (req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html);
  res.end();
};