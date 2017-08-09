const mongoose = require('mongoose');

const EcgData = mongoose.model('EcgData', {
  rawVoltage: [Number],
  intervals: Number,
  peaks: Number,
});

module.exports = EcgData;