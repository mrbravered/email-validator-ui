var express = require('express');
var app = express();

app.use(express.static('dist'));

// If the requested resource didn't match anything in the dist directory,
// we return index.html anyways, so the client-side router can handle
// the URL.
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(8000, function () {
  console.log('ListQuality.com UI listening on port 8000');
});
