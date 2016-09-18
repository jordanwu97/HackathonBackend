var express = require('express');
var path = require('path');
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

    console.log(req.body);
    var bitmap = new Buffer(base64string, 'base64');
    var directory = 'public/images/' + req.user.username+ '/'; 

    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory);
    }
    
    fs.writeFileSync(directory + req.body.inforequestid +'.jpg' , bitmap);
    
    res.json(directory + req.body.inforequestid +'.jpg');
  })
});


router.get('/image/:farmer/:pic_id', function(req,res,next) {
  res.sendFile(path.resolve('./public/images/'+req.params.farmer+'/'+req.params.pic_id+'.jpg'));
}) //sendfile through ajax

module.exports = router;
