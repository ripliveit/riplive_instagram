var app       = require(__dirname + '/../app.js');
var io        = app.get('io');
var instagram = app.get('instagram');
var request = require('request');

instagram.subscribeToTag('ripliveit');
instagram.subscribeToTag('rugbysound');

io.on('connection', function(socket) {
  instagram.getRecentMediaByTag('ripliveit', function(data) {
    socket.emit('photos', data);
  });
});

exports.photos = function(req, res, next) {
  var handshake = instagram.handshake(req, res);
};

exports.setPhoto = function(req, res, next) {
  var data = req.body;

  data.forEach(function(tag) {
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id=CLIENT_ID';
      
      request(url, function((err, res, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) 
        }
      });
  });

  res.send(200, {
    'status' : 'ok',
    'message': 'Thank you!'
  });
};
