var app       = require(__dirname + '/../app.js');
var instagram = app.get('instagram');
var io        = app.get('io');

instagram.set('client_id', app.get('clientId'));
instagram.set('client_secret', app.get('clientSecret'));
instagram.set('callback_url', 'http://onair.riplive.it/photos');
instagram.set('redirect_uri', 'http://onair.riplive.it/');

instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'ripliveit',
  aspect: 'media',
  callback_url: 'http://onair.riplive.it/photos',
  type: 'subscription',
  id: '#'
});

instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'rugbysound',
  aspect: 'media',
  callback_url: 'http://onair.riplive.it/photos',
  type: 'subscription',
  id: '#'
});

exports.photos = function(req, res, next) {
  var handshake = instagram.subscriptions.handshake(req, res);
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
