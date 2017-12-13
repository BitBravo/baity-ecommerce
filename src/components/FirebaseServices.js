import { app, base, database, storage } from "../base";
import firebase from "firebase";


/************************************************************
 *            TESTING
 ************************************************************/

//TODO since we need to prepare a testing vs. production
//building scripts

/************************************************************
 *            PRODUCTION
 ************************************************************/
//The following is the database object.
//IMPORTANT: you can not use the following DB object as root reference. To get the root reference use database.ref().
let DB_BASE = database.ref();
//The following is the sotrage object.
//IMPORTANT: you can not use the following storge object as bucket root reference. To get the bucket root reference use storage.ref().
let STORAGE_BASE = storage.ref();

let testPrefix = "test-"; //change this to switch from test tables to production tables

let _PRODUCTS_PATH = testPrefix + "product"; //change me by removing test
let _IDEAS_PATH = "idea";
let _USER_POSTS_PATH = "userPosts";
let _PRODUCT_DEPTS_PATH = "productDepartment";
let _IDEA_DEPTS_PATH = "ideaDepartment";
//let _USERS_PATH = "testUsers"; //change me by removing test
let _BUSINESSES_PATH = testPrefix + "business"; //change me by removing test
let _LIKES_PATH = "likes";
let _GROUPS_PATH = testPrefix + "group"; //change me by removing test
let _BUSINESS_LOGOS_PATH = testPrefix + "BusinessLogo";
let _PRODUCT_IMAGES_PATH = testPrefix + "ProductImages";
let _IDEA_IMAGES_PATH = "ideaImage";
let _PROFILE_IMAGES_PATH = testPrefix + "profileImage";
let _PROF_PATH = testPrefix + "professional";

// DB references
//You can use child() only on references (i.e. database.ref() but not database itself)
let _REF_BASE = DB_BASE;
let _REF_PRODUCT = DB_BASE.child(_PRODUCTS_PATH); //change me by removing test
let _REF_IDEA = DB_BASE.child(_IDEAS_PATH);
let _REF_USER_POSTS = DB_BASE.child(_USER_POSTS_PATH);
let _REF_PRODUCT_DEPARTMENT = DB_BASE.child(_PRODUCT_DEPTS_PATH);
let _REF_IDEA_DEPARTMENT = DB_BASE.child(_IDEA_DEPTS_PATH);
// let _REF_USERS = DB_BASE.child(_USERS_PATH); //change me by removing test
let _REF_BUSINESS = DB_BASE.child(_BUSINESSES_PATH); //change me by removing test
let _REF_USER_LIKES = DB_BASE.child(_LIKES_PATH);
let _REF_GROUP = DB_BASE.child(_GROUPS_PATH); //change me by removing test
let _REF_PROF = DB_BASE.child(_PROF_PATH)

// Storage reference
var _REF_BUSINESS_LOGO = STORAGE_BASE.child(_BUSINESS_LOGOS_PATH); //change me by removing test
var _REF_PRODUCT_IMAGE = STORAGE_BASE.child(_PRODUCT_IMAGES_PATH); //change me by removing test
var _REF_IDEA_IMAGE = STORAGE_BASE.child(_IDEA_IMAGES_PATH);
var _REF_PROFILE_IMAGE = STORAGE_BASE.child(_PROFILE_IMAGES_PATH); //change me by removing test

// We are exporting an nonymous object.
// To import simply write:
// import FirebaseServices from './FirebaseServices.js' (you can replace FirebaseServices with whatever you like)
// Notice that by exporting an anonymous object you loose performance
// See: (https://medium.com/@rauschma/note-that-default-exporting-objects-is-usually-an-anti-pattern-if-you-want-to-export-the-cf674423ac38)
export default {
  get PRODUCTS_PATH() {
    return _PRODUCTS_PATH;
  },
  get IDEAS_PATH() {
    return _IDEAS_PATH;
  },
  get USER_POSTS_PATH() {
    return _USER_POSTS_PATH;
  },
  get PRODUCT_DEPTS_PATH() {
    return _PRODUCT_DEPTS_PATH;
  },
  get IDEA_DEPTS_PATH() {
    return _IDEA_DEPTS_PATH;
  },
  // get USERS_PATH() {
  //   return _USERS_PATH;
  // },
  get BUSINESSES_PATH() {
    return _BUSINESSES_PATH;
  },
  get LIKES_PATH() {
    return _LIKES_PATH;
  },
  get GROUPS_PATH() {
    return _GROUPS_PATH;
  },
  get BUSINESS_LOGOS_PATH() {
    return _BUSINESS_LOGOS_PATH;
  },
  get PRODUCT_IMAGES_PATH() {
    return _PRODUCT_IMAGES_PATH;
  },
  get IDEA_IMAGES_PATH() {
    return _IDEA_IMAGES_PATH;
  },
  get PROFILE_IMAGES_PATH() {
    return _PROFILE_IMAGES_PATH;
  },
  get PROF_PATH() {
    return _PROF_PATH;
  },
  get root() {
    return DB_BASE;
  },
  get products() {
    return _REF_PRODUCT;
  },
  // get users() {
  //   return _REF_USERS;
  // },
  get groups() {
    return _REF_GROUP;
  },
  get businesses() {
    return _REF_BUSINESS;
  },
  get businessLogos() {
    return _REF_BUSINESS_LOGO;
  },
  get profileImages() {
    return _REF_PROFILE_IMAGE;
  },
  get professionals() {
    return _REF_PROF;
  },
  
  
  //create a professional user (i.e., business user) along with the group but not the business details
  // user is the object from firebase.auth.
  createProfUser(user, phoneNo, coName) {
    let group = "prof";
    let dateCreated = Date.now();
    let businessObj = {
      owner: user.uid,
      email: user.email,
      phone: phoneNo,
      country: "Saudi Arabia",
      businessName: coName,
      dateCreated: dateCreated
    }
    var businessId = this.businesses.push().key;
    let userObj = {
      businessId: businessId,
      uid: user.uid,
      provider: user.providerData[0].providerId, //assuming a user has only one provider. Change me to user forEach and search using the email
      email: user.email,
      // phone: phoneNo,
      name: coName,
      dateCreated: dateCreated,
      // country: "Saudi Arabia",
      // city: "", //we get it later on from profile
      userGroup: group
    };
    var updates = {};
    updates[`${_PROF_PATH}/${user.uid}`] = userObj;
    updates[`${_GROUPS_PATH}/${group}/${user.uid}`] = group;
    updates[`${_BUSINESSES_PATH}/${businessId}`] = businessObj;
    // add user to database and to group and to business simultaniously and atomically
    return this.root.update(updates);
  },
  
  
  readBusinessId(userId, handler, failHandler){
    this.professionals.child(`${userId}/businessId`).once('value').then( (snapshot) => {
      handler((snapshot.val() || ''));
    }).catch((error) => { failHandler(error)});
  },


  //update the profile for a professional user where new data is 
  //stored at profileData. error and success handlers are 
  //provided by form/formUpdater
  updateProfProfileHelper(profileData, errorHandler, successHandler) {
    console.log('FirebaseServices.updateProfProfileHelper')    
    try {
      var businessProfileRef = this.businesses.child(`${profileData.id}`);
      businessProfileRef
        .update({
          categories: profileData.categories,
          city: profileData.city,
          country: 'Saudi Arabia',
          phone: profileData.phone,
          preview: profileData.preview,
          imgUrl: profileData.imgUrl,
          businessName: profileData.businessName,
          types: profileData.types,
          website: profileData.website
        })
        .then(() => {
          console.log("insesrt succeeded");
          successHandler();
        })
        .catch(error => {
          console.log("could not insert profile");
          console.log(profileData);
          errorHandler(error.message);
        });
    } catch (error) {
      errorHandler(error);
    }
  },


  //upload a logo image for a professional user profile.
  //newImage is the file object from an HTML file input.
  //next is called after the upload is finished (usually
  //to update the profile itself)
  uploadProfProfileImage(newImage, progressHandler, errorHandler, next){
      console.log('FirebaseServices.uploadProfProfileImage')
      //1- upload the image of the profile.
      //2- add the profile to the database
      //get a reference for the image bucket (the placeholder where we will put the image into)
      var imagesRef = this.profileImages.child(`${Date.now() + Math.random()}`);
      console.log('imageRef: ')
      console.log(imagesRef)
      //upload the image. This is a task that will run async. Notice that it accepts a file as in
      //browser API File (see https://developer.mozilla.org/en-US/docs/Web/API/File)
      var metadata = {
        contentType: newImage.type
      };
      //The following will return a task that will execte async
      var uploadTask = imagesRef.put(newImage, metadata);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );
          progressHandler(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        error => {
          // Handle unsuccessful uploads
          console.log("error uploading image of profile");
          console.log(error);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
          errorHandler(error.message);
        },
        //use arrow function so that you can access this.insertprof. See (https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback)
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          let imgUrl = uploadTask.snapshot.downloadURL;
          console.log("upload sucessful and image URL is: " + imgUrl);
          next(imgUrl);
          
        }
      ); //updateTask.on
  },

  //Main method to update a professional profile
  updateProfProfile(profileData, errorHandler, successHandler, progressHandler){
    console.log('FirebaseServices.updateProfProfile')
    //if we have a new image then upload it
    if (profileData.newImage) {
      this.uploadProfProfileImage(
        profileData.imageFile, 
        progressHandler, 
        errorHandler, 
        (imgUrl) => {
            profileData.imgUrl = imgUrl
            //update profile with new data and new image URL
            this.updateProfProfileHelper(
              profileData,
              errorHandler,
              successHandler
            );
        }
      );
    } else {
      //no change to current image/image URL
      //update profile with new data 
      this.updateProfProfileHelper(
        profileData,
        errorHandler,
        successHandler
      );
    }
  }
};

//TODO: change the code into JS and export all functions
// see (http://blog.cloud66.com/an-overview-of-es6-modules-in-javascript/)
// see (https://stackoverflow.com/questions/29893591/es6-modules-export-single-class-of-static-methods-or-multiple-individual-method)
// see (https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f)

//  //create user object in Firebase DB with id and other proprties
//     // update user likes
//     func createFirebaseDBUser(uid: String, group: String, userData: Dictionary<String, String>) {
//       // add user to database
//       REF_USERS.child(uid).updateChildValues(userData)
//       // add user index to group object
//       REF_GROUP.child(group).child(uid).setValue(group)

//   }

//   func updateUserProfile(uid: String, userData: Dictionary<String, String>) {

//       REF_USERS.child(uid).updateChildValues(userData)

//   }

//   func updateBusinessProfile(uid: String, group: String! ,childName: String, userData: Dictionary<String, String>) {
//       REF_BUSINESS.child(uid).child(childName).setValue(userData)
//   }

//   func addProduct(productId: String, department: String, productData: Dictionary<String, String>) {
//       REF_PRODUCT.child(productId).setValue(productData)
//       REF_PRODUCT_DEPARTMENT.child(department).child(productId).setValue(department)
//   }

//   func addIdea(ideaId: String, department: String, ideaData: Dictionary<String, String>) {
//       REF_IDEA.child(ideaId).setValue(ideaData)
//       REF_IDEA_DEPARTMENT.child(department).child(ideaId).setValue(department)
//   }

//   // delete
//   func addPost(uid: String!, posttId: String, childName: String, postData: Dictionary<String, String>) {
//       REF_USER_POSTS.child(uid).child(childName).child(posttId).setValue(postData)
//   }

//   func addToUserLikes(imgId: String, postType: String) {
//       let uid = Global.sharedGlobal.member[0].userID
//       REF_USER_LIKES.child(uid!).child(imgId).setValue(postType)
//   }

//   func removeUserLike(imgId: String){
//       let uid = Global.sharedGlobal.member[0].userID
//       REF_USER_LIKES.child(uid!).child(imgId).removeValue()
//   }
