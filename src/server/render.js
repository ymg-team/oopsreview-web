const html = `<!DOCTYPE html>   
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
      <title>Oopsreview - Software Review Specialist</title>
      <link rel="manifest" href="/manifest.json">
      <style>
        body {
          background-color: #000000;
          color: $FFFFFF;
        }
      </style>
  </head>
  <body>
      <div id="app">oopsreview rendering...</div>
      <script src="/build/vendor.js"></script>
      <script src="/build/app.js"></script>
  </body>
</html>`

function getScript()
{

}

export default (req,res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html)
  res.end()
}