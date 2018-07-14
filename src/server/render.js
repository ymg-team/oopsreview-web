import MetaInfo from "../config/metainfo.ts"
const { NODE_ENV } = process.env

const html = `<!DOCTYPE html>   
<html lang="en">
  <head>
      <meta charset="utf-8">
      <title>${MetaInfo.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta name="description" content="${MetaInfo.description}" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/images/icons/icon-72x72.png" />
      <style>
        body {
          background-color: #000000;
          color: $FFFFFF;
        }
      </style>
  </head>
  <body>
      <div id="app">oopsreview rendering...</div>
      ${getScript()}
  </body>
</html>`

function getScript()
{
  const webpackAssets = require('../../internals/webpack-assets.json')
  return `
    <script src="/build/${NODE_ENV == 'production' ? webpackAssets.vendor.js : 'vendor.js'}"></script>
    <script src="/build/${NODE_ENV == 'production' ? webpackAssets.app.js : 'app.js'}"></script>
    ${
      NODE_ENV === 'production' ?
      `
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-87936512-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-87936512-1');
        </script>
      `
      : ''
    }
  `
}

export default (req,res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html)
  res.end()
}
