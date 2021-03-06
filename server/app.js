'use strict';

// Set default environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 9000;

var express = require('express');

// Set up server, configure it, and add routes
var app = express();
var server = require('http').createServer(app);
require('./routes')(app);

app.set('port', process.env.PORT);
server.listen(app.get('port'), function() {
  console.log('Express server listening on %d.', process.env.PORT);
});

module.exports = app;
