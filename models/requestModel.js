var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema(
{
  agronomistusername: String,
  farmerusername: String,
  pictures: [String],
  farmercomment: String,
  agronomistcomment: String
});

module.exports = mongoose.model('Request', RequestSchema);
