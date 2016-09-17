var express = require('express');
var router = express.Router();
var request = require('../models/request.js');

var passport = require('passport');
var confsecret = process.env.SECRET//require('../appconfig.js').secret; //secret, will change to use env.var
var jwt = require('express-jwt');
var auth = jwt({secret: confsecret, /*userProperty: 'payload'*/});

/* get requests that the farmer owns. */
router.post('/requestdatafarmer', auth, function(req, res) {
  validateUserGroup(req, res, "farmers", 
  function() {
    var query = request.find({'farmerusername': req.body.farmerusername});
    query.exec(function(err, docs)
    {
      if(err)
      {
        throw err;
      }
      else
      {
        console.log("farmer's data retrieved for farmer");
        res.json(docs);
      }
    });
  })
});

/* get request that are owned by the agronomist */
router.post('/requestdataagronomist', auth, function(req, res)
{
  validateUserGroup(req, res, "admin", 
  function() {
    var query = request.find({'agronomistusername': req.user.username});
    query.exec(function(err, docs)
    {
      if(err)
      {
        throw err;
      }
      else
      {
        console.log("agronomist's data retrieved")
        res.json(docs);
      }
    })
  })
});

router.post('/newrequest', auth, function(req, res)
{
  validateUserGroup(req, res, "farmers",   
  function() {
    console.log("farmer has made a new request");
    console.log(req.body.agronomistusername);
    var newRequest = new request(
    {
      agronomistusername: req.body.agronomistusername,
      farmerusername: req.body.farmerusername,
      pictures: [],
      farmercomment: "",
      agronomistcomment: ""
    });
    newRequest.save(function(err, entry)
    {
      if(err)
      {
        throw err;
      }
      console.log("new entry received");
      res.json(entry);
    });
  })
});

function validateUserGroup(req, res, auth_group, callback) {
  console.log(req.user.group)
    if(req.user.group == auth_group) 
      callback();
    else 
      res.json("no auth");
}

module.exports = router;
