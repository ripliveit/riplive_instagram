var app       = require(__dirname + '/../app.js');
var io        = app.get('io');
var instagram = app.get('instagram');
instagram.subscribeToTag('ripliveit', function(data) {
  console.log('paolino');
  console.log(data);
});







exports.photos = function(req, res, next) {
  var handshake = instagram.handshake(req, res);
};

exports.setPhoto = function(req, res, next) {
  var data = req.body;

  data.forEach(function(tag) {
      var url = 'https://api.instagram.com/v1/tags/' + tag.object_id + '/media/recent?client_id=CLIENT_ID';
      //sendMessage(url);

  });

  res.send(200, {
    'status' : 'ok',
    'message': 'Thank you!'
  });
};
