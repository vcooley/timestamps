'use strict';

var config = {
  ip: '127.0.0.1',
  port: 9000
};

// Set default environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

// Set up server, configure it, and add routes
var app = express();
var server = require('http').createServer(app);

app.use('/favicon.ico', function(req, res) {
  res.end('H')
});

app.use('/:timestamp', function(req, res) {
  var timestamp = req.params.timestamp;
  var date;
  var timeObj = {
    unix: null,
    natural: null
  };
  if (Number(timestamp)) {
    date = new Date(Number(timestamp))
  }
  else if (Date.parse(timestamp)) {
    date = new Date(Date.parse(timestamp));
  }
  if (date) {
    var options = {year: 'numeric', month: 'long', day: 'numeric'};
    timeObj.unix = date.getTime();
    timeObj.natural = date.toLocaleString('en-US', options);
  }
  res
    .status(200, 'OK')
    .json(timeObj);
});

app.use('/*', function(req, res) {
  res
    .status(200, 'OK')
    .end('Welcome')
});

server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode',
    config.port,
    'development');
});

module.exports = app;
