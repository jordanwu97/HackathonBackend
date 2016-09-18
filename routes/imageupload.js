var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/imageupload', function(req, res, next) {
  var base64string = req.body.image;
  //console.log(base64string);
  //console.log(req.body.hello);
  console.log(req.body);
  var bitmap = new Buffer(base64string, 'base64');
  
  var directory = 'images/' + req.body.farmerusername + '/' + req.body.inforequestid + '/';
  
  fs.writeFileSync('1' + '.jpg' , bitmap);
  
  res.json(req);
});

module.exports = router;
