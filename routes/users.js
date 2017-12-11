var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  //console.log('asdasdas');
  res.render('index');
});

module.exports = router;
