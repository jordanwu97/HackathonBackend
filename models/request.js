var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema(
{
  username: String,
  pictures: [String],
  comment: String
});

mongoose.model('Request', RequestSchema);
