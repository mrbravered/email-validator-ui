var express = require('express');
var app = express();

app.use(express.static('dist'));


app.listen(8000, function () {
  console.log('ListQuality.com UI listening on port 8000');
});
