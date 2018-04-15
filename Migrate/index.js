const admin = require('firebase-admin');
const firebase =  require('firebase');
const store = require('firebase/firestore');

var database = require("./testbayty-export (1).json");
var async = require ('async');
//var serviceAccount = require("./testbayty-firebase-adminsdk-422yx-d85a437445.json");
var serviceAccount = require("./bayty-246cc-firebase-adminsdk-bal2m-31a49973ce.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "bayty-246cc",
  apiKey: "AIzaSyBhKqdEYDnZdPpGjAZVt-68CbtGiwimFZQ"
});

var db = admin.firestore();

var allEntityNames = Object.keys(database);

var asyncTasks = [];
var batch = db.batch();

for (var i in allEntityNames) {
  var entityName = allEntityNames[i]; //product, idea, ..etc.
  //var entity = database[entityName]; // the name in .json file
  //var entityKeys = Object.keys(entity); // keys of Objects in products, idea, ...etc.

  /* START Asma Code */
  //var entityName = "product";
  var entity = database[entityName];
  var entityKeys = Object.keys(entity);
  console.log("began migrating "+ entityName);

  for (var j in entityKeys) {
    var entityKey = entityKeys[j];
    var entityRef = db.collection(entityName).doc(entityKey);
    //console.log("entityRef " + entityRef);

    var dict = entity[entityKey]
    //var dict = {dict2, timestamp: firebase.firestore.FieldValue.serverTimestamp()};
    batch.set(entityRef, dict);
  }
}
batch.commit().then(function() {
  console.log("Finished migrating "+ entityName);
});
  /* END Asma Code */


  // for (var j in entityKeys) {
  //   var entityKey = entityKeys[j]; //ex: j is -L6n1EYd4io7Uptv6vy- in products
  //   var dict = entity[entityKey]; //getting the whole object
  //   asyncTasks.push(function(callback){
  //     db.collection(entityName).doc(entityKey).set(dict)
  //       .then(function() {
  //         callback();
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //         callback();
  //       });
  //       });
  // }
  // async.parallel(asyncTasks, function(){
  //   console.log("Finished migrating "+ entityName);
  // });
