var express    = require('express');
var path       = require('path');
var app        = module.exports = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var request    = require('request');
var id         = 'cd68515ce8c8486eacfb4b639008b8d7';
var secret     = '3e66f8a7eb1d4efa906ab8916b29e9c0';
var url        = 'http://onair.riplive.it';
var callback   = 'http://onair.riplive.it/photos';
var tags       = ['ripliveit', 'rugbysound'];
var Instagram  = require(__dirname + '/daos/instagram.js');
var Helper     = require(__dirname + '/services/helper.js');
var instagram  = new Instagram(id, secret);
var helper     = new Helper(io, instagram, request);

app.disable('x-powered-by');
app.set('port', process.env.PORT || 3001);
app.set('io', io);
app.set('instagram', instagram);
app.set('helper', helper);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

if (app.get('env') === 'development') {
  app.use(express.logger('dev'));
}

helper.init(url, callback, tags);
var routes = require('./routes');

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/photos', routes.photos);
app.post('/photos', routes.setPhoto);

server.listen(app.get('port'), function() {
  console.log('Instagrams parser up and running on ' + app.get('port'));
});
