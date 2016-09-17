var express = require('express');
var router = express.Router();
var request = require('../models/request.js');

/* get requests that the farmer owns. */
router.get('/requestdatafarmer', function(req, res) {
  var query = request.find({}).sort({'farmerusername': 'test'});
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
});

/* get request that are owned by the agronomist */
router.get('/requestdataagronomist', function(req, res)
{
  var query = request.find({}).sort({'agronomistusername': 'test'});
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
  });
});

module.exports = router;
