var express    = require('express');
var path       = require('path');
var app        = module.exports = express();
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var request    = require('request');
var config     = process.env.NODE_ENV === 'production' ? 
					require(__dirname + '/config/production.js') : 
					require(__dirname + '/config/development.js');
var id         = config.id;
var secret     = config.secret;
var url        = config.url;
var callback   = config.callback;
var tags       = config.tags;
var Instagram  = require(__dirname + '/daos/instagram.js');
var Helper     = require(__dirname + '/services/helper.js');
var instagram  = new Instagram(id, secret);
var helper     = new Helper(io, instagram, request);
helper.init(url, callback, tags);

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

var routes = require('./routes');

app.get('/photos', routes.photos);
app.post('/photos', routes.setPhoto);

server.listen(app.get('port'), function() {
  console.log('Instagrams parser up and running on ' + app.get('port'));
});
