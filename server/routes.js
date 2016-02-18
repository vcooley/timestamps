'use strict';

module.exports = function(app) {

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
    res.end('Welcome');
  });
};
