var expect = require('expect.js');
var express = require('express');
var app = module.exports = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var id = 'cd68515ce8c8486eacfb4b639008b8d7';
var secret = '3e66f8a7eb1d4efa906ab8916b29e9c0';
var url = 'http://onair.riplive.it';
var callback = 'http://onair.riplive.it/photos';
var tags = ['ripliveit'];
var Instagram = require(__dirname + '/../daos/instagram.js');
var Helper = require(__dirname + '/../services/helper.js');
var instagram = new Instagram(id, secret);

var mock = [{
    changed_aspect: 'media',
    object: 'tag',
    object_id: 'ripliveit',
    time: 1404551388,
    subscription_id: 7829393,
    data: {}
}];

var endpointData = {
    url: 'https://api.instagram.com/v1/tags/ripliveit/media/recent?name=ripliveit&client_id=cd68515ce8c8486eacfb4b639008b8d7&max_tag_id=1405121618968950'
};

describe('Helper Class', function() {
    this.timeout(3000);

    server.listen(3001);
    var helper = new Helper(io, instagram, request);

    it('implements businness logic used to interact with Instagram API and all socket.io clients ', function() {
        expect(helper).to.be.an('object');
        expect(helper).to.have.property('io');
        expect(helper).to.have.property('instagram');
        expect(helper).to.have.property('request');
        expect(helper).to.have.property('init');
        expect(helper).to.have.property('handshake');
        expect(helper).to.have.property('getRecentMedia');
        expect(helper).to.have.property('getMedia');
        expect(helper).to.have.property('sendPhotoToClients');
    });

    describe('#init', function() {
        it('is used to set socket.io connection handler and Instagram Subscription', function() {
            helper.init(url, callback, tags);
        });
    });

    describe('#getMedia', function() {
        it('should retrieve an object with medias data from a specific Instagram Api endpoint', function(done) {
            helper.getMedia(endpointData, function(data) {
                expect(data).to.be.an('object');
                expect(data).to.have.property('pagination');
                expect(data).to.have.property('data');
                expect(data.data).to.be.an('array');
                done();
            })
        });
    });

    describe('#getRecentMedia', function() {
        it('should retrieve an array of object from Instagram', function(done) {
            helper.getRecentMedia(function(data) {
                expect(data).to.be.an('object');
                expect(data).to.have.property('pagination');
                expect(data).to.have.property('data');
                expect(data.data).to.be.an('array');
                done();
            });
        });
    });

    describe('#sendPhotoToClients', function() {
        it('should send instagram real time data to all socket.io clients', function(done) {
            helper.sendPhotoToClients(mock, function(err, data) {
                expect(data).to.be.an('object');
                expect(data).to.have.property('images')
                done();
            });
        });
    });
});
