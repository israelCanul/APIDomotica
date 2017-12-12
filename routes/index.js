var express = require('express');
var router = express.Router();
var ServerFirebase = require("../src/clientFirebase.js");
const cors = require('cors')({origin :true });


/* GET home page. */
router.get('/:idcon',function(req, res, next) {

    ServerFirebase.getHabitation(req.params.idcon)
    .then(doc=>{
      if(doc.exists){
        res.jsonp({code : 1,data : doc.data()});
      }else{
        res.jsonp({code : 0,data : "No existe el codigo proporcionado"});
      }
    })
    .catch(err=>{
      res.jsonp(err);
    });

});
router.post('/:idcon',function(req, res, next){
    var response = {
      code : 1,
      value : ""
    }
    var parametros = req.body;
    if(typeof parametros.active == 'undefined' || typeof parametros.active != 'boolean' ||  typeof parametros.descripcion == 'undefined'){
      response.code = 0;
      response.params = parametros;
      response.value = "Faltan variables obligatorias de objeto";
      res.jsonp(response);
    }
    ServerFirebase.getHabitation(req.params.idcon)
    .then(documentSnapshot=>{
      if(!documentSnapshot.exists){
        ServerFirebase.setHabitation(req.params.idcon,req.body)
        .then(doc=>{
          response.code = 1;
          response.operation = "set";
          response.value = doc._writeTime;
          res.jsonp(response);
        })
        .catch((err) => {
          response.code = 0;
          response.value = err;
          res.jsonp(response);
        });
      }else{
        ServerFirebase.updateHabitation(req.params.idcon,req.body)
        .then(doc=>{
          response.code = 1;
          response.operation = "update";
          response.value = doc._writeTime;
          res.jsonp(response);
        })
        .catch((err) => {
          rresponse.code = 0;
          response.value = err;
          res.jsonp(response);
        });
      }
    })
    .catch(err=>{
      rresponse.code = 0;
      response.value = err;
      res.jsonp(response);
    });
});
router.get('/:idcon/:component/:get',function(req, res, next) {
  ServerFirebase.getHabitation(req.params.idcon)
  .then(doc=>{
      res.jsonp({code : 1,get :req.params.get, data : doc.data()[req.params.component][req.params.get]});
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
