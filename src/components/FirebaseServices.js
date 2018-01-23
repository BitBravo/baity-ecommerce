import { app, base, database, storage } from "../base";
import firebase from "firebase";
import _ from 'lodash'



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
let _PRODUCT_IMAGES_PATH = testPrefix + "productImages";
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
  get productImages() {
    return _REF_PRODUCT_IMAGE;
  },
  
  //create a professional user (i.e., business user) along with the group and business entry (but not the business details)
  // user is the object from firebase.auth.
  createProfUser(user, phoneNo, coName) {
    var businessId = this.businesses.push().key;
    let group = "prof";
    let dateCreated = Date.now();
    let businessObj = {
      owner: user.uid,
      email: user.email,
      phone: phoneNo,
      country: "Saudi Arabia",
      businessName: coName,
      dateCreated: dateCreated,
      id: businessId
    }
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
  
  /*
    Given the entry type (product, idea, ...etc) and entry ID
    returns the entry value (product, idea, ...etc)from the DB
    as a promise (call readDBRecord.then(val => ...) ) or 
    an error from DB
  */
  readDBRecord(entryType, entryId){
    var ref;
    switch (entryType){
      case 'product': 
        ref = this.products.child(entryId);
        break;
      // case 'idea':
      //   ref = this.ideas.child(entryId);
      //   break;
      case 'profUser':
        ref = this.professionals.child(entryId);
        break;
      // case 'normalUser':
      //   ref = this.normalUsers.child(entryId);
      //   break;
    }
    return ref.once('value')
      .then(dataSnapshot => dataSnapshot.val())
      .catch(error => {
        console.log(`FirebaseServices.readDBRecord: error reading entry of type ${entryType} with id (${entryId}) from DB`)
        console.log(`ERROR: code: ${error.code}, message:${error.message}`)
        throw error
      })
  },

  //takes user id for a professional user 
  //returns the business id for the professional user
  getProfessionalUserBusinessId(userId, handler, failHandler){
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
  //newImage is of type Blob of File
  //see (https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=0#put)
  //see (https://developer.mozilla.org/en-US/docs/Web/API/File)
  uploadProfProfileImage(uid, newImage, progressHandler, errorHandler, next){      
      //1- upload the image of the profile.
      //2- add the profile to the database
      //get a reference for the image bucket (the placeholder where we will put the image into)
      var imagesRef = this.profileImages.child(`${uid}/${Date.now() + Math.random()}`);
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
  updateProfProfile(uid, profileData, errorHandler, successHandler, progressHandler){
    console.log('FirebaseServices.updateProfProfile')
    //if we have a new image then upload it
    if (profileData.newImage) {
      this.uploadProfProfileImage(
        uid,
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
  },

  /* 
    returns a product as a promise
  */
  getProduct(productId){
    return this.readDBRecord('product', productId).catch(error => {
      console.log(`FirebaseServices.getProduct: can not read product ${productId} from DB`)
      throw error;
    })
  },

  getProductRef(productId){
    return this.products.child(productId)
  },

  /** 
   * This method is used to insert a new product into DB
   * product: is an object that contains all product properties with new values 
   * except id property.
   */
  insertProduct(product) {
    // return new Promis((resolve, reject) => {
    //   var newProductRef = this.products.push();
    //   product = {...product, id: newProductRef.key};
    //   newProductRef.set(product).then( () => newProductRef.key);
    // })
      var newProductRef = this.products.push();
      product = {...product, id: newProductRef.key};
      return newProductRef.set(product).then( () => newProductRef.key)
      .catch(error => {
        console.log(`error inserting product: ${product} in DB`)
        throw error;
      });
  },

  /**
   * This method is used to update a product in DB
   * newProductData: an object that contains the changing product 
   *   properties along with their new values
   * productId: the id of the product to be updated
   * returns: non-null promise containing void that resolves when update on server is complete
   */
  updateProduct(newProductData, productId){
    var productRef = this.getProductRef(productId);
    return productRef.update(newProductData);
  },

  uploadProductImages(newImages, viewUploadProgress, uid){
    //get list of upload tasks from firebase SDK (this will immediatly start upload)
    var tasks = _.map(newImages, image => {
      const file = image.file
      const imageRef = this.productImages
        .child(`${uid}/${Date.now() + Math.random()}`);
      var task = imageRef.put(file, { contentType: file.type });
      task.name = file.name;
      viewUploadProgress(0, task.name)

      // Register an upload task observer to observe state change events such as progress, pause, and resume
      task.on("state_changed", snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = Math.round(
          snapshot.bytesTransferred / snapshot.totalBytes * 100
        );
        //update progress viewer
        viewUploadProgress(progress, task.name)

        //additionl logging 
        console.log(
          "Upload of file " + task.name + " is " + progress + "% done"
        );
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload of file " + task.name + " is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload of  file " + task.name + " is running");
            break;
        }
      });
      return task;
    });

    //Wait for all upload tasks to finish then obtain links (URLs) to uploaded files
    return Promise.all(tasks)
      .then(snapshots => {
        const urls = snapshots.map(snapshot => snapshot.downloadURL);
        return urls
      })
      .then(urls => {
        var images = urls.map(imageUrl => ({large: imageUrl}))
        return images;
      })
      .catch(error => {
        // Handle unsuccessful uploads
        console.log("error uploading file");
        console.log(`ERROR: code: ${error.code}, message:${error.message}`);
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
        throw error;
      });

  },

  
  /*
    1- uploads product images.
    2- add images to product.
    newImages: an array of [{file: ..., url: ...}] where 'file' of type File(Blob), 'url' of type DataURL (not needed here)
    returns: non-null promise containing void that resolves when update on server is complete
  */
  addProductImages(productId, newImages, viewUploadProgress, uid){
    return this.uploadProductImages(newImages, viewUploadProgress, uid)
    .then(images => {
      return this.getProduct(productId)
      .then(product => {
        //combine new images with current images from DB into 'images' property of product
        images = product.images? [...images, ...product.images]: images;
        var productRef = this.products.child(productId);
        productRef.update({images: images})
      })
      .catch(error => {
        console.log(`FirebaseServices.addProductImages: error while adding product images for product ${productId}`)
        console.log(`ERROR: code: ${error.code}, message:${error.message}`);
        throw error
      })
    })
    
  },

  /*
    Given an image url and a product id this method will:
    1- delete the image from the storage
    2- delete the image from the product images
    returns: a promise reporesenting product images after deleting the given image
  */
  deleteProductImage(imageUrl, productId){
    console.log('FirebaseServices.deleteImage(): 1- deleting image from storage')
    return storage.refFromURL(imageUrl).delete()
      .then(() => {
        return this.getProduct(productId)
      })
      .then( (product) => {
        console.log('FirebaseServices.deleteImage(): 2- image deleted from storage. Start updating product')
        var images = product.images;
        images = images.filter( image => image.large !== imageUrl )
        var productRef = this.getProductRef(productId)
        return productRef.update({images: images}).then(() => {return images});
      })
      .catch(error => {
        console.log(`FirebaseServices.deleteImage(): can not delete image. error code: ${error.code}, error message:${error.message}`)
        throw error
      })
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
