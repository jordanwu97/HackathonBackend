var express = require('express');
var fs = require('fs');
var router = express.Router();

var passport = require('passport'); //authentication
var confsecret = process.env.SECRET; //secret, will change to use env.var
var jwt = require('express-jwt');
var auth = jwt({secret: confsecret});

var validateUserGroup = require('./validation').validateUserGroup;

/* GET home page. */
router.post('/imageupload', auth, function(req, res, next) {
  validateUserGroup(req, res, "farmers",function() {
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
    
    res.json('success');
  })
});

module.exports = router;
