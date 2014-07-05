var app       = require(__dirname + '/../app.js');
var helper    = app.get('helper');

exports.photos = function(req, res, next) {
  var handshake = instagram.handshake(req, res);
};

exports.setPhoto = function(req, res, next) {
  var data = req.body;
  helper.sendPhotoToClients(data, function(err, data) {
    if (err) return next(err);

    res.send(201, {
      'status' : 'ok',
      'data': data
    });
  });
};
