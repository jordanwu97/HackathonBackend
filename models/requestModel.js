var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema(
{
  title: String,
  link: String
});

var RequestSchema = new mongoose.Schema(
{
  agronomistusername: String,
  farmerusername: String,
  pictures: [PictureSchema],
  farmercomment: String,
  agronomistcomment: String,
  title: String
});

module.exports = mongoose.model('Request', RequestSchema);
