var express = require('express');
var router = express.Router();
var fs = require('fs');
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
        console.log("agronomist's data retrieved");
        res.json(docs);
      }
    })
  })
});

router.get('/data', auth, function(req, res)
{
  switchUserGroup(req, res,
  function() {
    var query = request.find(); //username for agronomist pulled from awt token
    query.exec(function(err, docs)
    {
      if(err)
      {
        throw err;
      }
      else
      {
        console.log("agronomist's data retrieved");
        res.json(docs);
      }
    })
  },
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
  }
  )
});

function switchUserGroup(req, res, farmer_callback, agronomist_callback) { //validaton function
    if(req.user.group == 'agronomists')
      farmer_callback();
    else if (req.user.group == 'farmers')
      agronomist_callback();
    else
      res.json("no auth");
}

router.post('/new_request_farmer', auth, function(req, res)
{
  console.log(req.body);
  // req.body.pictures = [{
  //       data: "some data",
  //       comment: "some comment"
  //     }];
  validateUserGroup(req, res, "farmers",
  function() {
    console.log(req.user.username+" has made a new request");
    console.log(req.body); //get agronomist username from body
    var l = [];
    for(var j = 0; j<req.body.pictures.length; j++) {
        l.push(req.body.pictures[j].description);
    }
    console.log(l);
    var newRequest = new request(
    {
      agronomistusername: req.body.agronomistusername, //set agronomistusername for this request
      farmerusername: req.user.username, //set farmerusername as username from pulled from jwt
      pictures: l,
      farmercomment: req.body.farmercomment,
      agronomistcomment: "",
      title: req.body.title
    });
    // console.log(newRequest);
    newRequest.save(function(err, entry)
    {
      var id = entry.id;
      console.log(req.body.pictures.length);

      // console.log(entry.id);
      for (var i = 0;  i < req.body.pictures.length; i++) {
        var base64string = req.body.pictures[i].data;

        var bitmap = new Buffer(base64string, 'base64');
        // console.log('133');
        var directory = 'public/images/' + req.user.username + '/' + entry.id + '/'; 
        // console.log(directory)

        if(!fs.existsSync(directory)){
          fs.mkdirSync(directory);
          console.log('yo');
        }
        fs.writeFileSync(directory + i +'.jpg' , bitmap);
        
      }
      return res.json('success');
    });
  })
});

router.delete('/requests', auth, function(req, res, next) { //wipes DB
    validateUserGroup(req, res, "admin", function() { //validate user as admin
      request.remove({}, function(err) { 
        console.log('collection removed');
        res.json('collection removed');
      })
    })
})

module.exports = router;
