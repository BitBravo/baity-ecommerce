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
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "appbaity@gmail.com",
    pass: "kCX-Deo-bpr-Ry5",
  },
});

// company name to include in the emails
const APP_NAME = 'Baity';
/* DATABASE REFERENCES FOR TESTING */
// const PROF_REF = '/test-professional/';
// const BASKET_REF = '/test-basket/';
// const BASKET_ARCHIVE_REF = '/test-basketArchive/';
// const NORMAL_REF = '/test-normal/';
// const PRODUCT_REF =  '/test-product/';

/* DATABASE REFERENCES FOR PRODUCTION */
const PROF_REF = '/professional/';
const BASKET_REF = '/basket/';
const BASKET_ARCHIVE_REF = '/basketArchive/';
const NORMAL_REF = '/normal/';
const PRODUCT_REF =  '/product/';

var userEmail = "";

// [START sendConfirmationEmails]
/**
 * Sends an email to normal user (buyier) and professional users(sellers).
 */
// [START onUpdateTrigger]
exports.sendBuyingEmail = functions.database.ref('/basket/{id}').onUpdate((event) => {
  // [END onUpdateTrigger]
  // [START eventAttributes]
  const snapshot = event.data;
  const val = snapshot.val(); // The user basket
  /* PRODUCTION - The id of the user clicking 'اتمام العملية' recived as a parameter */
  const userId = event.params.id;
  console.log("###$# event.params.id "+event.params.id);

  /* TESTING - we should provid an Id as the emulator does not recive the actual id*/
  //const userId = "E0xeGw1dZfgEspNSRYRRepB7jMi2";

  if (!snapshot.changed('completed')) {
    return null;
  }

// get normal user email
return admin.database().ref(NORMAL_REF + userId)
    .once('value', snapshot => {
      console.log("#### VALUE " + snapshot.val())
      console.log("#### KEY " + snapshot.val().uid)
      userEmail = snapshot.val().email;
      console.log("#### userEmail " + userEmail);

const items = getItemsInBasket(userId);

  const mailOptions = {
    from: '"Baity" <noreply@firebase.com>',
    to: userEmail,
  };

  // Building Email message.
  mailOptions.subject = 'تأكيد الطلب';
  mailOptions.text = 'شكرا لاهتمامك سيتواصل معك أحد موظفينا قريبا';

  return mailTransport.sendMail(mailOptions)
    .then(() => {console.log(`New confirmation email sent to:`);})
    .catch((error) => console.error('There was an error while sending the email:', error));
});// end result
}); // cosing normal user query
// [END sendEmail]

function getItemsInBasket(userId) {
  var productIds = {};
  var products = [];
  var owners = [];
   admin.database().ref(BASKET_REF + userId +'/items')
    .once('value', snapshot => {
      productIds = Object.keys(snapshot.val());
      // Archiving the cart by calling moveCartToArchive
      var archivedCart = moveCartToArchive(userId);
      productIds.map(id => admin.database().ref(PRODUCT_REF + id)
          .once('value')
          .then(snapshot => {
            products.push(snapshot.val());
            var product = snapshot.val();
            owners.push(getOwnersEmails(product.owner, product));
            console.log(" #### current product " + snapshot.val().owner);
            return snapshot.val().owner;
          })
          .catch((error) => console.error('failed to get items: ', error))//closing inner query
        );//closing map
      }); //closing items query
};

function getOwnersEmails(owner, product) {
  admin.database().ref(PROF_REF + owner)
    .once('value')
    .then(snapshot => {
      console.log("###### OWNER EMAIL: " + snapshot.val().email);
      const mailOptions = {
        from: '"Baity" <noreply@firebase.com>',
        to: snapshot.val().email,
      };
      var url = 'https://bayty-246cc.firebaseapp.com/'+product.owner+'/products/'+product.id;
      // Building Email message.
      mailOptions.subject ='طلب شراء';
      mailOptions.text = 'This item ' + url + ' has been requested by ' + userEmail;
      mailOptions.html = '<b>Item '+product.id+' is being requested by '+userEmail+' <a href="'+url+'">'+product.name+'</a></b>';

      mailTransport.sendMail(mailOptions)
        .then(() => {
          console.log(`New confirmation email sent to:`)
          return snapshot.val().email;})
        .catch((error) => console.error('There was an error while sending the email:', error))
    })
    .catch((error) => console.error('failed to get email: ', error));
    //closing inner query

};

function moveCartToArchive(userId) {
  admin.database().ref(BASKET_REF + userId)
  .once('value')
  .then(snapshot => {
    admin.database().ref(BASKET_ARCHIVE_REF + userId).set(snapshot.val())
    .then(() => deleteBasket(userId))
    .catch((error) => console.log('moveCartToArchive - ' + error))
  });
};

function deleteBasket(userId){
  admin.database().ref(BASKET_REF + userId).remove()
    .then(() => console.log('deleteBasket - cart removed '))
    .catch((error) => console.log('deleteBasket - ' + error));
};