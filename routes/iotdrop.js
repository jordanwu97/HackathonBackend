var express = require('express');
var router = express.Router();

var passport = require('passport');
var confsecret = process.env.SECRET//require('../appconfig.js').secret; //secret, will change to use env.var
var jwt = require('express-jwt');
var auth = jwt({secret: confsecret, /*userProperty: 'payload'*/});

var validateUserGroup = require('./validation').validateUserGroup;

var mongoose = require('mongoose');
var IOT = mongoose.model('IOT');

router.post('/iot', function(req, res, next)
{
  obj = {
        unique_id: req.body.ID,
        time: {
          month : req.body.month,
          day : req.body.day,
          year : req.body.year,
          hour : req.body.hour,
          minute : req.body.minute,
          second : req.body.second,
        },
        temperature: req.body.temperature,
        humidity: req.body.humidity
  }
  var iotSchema = new IOT(obj);
  iotSchema.save(function(err) {
      if(err){ return next(err); }
      res.json(obj);
    });
});

router.get('/iot', function(req, res, next) {
  IOT.find().exec(function(err, iotData) {
    if(err) 
      return next(err)
    else
      return res.json(iotData)
  })
})

router.delete('/iot', auth, function(req, res, next) { //wipes DB
    validateUserGroup(req, res, "admin", function() { //validate user as admin
      IOT.remove({}, function(err) { 
        console.log('collection removed');
        res.json('collection removed');
      })
    })
})

module.exports = router;
