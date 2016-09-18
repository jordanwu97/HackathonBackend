var mongoose = require('mongoose');

var IotSchema = new mongoose.Schema(
{
    unique_id: String,
    month: Number,
    time: Date,
    temperature: Number,
    humidity: Number
});

module.exports = mongoose.model('IOT', IotSchema);
