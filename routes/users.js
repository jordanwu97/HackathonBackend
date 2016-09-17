var express = require('express');
var router = express.Router();

var passport = require('passport');
var confsecret = process.env.SECRET//require('../appconfig.js').secret; //secret, will change to use env.var
var jwt = require('express-jwt');
var auth = jwt({secret: confsecret, /*userProperty: 'payload'*/});

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/register', function(req, res, next){ //handles a request of post to /register
  console.log('yo')
  console.log(req.user.username);
  if(!req.body.username || !req.body.password){ //check all fields are filled
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password) //salt and hash password
  user.setGroup(req.body.email);

  user.save(function (err){ //save
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()}) //creates a JWT
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){ //checking fields
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){ //using passport to find user
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()}); //creates a JWT 
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
router.get('/allusers', auth, function(req, res, next) {
  console.log(req.user.username);

  User.find({}, function (err, user){
    res.json(user);
  })
})
function validateUserGroup(group) {
    if(group == 'admin') 
      return true;
    else 
      return false;

}

module.exports = router;
