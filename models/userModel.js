// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto'); //crypto module
var jwt = require('jsonwebtoken'); //jsonwebtoken module
//var config = require('../appconfig.js');
var secret = process.env.SECRET;


// set up a mongoose model and pass it using module.exports
var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email: String,
  group: String,
  hash: String,
  salt: String
});

UserSchema.methods.setGroup = function (email) {
  if(email.split("@")[1] == 'abinbev.com')
    this.group = 'agronomists';
  else
    this.group = 'farmers';
};

UserSchema.methods.setPassword = function(password){ //creating password
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); //what password is made into
};

UserSchema.methods.validPassword = function(password) { //validating password
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() { //creating jwt after valid pw

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id, //payload
    username: this.username,
    group:this.group,
    exp: parseInt(exp.getTime() / 1000), //expiration time
  }, secret);
};

mongoose.model('User', UserSchema);