var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idcon',function(req, res, next) {
  console.log(req.params);
  var response = {
    valor : true,
    name : req.params.idcon
  }
  res.jsonp(response);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
