var mongoose = require('mongoose');

var IotSchema = new mongoose.Schema(
{
    unique_id: String,
    time: {},
    temperature: Number,
    humidity: Number
});

module.exports = mongoose.model('IOT', IotSchema);
