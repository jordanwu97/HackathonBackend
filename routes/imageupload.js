var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/imageupload', function(req, res, next) {
  var base64string = req.body.pictures.data;
  //console.log(base64string);
  //console.log(req.body.hello);
  console.log(req.body);
  var bitmap = new Buffer(base64string, 'base64');
  var directory = 'public/images/' + req.body.inforequestid + '/'; 

  if(!fs.existsSync(directory)){
    fs.mkdirSync(directory);
  }
  
  fs.writeFileSync(directory+'1.jpg' , bitmap);
  
  res.json(req);
});

module.exports = router;
