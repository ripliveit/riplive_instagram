var app       = require(__dirname + '/../app.js');
var io        = app.get('io');
var instagram = app.get('instagram');

instagram.subscribeToTag('ripliveit');
instagram.subscribeToTag('rugbysound');

io.on('connection', function(socket) {
  instagram.getRecentMediaByTag('ripliveit', function(data) {
    socket.emit('photos', data);
  });
});
