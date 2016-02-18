'use strict';

var app = require('../app');
var request = require('supertest');
var timestamp = require('./timestamp.controller');

describe('/time', function() {

  describe('/:timestamp', function() {

    it('should send JSON with null values on invalid time', function(done) {
      request(app)
        .get('/time/here-is-an-invalid-time')
        .expect('Content-Type', 'application/json')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('unix');
          res.body.unix.should.be(null)
          res.body.should.have.property('natural');
          res.body.natural.should.be(null)
          done();
        });
    });
    it('should send unix and natural date with UNIX parameter', function(done) {

    });
    it('should send unix and natural date with natural parameter', function(done) {

    });

  });

});