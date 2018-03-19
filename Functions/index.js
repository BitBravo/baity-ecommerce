/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
var admin = require("firebase-admin");

var serviceAccount = require("./bayty-246cc-firebase-adminsdk-bal2m-31a49973ce.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayty-246cc.firebaseio.com"
});
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
//const gmailEmail = functions.config().gmail.email;
//const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "appbaity@gmail.com",
    pass: "kCX-Deo-bpr-Ry5",
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Baity';

// [START sendConfirmationEmails]
/**
 * Sends an email to normal user (buyier) and professional users(sellers).
 */
 //functions.database.ref('/basket/uid/completed')
// [START onUpdateTrigger]
exports.sendBuyingEmail = functions.database.ref('/test-basket/{uid}').onUpdate((event) => {
  // [END onUpdateTrigger]
  // [START eventAttributes]
  const snapshot = event.data; // The complete var.
  const val = snapshot.val();
  //const userId = event.params.uid;
 const userId = "E0xeGw1dZfgEspNSRYRRepB7jMi2";
  if (!snapshot.changed('completed')) {
    return null;
  }

// get normal user email
  const listPromises = admin.database().ref('/test-normal')
      .orderByChild('uid').equalTo(userId)
      .once('value').then(snapshot => {
        var userEmail = snapshot.val().email
        console.log("userEmail " + userEmail);

  var productIds = {};
  var products = {};
  // get items from BASKET
  admin.database().ref('/test-basket/{userId}/items')
    .once('value').then(snapshot => {
      productIds = Object.keys(snapshot.val());
      productIds.map(id => admin.database().ref('/test-product')
          .orderByChild('id').equalTo(id)
          .once('value').then(snapshot => {
            products.push(snapshot.val());
            var currentProduct = snapshot.val();
            console.log(" current product " + snapshot.val())



// get professional (sellers) emails to send a notification about the purchase for each product
var owner = currentProduct.owner
admin.database().ref('/test-prof')
      .orderByChild('uid').equalTo(owner)
      .once('value').then(snapshot => {
        var ownerEmail = snapshot.val().email;
        console.log("ownerEmail " + ownerEmail);

  const mailOptions1 = {
    from: '"Baity" <noreply@firebase.com>',
    to: ownerEmail,
  };

  const completed = val.completed;

  // Building Email message.
  mailOptions1.subject = completed ? 'طلب شراء': null;
  mailOptions1.text = completed ? `'تم طلب المنتج ${product.name} من قبل ${userEmail} التواصل معه لاتمام العملية`: null;

  // [END eventAttributes]

  return mailTransport.sendMail(mailOptions1)
    .then(() => console.log(`New ${completed ? '' : 'un'} confirmation email sent to:`, ownerEmail))
    .catch((error) => console.error('There was an error while sending the email:', error));
}); // closing professional query



  const mailOptions = {
    from: '"Baity" <noreply@firebase.com>',
    to: userEmail,
  };

  const completed = val.completed;

  // Building Email message.
  mailOptions.subject = completed ? 'طلب شراء': null;
  mailOptions.text = completed ? 'شكرا لاهتمامك سيتواصل معك أحد موظفينا قريبا': null;

  // [END eventAttributes]


})); // closing products callback then map
}); // closing basket callback
return mailTransport.sendMail(mailOptions)
  .then(() => console.log(`New ${completed ? '' : 'un'} confirmation email sent to:`, userEmail))
  .catch((error) => console.error('There was an error while sending the email:', error));
}); // closing the callback from retriving normal user email

var result = Promise.all(listPromises);
return result;

});
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
// function sendWelcomeEmail(email, displayName) {
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//   };
//
//   // The user subscribed to the newsletter.
//   mailOptions.subject = `Welcome to ${APP_NAME}!`;
//   mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
//   return mailTransport.sendMail(mailOptions).then(() => {
//     return console.log('New welcome email sent to:', email);
//   });
// }
//
// // Sends a goodbye email to the given user.
// function sendGoodbyEmail(email, displayName) {
//   const mailOptions = {
//     from: `${APP_NAME} <noreply@firebase.com>`,
//     to: email,
//   };
//
//   // The user unsubscribed to the newsletter.
//   mailOptions.subject = `Bye!`;
//   mailOptions.text = `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`;
//   return mailTransport.sendMail(mailOptions).then(() => {
//     return console.log('Account deletion confirmation email sent to:', email);
//   });
// }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
