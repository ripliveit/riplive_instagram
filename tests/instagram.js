var expect = require('expect.js');
var Instagram = require(__dirname + '/../daos/instagram.js');

var mock = {
    clientId: 'cd68515ce8c8486eacfb4b639008b8d7',
    clientSecret: '3e66f8a7eb1d4efa906ab8916b29e9c0',
    callBackUrl: 'http://onair.riplive.it/photos',
    redirectUri: 'http://onair.riplive.it/'
};

describe('Instagram DAO', function() {
    var instagram = new Instagram(mock.clientId, mock.clientSecret);

    it('Offer method to query against Instagram api', function() {
        expect(instagram).to.be.an('object');
        expect(instagram).to.have.property('clientId');
        expect(instagram).to.have.property('clientSecret');
        expect(instagram).to.have.property('callBackUrl');
        expect(instagram).to.have.property('redirectUri');
        expect(instagram).to.have.property('setCallBackUrl');
        expect(instagram).to.have.property('setRedirectUri');
        expect(instagram).to.have.property('handshake');
        expect(instagram).to.have.property('subscribeToTag');
    });

    describe('#setCallBackUrl', function() {
        it('Should set a callback url', function() {
            instagram.setCallBackUrl(mock.callBackUrl);
            expect(instagram.callBackUrl).to.be(mock.callBackUrl);
        });
    });

    describe('#setRedirectUri', function() {
        it('Should set a redirect uri', function() {
            instagram.setRedirectUri(mock.redirectUri);
            expect(instagram.redirectUri).to.be(mock.redirectUri);
        });
    });

    describe('#subscribeToTag', function() {
        it('Should subscribe to a particular tag', function() {
            instagram.subscribeToTag('ripliveit');
        });
    });

    describe('#getRecentMediaByTag', function() {
        it('Should return an array of recent media with a specific tag', function(done) {
            instagram.getRecentMediaByTag('ripliveit', function(data) {
                expect(data).to.be.an('array');
                done();
            });
        });
    });
});
