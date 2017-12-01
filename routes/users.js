var express = require('express');
var router = express.Router();

var ServerFirebase = require("../src/clientFirebase.js");



/* GET users listing. */
router.get('/', function(req, res, next) {
  var name = 1;
  setTimeout(()=>{
    console.log(name + 1);
    name++;
  },1000);
  res.render('index',{name : name,api : ServerFirebase.getFirebase});
});

module.exports = router;
