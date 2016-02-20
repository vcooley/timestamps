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
require('./routes')(app);

app.set('port', (process.env.PORT) || 5000);
server.listen(app.get('port'), function() {
  console.log('Express server listening on %d, in %s mode',
    config.port,
    'development');
});

module.exports = app;
