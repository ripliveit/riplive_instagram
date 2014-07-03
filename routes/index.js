Instagram = require('instagram-node-lib');
Instagram.set('client_id', 'cd68515ce8c8486eacfb4b639008b8d7');
Instagram.set('client_secret', '3e66f8a7eb1d4efa906ab8916b29e9c0');
Instagram.set('callback_url', 'http://onair.riplive.it/photos');
Instagram.set('redirect_uri', 'http://onair.riplive.it/');

Instagram.subscriptions.subscribe({
  object: 'tag',
  object_id: 'riplive',
  aspect: 'media',
  callback_url: 'http://onair.riplive.it/photos',
  type: 'subscription',
  id: '#'
});

exports.photos = function(req, res, next) {
  var handshake =  Instagram.subscriptions.handshake(req, res);
};


exports.setPhoto = function(req, res, next) {
  var data = req.body;
  console.log(data);
  res.send(200, 'ok');
};

