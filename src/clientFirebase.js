var admin = require("firebase-admin");

var serviceAccount = require("../domoticafamiliacanul-firebase-adminsdk-6zppa-55480729c8.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://domoticafamiliacanul.firebaseio.com"
});
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var config = {
    apiKey: "AIzaSyCa1oVDevhEEIbPmqnO94O_RhyT2RFP8e4",
    authDomain: "domoticafamiliacanul.firebaseapp.com",
    databaseURL: "https://domoticafamiliacanul.firebaseio.com",
    projectId: "domoticafamiliacanul",
    storageBucket: "domoticafamiliacanul.appspot.com",
    messagingSenderId: "812354704853"
  };
  firebase.initializeApp(config);

module.exports = {
  getHabitation: function(e){
    var habitacion = admin.firestore().collection('Habitacion');
    return habitacion.doc(e).get();
  },
  setHabitation: function(e,body){
    var habitacion = admin.firestore().collection('Habitacion');
    return habitacion.doc(e).set(body);
  },
  updateHabitation: function(e,body){
    var habitacion = admin.firestore().collection('Habitacion');
    return habitacion.doc(e).update(body);
  },
  getFirebase:function(e,doc){
    return firebase;
  }
  // getModule: function(e,m){
  //   var habitacion = admin.firestore().collection('Habitacion');
  //   return habitacion.doc(e).get();
  // }
}
