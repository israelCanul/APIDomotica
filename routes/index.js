var express = require('express');
var router = express.Router();
var ServerFirebase = require("../src/clientFirebase.js");

/* GET home page. */
router.get('/:idcon',function(req, res, next) {
  ServerFirebase.getHabitation(req.params.idcon)
  .then(doc=>{
    res.jsonp(doc.data());
  })
  .catch(err=>{
    res.jsonp(err);
  });
});
router.get('/:idcon/:component',function(req, res, next) {
  ServerFirebase.getHabitation(req.params.idcon)
  .then(doc=>{
    res.jsonp(doc.data()[req.params.component]);
  })
  .catch(err=>{
    res.jsonp(err);
  });
});



module.exports = router;
