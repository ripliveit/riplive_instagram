/**
 * A class that implements business logic
 * used to interact with all socket.io clients and
 * with instagram subscriptions.
 *
 * @param {Object} io        Socket Io server.
 * @param {Object} instagram An obj used to subscribe to Instagram API
 * @param {Object} request   An obj used to retrieve data from Instagram
 */

function Helper(io, instagram, request) {
    var self = this;

    /**
     * Socket.io server.
     *
     * @type {Object}
     */
    this.io = io;

    /**
     * Instagram DAO.
     *
     * @type {Object}
     */
    this.instagram = instagram

    /**
     * Request library.
     *
     * @type {Object}
     */
    this.request = request

    /**
     * On init set Application url and callback url
     * used by Instagram application.
     * Accepts an array of tags used to subscribe to Instagram
     * realtime api.
     * Set, finally, the socke.io server handler.
     *
     * @param  {string} url
     * @param  {string} callbackUrl
     * @param  {Array} tags
     * @return {undefined}
     */
    this.init = function(url, callbackUrl, tags) {
        if (typeof url === 'undefined') {
            throw new Error('Please define the url parameter');
        }

        if (typeof callbackUrl === 'undefined') {
            throw new Error('Please specify the  callbackUrl parameter');
        }

        if (!(tags instanceof Array)) {
            throw new Error('Please provide an array of tags to subscribe');
        }

        self.instagram.setRedirectUri(url).setCallBackUrl(callbackUrl);

        tags.forEach(function(tag) {
            self.instagram.subscribeToTag(tag);
        });

        self.io.on('connection', self.socketHandler);
    };

    /**
     * The websocket's handler.
     *
     * @param  {Object} socket
     * @return {undefined}
     */
    this.socketHandler = function(socket) {
        socket.on('getMedia', self.getMedia);

        self.getRecentMedia(function(data, pagination) {
            socket.emit('photos', data);
        });
    };

    /**
     * Set auth handshake with instagram.
     *
     * @param  {Function} req
     * @param  {Function} res
     * @return {Object}
     */
    this.handshake = function(req, res) {
        return self.instagram.handshake(req, res);
    };

    /**
     * Return a list of recent media.
     *
     * @param  {Function} cb
     * @return {undefined}
     */
    this.getRecentMedia = function(cb) {
        self.instagram.getRecentMediaByTag('ripliveit', function(data, pagination) {
            return cb({
                pagination: pagination,
                data: data
            });
        });
    };

    /**
     * Get media from a specific
     * Instagram API URL.
     *
     * @param  {Object} data
     * @param  {Function} cb
     * @return {undefined}
     */
    this.getMedia = function(data, cb) {
        if (!('url' in data)) {
            return false;
        }

        self.request({
            url: data.url,
            json: true
        }, function(err, res, body) {
            if (err) return false;

            if (res.statusCode == 200) {
                io.sockets.emit('photos', body);

                if (typeof cb !== 'undefined') {
                    cb(body);
                }
            }
        });
    };

    /**
     * First retrieve photos from Instagram.
     * Than broadcasts to all connected clients.
     *
     * @param  {Array}   data
     * @param  {Function} cb
     * @return {undefined}
     */
    this.sendPhotoToClients = function(data, cb) {
        if (typeof cb !== 'function') {
            throw new Error('Please provide a valid callback function');
        }

        if (!(data instanceof Array)) {
            throw new Error('Data is no an array');
        }

        data.forEach(function(item) {
            if (!('object_id' in item)) {
                return false;
            }

            var url = 'https://api.instagram.com/v1/tags/' + item.object_id + '/media/recent?client_id=cd68515ce8c8486eacfb4b639008b8d7';

            self.request({
                url: url,
                json: true
            }, function(err, res, body) {
                if (err) return cb(err, null);

                if (res.statusCode == 200) {
                    var toSend = body.data[0];
                    io.sockets.emit('photo', toSend);
                    cb(null, toSend);
                }
            });
        });
    };
}

module.exports = Helper;
