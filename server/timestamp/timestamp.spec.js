'use strict';

var app = require('../app');
var request = require('supertest');
var should = require('should');
var timestamp = require('./timestamp.controller');

// Function used for request. Takes a test and a done function.
var testRequest = function (test, done) {
  request(app)
    .get('/time/' + test.arg)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) {
        done(err);
      }
      res.body.should.have.property('unix');
      res.body.unix.should.equal(date.getTime());
      res.body.should.have.property('natural');
      res.body.natural.should.equal(test.naturalExpected);
      done();
    });
};

// Constructs tests. times should be an array of times (UTC or otherwise)
// Returns an array of tests to run.
var testConstructorUnix = function(times) {
  return times.map(function (time) {
    var test = {arg: time, unixEpected: time};
    var date = new Date(time * 1000);
    test.naturalExpected = timestamp.naturalDate(date);
    return test;
  });
};

// Like testConstructorUnix, but takes a natural date
var testConstructorNatural = function(times) {
  return times.map(function (time) {
    var test = {arg: time, unixEpected: time};
    var date = new Date(Date.parse(time));
    test.naturalExpected = timestamp.naturalDate(date);
    return test;
  });
};

describe('/time', function() {

  describe('/:timestamp', function() {

    it('should send JSON with null values on invalid time', function(done) {
      request(app)
        .get('/time/here-is-an-invalid-time')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            done(err);
          }
          res.body.should.have.property('unix');
          should(res.body.unix).equal(null);
          res.body.should.have.property('natural');
          should(res.body.natural).equal(null);
          done();
        });
    });

    it('should send unix and natural date with UNIX parameter', function() {
      var times = [0, -200000, 100, 100000000, -1];
      var tests = testConstructorUnix(times);

      tests.forEach(function (test) {
        it('gets correct JSON', function (done) {
          testRequest(test, done);
        });
      });
    });

    it('should send unix and natural date with natural parameter', function() {
      var times = [
        'January 1, 1970',
        'August 16, 1906',
        'December 31, 2002',
        'July 21, 2045'
        ];
      var tests = testConstructorNatural(times);

      tests.forEach(function (test) {
        it('gets correct JSON', function (done) {
          testRequest(test, done);
        });
      });
    });

  });

});