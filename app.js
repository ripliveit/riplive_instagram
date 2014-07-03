var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = module.exports = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



//app.set('instagram', instagram)

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.get('/auth', routes.auth);
app.get('/authorize', routes.authorize);
app.get('/photos', routes.photos);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Instagram parser up and running on ' + app.get('port'));
});
