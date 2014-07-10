var app       = require(__dirname + '/../server.js');
var helper    = app.get('helper');

/**
 * Route used by instagram to handshake with the server.
 * 
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {undefined}
 */
exports.photos = function(req, res, next) {
  var handshake = helper.handshake(req, res);
};

/**
 * Send photo's data to all connected
 * client when instagram POST a photo.
 * 
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 * @return {undefined}
 */
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
