'use strict';

var app = require('../app');
var request = require('supertest');
var should = require('should');
var timestamp = require('./timestamp.controller');

describe('/time', function() {

  describe('/:timestamp', function() {

    it('should send JSON with null values on invalid time', function(done) {
      request(app)
        .get('/time/here-is-an-invalid-time')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('unix');
          should(res.body.unix).equal(null);
          res.body.should.have.property('natural');
          should(res.body.natural).equal(null);
          done();
        });
    });
    it('should send unix and natural date with UNIX parameter', function(done) {
      var times = [0, -200000, 100, 100000000, 1];
      times.forEach(function(time) {
        var date = new Date(time);
        request(app)
          .get('/time/' + time)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            res.body.should.have.property('unix');
            res.body.unix.should.equal(date.getTime());
            res.body.should.have.property('natural');
            res.body.natural.should.equal();
            done();
          });
      });
    });

    it('should send unix and natural date with natural parameter');

  });

});