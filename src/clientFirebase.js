var admin = require("firebase-admin");

var serviceAccount = require("../domoticafamiliacanul-firebase-adminsdk-6zppa-55480729c8.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://domoticafamiliacanul.firebaseio.com"
});
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");



module.exports = {
  getHabitation: function(e){
    var habitacion = admin.firestore().collection('Habitacion');
    return habitacion.doc(e).get();
  }
  // getModule: function(e,m){
  //   var habitacion = admin.firestore().collection('Habitacion');
  //   return habitacion.doc(e).get();
  // }
}
