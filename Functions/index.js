'use strict';
const functions = require('firebase-functions');
//const nodemailer = require('nodemailer');
var admin = require("firebase-admin");

var serviceAccount = require("./bayty-246cc-firebase-adminsdk-bal2m-31a49973ce.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayty-246cc.firebaseio.com"
});

// const gcs = require('@google-cloud/storage')({keyFilename: './bayty-c2bd7548d364.json'});
// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');



// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// const mailTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "appbaity@gmail.com",
//     pass: "kCX-Deo-bpr-Ry5",
//   },
// });

exports.generateThumbnail = require('./generateThumbnail');
exports.onPurchaseComplete = require('./onPurchaseComplete');
//exports.largeToThumbnail = require('./largeToThumbnail');


//
// // [START sendConfirmationEmails]
// /**
//  * Sends an email to normal user (buyier) and professional users(sellers).
//  */
// // [START onUpdateTrigger]
// exports.sendBuyingEmail = functions.database.ref('/basket/{id}').onUpdate((event, context) => {
//   // [END onUpdateTrigger]
//   // [START eventAttributes]
//   const snapshot = event.data;
//   //const val = snapshot.data(); // The user basket
//   /* PRODUCTION - The id of the user clicking 'اتمام العملية' recived as a parameter */
//   const userId = event.params.id;
//   console.log("###$# event.params.id "+event.params.id);
//
//   /* TESTING - we should provid an Id as the emulator does not recive the actual id*/
//   //const userId = "E0xeGw1dZfgEspNSRYRRepB7jMi2";
//
//   if (!snapshot.changed('completed')) {
//     return null;
//   }
//
// // get normal user email
// return admin.firestore().collection(NORMAL_REF).doc(userId)
//     .get().then(snapshot => {
//       console.log("#### VALUE ");
//       console.log("#### VALUE " + snapshot.data())
//       console.log("#### KEY " + snapshot.data().uid)
//       userEmail = snapshot.data().email;
//       console.log("#### userEmail " + userEmail);
//
// const items = getItemsInBasket(userId);
//
//   const mailOptions = {
//     from: '"Baity" <noreply@firebase.com>',
//     to: userEmail,
//   };
//
//   // Building Email message.
//   mailOptions.subject = 'تأكيد الطلب';
//   mailOptions.text = 'شكرا لاهتمامك سيتواصل معك أحد موظفينا قريبا';
//
//   return mailTransport.sendMail(mailOptions)
//     .then(() => console.log(`New confirmation email sent to:`))
//     .catch((error) => console.error('There was an error while sending the email:', error));
// });// end result
// }); // cosing normal user query
// // [END sendEmail]
//
// function getItemsInBasket(userId) {
//   var productIds = {};
//   var products = [];
//   var owners = [];
//    admin.database().ref(BASKET_REF + userId +'/items')
//     .once('value', snapshot => {
//       productIds = Object.keys(snapshot.val());
//       // Archiving the cart by calling moveCartToArchive
//       var archivedCart = moveCartToArchive(userId);
//       productIds.map(id => admin.firestore().collection(PRODUCT_REF).doc(id)
//           .get()
//           .then(snapshot => {
//             products.push(snapshot.data());
//             var product = snapshot.data();
//             owners.push(getOwnersEmails(product.owner, product));
//             console.log(" #### current product " + snapshot.data().owner);
//             return snapshot.data().owner;
//           })
//           .catch((error) => console.error('failed to get items: ', error))//closing inner query
//         );//closing map
//       }); //closing items query
// }
//
// function getOwnersEmails(owner, product) {
//   admin.firestore().collection(PROF_REF).doc(owner)
//     .get()
//     .then(snapshot => {
//       console.log("###### OWNER EMAIL: " + snapshot.data().email);
//       const mailOptions = {
//         from: '"Baity" <noreply@firebase.com>',
//         to: snapshot.data().email,
//       };
//       var url = 'https://bayty-246cc.firebaseapp.com/'+product.owner+'/products/'+product.id;
//       // Building Email message.
//       mailOptions.subject ='طلب شراء';
//       mailOptions.text = 'This item ' + url + ' has been requested by ' + userEmail;
//       mailOptions.html = '<b>Item '+product.id+' is being requested by '+userEmail+' <a href="'+url+'">'+product.name+'</a></b>';
//
//       return mailTransport.sendMail(mailOptions)
//         .then(() => {
//           console.log(`New confirmation email sent to:`)
//           return snapshot.data().email;})
//         .catch((error) => console.error('There was an error while sending the email:', error))
//     })
//     .catch((error) => console.error('failed to get email: ', error));
//     //closing inner query
//
// }
//
// function moveCartToArchive(userId) {
//   admin.database().ref(BASKET_REF + userId)
//   .once('value', snapshot => {
//     admin.database().ref(BASKET_ARCHIVE_REF + userId).set(snapshot.val())
//     .then(() => deleteBasket(userId))
//     .catch((error) => console.log('moveCartToArchive - ' + error))
//   });
// }
//
// function deleteBasket(userId){
//   admin.database().ref(BASKET_REF + userId).remove()
//     .then(() => console.log('deleteBasket - cart removed '))
//     .catch((error) => console.log('deleteBasket - ' + error));
// }
