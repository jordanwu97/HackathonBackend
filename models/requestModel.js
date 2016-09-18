var mongoose = require('mongoose');

// var PictureSchema = new mongoose.Schema(
// {
//   title: String,
//   link: String
// });

var RequestSchema = new mongoose.Schema(
{
  agronomistusername: String,
  farmerusername: String,
  pictures: [],
  farmercomment: String,
  agronomistcomment: String,
  title: String
});

RequestSchema.methods.addPicComment = function(input,cb) {
  this.pictures = input;
  this.save(cb);
}

module.exports = mongoose.model('Request', RequestSchema);
