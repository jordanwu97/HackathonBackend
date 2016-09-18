var express = require('express');
var router = express.Router();
var request = require('../models/requestModel.js');

var passport = require('passport');
var confsecret = process.env.SECRET//require('../appconfig.js').secret; //secret, will change to use env.var
var jwt = require('express-jwt');
var auth = jwt({secret: confsecret, /*userProperty: 'payload'*/});

var validateUserGroup = require('./validation').validateUserGroup;

/* get requests that the farmer owns. */
router.get('/data_farmer', auth, function(req, res) {
  validateUserGroup(req, res, "farmers", //callbacks for authentication
  function() {
    var query = request.find({'farmerusername': req.user.username}); //username of authenticated user
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
router.get('/data_agronomist', auth, function(req, res)
{
  validateUserGroup(req, res, "agronomists", 
  function() {
    var query = request.find({'agronomistusername': req.user.username}); //username for agronomist pulled from awt token
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

router.post('/new_request_farmer', auth, function(req, res)
{
  console.log(req.body);
  validateUserGroup(req, res, "farmers",   
  function() {
    console.log(req.user.username+" has made a new request");
    console.log(req.body); //get agronomist username from body
    var newRequest = new request(
    {
      agronomistusername: req.body.agronomistusername, //set agronomistusername for this request
      farmerusername: req.user.username, //set farmerusername as username from pulled from jwt
      pictures: [],
      farmercomment: req.body.comment,
      agronomistcomment: ""
    });
    // console.log(newRequest);
    newRequest.save(function(err, entry)
    {
      if(err)
      {
        throw err;
      }
      // console.log(entry);
      res.json(entry);
    });
  })
});

module.exports = router;
