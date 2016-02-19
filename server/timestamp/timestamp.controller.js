'use strict';

function getNaturalDate(date) {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };

  return date.toLocaleString('en-US', options);
}

var showTime = function (req, res) {
  var timestamp = req.params.timestamp;
  var date;
  var timeObj = {
    unix: null,
    natural: null
  };

  // Check the two conditions required for a valid timestamp
  if (Number(timestamp)) {
    date = new Date(Number(timestamp))
  }
  else if (Date.parse(timestamp)) {
    date = new Date(Date.parse(timestamp));
  }

  // If the timestamp was valid, set timeObj properties up.
  if (date) {
    timeObj.unix = date.getTime();
    timeObj.natural = getNaturalDate(date);
  }

  // Send response
  res
    .status(200, 'OK')
    .json(timeObj);
};

module.exports.showTime = showTime;
