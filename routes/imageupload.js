var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/imageupload', function(req, res, next) {
  console.log(req);
  res.json(req);
});

module.exports = router;