var api = require('instagram-node-lib');

/**
 * A simple DAO used to retrieve
 * data against Instagram API, wrapping node-instagram-lib module.
 * Used to retrieve the only data used by the application.
 * 
 * @param {string} clientId     Instagram Application client id
 * @param {string} clientSecret Instagram Application client secret key
 */
function Instagram(clientId, clientSecret) {
  var self = this;

  /**
   * Application client id.
   * 
   * @type {string}
   */
  this.clientId = clientId;

  /**
   * Application client secret key.
   * 
   * @type {string}
   */
  this.clientSecret = clientSecret;

  /**
   * Application callback url.
   * Used by Instagram to redirect after the authentication process.
   * 
   * @type {String}
   */
  this.callBackUrl = '';

  /**
   * Application redirect uri.
   * Used by Instagram to redirect after the authentication process.
   * 
   * @type {String}
   */
  this.redirectUri = '';

  // Set the client id and secret.
  api.set('client_id', this.clientId);
  api.set('client_secret', this.clientSecret);

  /**
   * Set the callback url.
   * 
   * @param {string} callBackUrl
   */
  this.setCallBackUrl = function(callBackUrl) {
    this.callBackUrl = callBackUrl;
    api.set('callback_url', this.callBackUrl);

    return this;
  };

  /**
   * Set the redirect url.
   * 
   * @param {string} redirectUri
   */
  this.setRedirectUri = function(redirectUri) {
    this.redirectUri = redirectUri;
    api.set('redirect_uri', this.redirectUri);

    return this;
  };

  /**
   * Set the api subscription.
   * 
   * @param  {Function} req
   * @param  {Function} res
   * @return {Object}
   */
  this.handshake = function(req, res) {
    return api.subscriptions.handshake(req, res);
  };

  /**
   * Subscribe to a particular tag.
   * 
   * @param  {string} tag
   * @return {Object}
   */
  this.subscribeToTag = function(tag) {
    if (typeof tag === 'undefined') {
      throw new Error('Please define a tag parameter');
    }

    api.subscriptions.subscribe({
      object: 'tag',
      object_id: tag,
      aspect: 'media',
      callback_url: self.callBackUrl,
      type: 'subscription'
    });

    return this;
  };

  /**
   * Return recent medias tagged with a specific tag.
   * 
   * @param  {string}   tag
   * @param  {Function} cb
   * @return {undefined}
   */
  this.getRecentMediaByTag = function(tag, cb) {
    if (typeof tag === 'undefined') {
      throw new Error('Please provide a valid callback function');
    }

    api.tags.recent({
      name: tag,
      complete: function(data) {
        return cb(data);
      }
    });
  };
}

module.exports = Instagram;
