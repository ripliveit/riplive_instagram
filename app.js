var express   = require('express');
var path      = require('path');
var instagram = require('instagram-node-lib');
var app       = module.exports = express();
var server    = require('http').Server(app);
var io        = require('socket.io')(server);

app.set('port', process.env.PORT || 3001);
app.set('clientId', 'cd68515ce8c8486eacfb4b639008b8d7');
app.set('clientSecret', '3e66f8a7eb1d4efa906ab8916b29e9c0');
app.set('instagram', instagram);
app.set('io', io);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var routes    = require('./routes');

app.get('/photos', routes.photos);
app.post('/photos', routes.setPhoto);

server.listen(app.get('port'), function(){
  console.log('Instagrams parser up and running on ' + app.get('port'));
});