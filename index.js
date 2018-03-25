var express = require('express');
var path = require('path');
var app = express();


var http = require('http').Server(app);
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('index.html');
});

http.listen(app.get('port'), function(){
  console.log('listening on '+app.get('port'));
});
