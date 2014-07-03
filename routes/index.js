var instagram = require('instagram-node').instagram();
var redirectTo = 'http://lolcahost/auth';

instagram.use({
  client_id: 'cd68515ce8c8486eacfb4b639008b8d7',
  client_secret: '3e66f8a7eb1d4efa906ab8916b29e9c0'
});

exports.index = function(req, res, next) {
  instagram.user_self_media_recent({
      count: 100
  }, function(err, data, pagination, limit) {
      if (err) {
          console.log(err);
      }

      if (data) {
          console.log(data);
      }
  });
};

exports.photos = function(req, res, next) {
  instagram.add_tag_subscription('funny', 'http://localhost:3000/photos', function(err, result, limit) {
    console.log(err);

    console.log(result);

    console.log(limit);
  });
};

exports.auth = function(req, res) {
  var code = req.query.code;

  instagram.authorize_user(code, redirectTo, function(err, result) {
      if (err) {
          console.log(err);
          res.send("Didn't work");
      } else {
          console.log('Yay! Access token is ' + result.access_token);
          res.send('You made it!!');
      }
  });
};

exports.authorize = function(req, res) {
  res.redirect(instagram.get_authorization_url(redirectTo, {
      scope: ['likes'],
      state: 'a state'
  }));
};
