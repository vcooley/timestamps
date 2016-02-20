'use strict';

var express = require('express');
var path = require('path');

module.exports = function(app) {

  app.use(express.static('public'));
  // Handle favicon requests
  app.use('/favicon.ico', function (req, res) {
    res.end('')
  });

  // Mount api endpoints
  app.use('/time', require('./timestamp'));

  // All other routes should direct to homepage
  app.route('/*', function (req, res) {
    res.redirect('/')
  });

  app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home.html'));
  });
};
