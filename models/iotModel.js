var mongoose = require('mongoose');

var IotSchema = new mongoose.Schema(
{
  iot_id: String,
  temperature: Number,
  humidity: Number,
});

module.exports = mongoose.model('IOT', IotSchema);
