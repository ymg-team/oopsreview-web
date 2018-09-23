import MetaInfo from "../config/metainfo.js"

const { NODE_ENV } = process.env

const generateHtml = ({ meta = {} }) => {
  return `<!DOCTYPE html>   
<html lang="en">
  <head>
      <meta charset="utf-8">
      <title>${
        meta.title ? `${meta.title} - Oopsreview` : MetaInfo.title
      }</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta data-vmid="description" data-vue-meta="true" name="description" content="${meta.desc ||
        MetaInfo.description}" />
      ${
        meta.title
          ? `
        <meta name="twitter:card" content="summary"/>,
        <meta name="twitter:image" content="${meta.image ||
          "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"}"/>
        <meta name="twitter:title" content="${meta.title} - Oopsreview"/>
        <meta name="twitter:description" content="${meta.desc}" />

        <meta property="og:title" content="${meta.title} - Oopsreview" />
        <meta property="og:type" content="${meta.type || "blog"}" />
        <meta property="og:url" content="${meta.url ||
          "https://oopsreview.com"}" />
        <meta property="og:image" content="${meta.image ||
          "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"}" />
        <meta property="og:description" content="${meta.desc}" />
        `
          : ""
      }
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/images/icons/icon-72x72.png" />
      <link href="${
        NODE_ENV === "production"
          ? "/opensearch/production.xml"
          : "/opensearch/development.xml"
      }" rel="search" title="oopsreview" type="application/opensearchdescription+xml">
      <link rel="alternate" href="https://oopsreview.com" hreflang="en-US"/> 
      <style>
        body {
          background-color: #000000;
          color: $FFFFFF;
        }
      </style>
  </head>
  <body>
      <div id="app">oopsreview rendering...</div>
      <script>
        //global inline script
        document.addEventListener('click', function(e){
          // if(e.target.className === 'icono-caretDown') {}
          const dropdownEl = document.getElementsByClassName('dropdown');
          for(let n=0;n<dropdownEl.length;n++){
            dropdownEl[n].classList.remove('show')
          }
        })
      </script>
      ${getScript()}
  </body>
</html>`
}

function getScript() {
  const webpackAssets = require("../../internals/webpack-assets.json")
  return `
    <script src="${
      NODE_ENV == "production" ? webpackAssets.vendor.js : "/build/vendor.js"
    }"></script>
    
    <script src="${
      NODE_ENV == "production" ? webpackAssets.app.js : "/build/app.js"
    }"></script>
    
${
    NODE_ENV === "production"
      ? `
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-87936512-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-87936512-1');
        </script>
      `
      : ""
  }
  `
}

export default (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  })
  const html = generateHtml({
    meta: req.meta
  })
  res.write(html)
  res.end()
}
