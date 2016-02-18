'use strict';

var controller = require('./timestamp.controller');
var router = require('express').Router();

router.get('/:timestamp', controller.showTime);

module.exports = router;
