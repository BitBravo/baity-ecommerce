import { app, base, database, storage, db } from "../base";
import firebase from "firebase";
import _ from 'lodash'

let DB_BASE = db;
//The following is the sotrage object.
//IMPORTANT: you can not use the following storge object as bucket root reference. To get the bucket root reference use storage.ref().
let STORAGE_BASE = storage.ref();

/* DATABASE AND STORGAE REFERENCES FOR TESTING*/
let testPrefix = "test-"; //change this to switch from test tables to production tables

let _PRODUCTS_PATH = testPrefix + "product"; //change me by removing test
let _IDEAS_PATH = testPrefix + "idea";
let _BUSINESSES_PATH = testPrefix + "business"; //change me by removing test
let _LIKES_PATH = testPrefix + "likes";
let _GROUPS_PATH = testPrefix + "group"; //change me by removing test
let _BUSINESS_LOGOS_PATH = testPrefix + "businessLogo";
let _PRODUCT_IMAGES_PATH = testPrefix + "productImages";
let _IDEA_IMAGES_PATH = testPrefix + "ideaImages";
let _PROFILE_IMAGES_PATH = testPrefix + "profileImage";
let _PROF_PATH = testPrefix + "professional";
let _NORMAL_PATH = testPrefix + "normal";
let _BASKET_PATH = testPrefix + "basket";
let _BUSINESS_HOMEIMGS_PATH = testPrefix + "businessHomeImgs";
let _PROFILE_HOMEIMGS_PATH = testPrefix + "profileHomeImages";

/* DATABASE AND STORGAE REFERENCES FOR TESTING*/
// let _PRODUCTS_PATH = "product"; //change me by removing test
// let _IDEAS_PATH = "idea";
// let _BUSINESSES_PATH = "business"; //change me by removing test
// let _LIKES_PATH = "likes";
// let _GROUPS_PATH = "group"; //change me by removing test
// let _BUSINESS_LOGOS_PATH = "businessLogo";
// let _PRODUCT_IMAGES_PATH = "productImages";
// let _IDEA_IMAGES_PATH = "ideaImages";
// let _PROFILE_IMAGES_PATH = "profileImage";
// let _PROF_PATH = "professional";
// let _NORMAL_PATH = "normal";
// let _BASKET_PATH = "basket";
// let _BUSINESS_HOMEIMGS_PATH = "businessHomeImgs";
// let _PROFILE_HOMEIMGS_PATH = "profileHomeImages";

// firestore references
let _REF_BASE = DB_BASE;
let _REF_PRODUCT = DB_BASE.collection(_PRODUCTS_PATH); //change me by removing test
let _REF_IDEA = DB_BASE.collection(_IDEAS_PATH);
let _REF_BUSINESS = DB_BASE.collection(_BUSINESSES_PATH); //change me by removing test
let _REF_USER_LIKES = DB_BASE.collection(_LIKES_PATH);
let _REF_GROUP = DB_BASE.collection(_GROUPS_PATH); //change me by removing test
let _REF_PROF = DB_BASE.collection(_PROF_PATH)
let _REF_NORMAL = DB_BASE.collection(_NORMAL_PATH)
let _REF_BASKET = DB_BASE.collection(_BASKET_PATH)

// Storage reference
var _REF_BUSINESS_LOGO = STORAGE_BASE.child(_BUSINESS_LOGOS_PATH); //change me by removing test
var _REF_PRODUCT_IMAGE = STORAGE_BASE.child(_PRODUCT_IMAGES_PATH); //change me by removing test
var _REF_IDEA_IMAGE = STORAGE_BASE.child(_IDEA_IMAGES_PATH);
var _REF_PROFILE_IMAGE = STORAGE_BASE.child(_PROFILE_IMAGES_PATH); //change me by removing test
var _REF_BUSINESS_HOMEIMG = STORAGE_BASE.child(_BUSINESS_HOMEIMGS_PATH );
var _REF_PROFILE_HOMEIMG =STORAGE_BASE.child(_PROFILE_HOMEIMGS_PATH);
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
  get BUSINESS_HOMEIMGS_PATH() {
    return _BUSINESS_HOMEIMGS_PATH;
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
  get PROFILE_HOMEIMGS_PATH() {
    return _PROFILE_HOMEIMGS_PATH;
  },
  get PROF_PATH() {
    return _PROF_PATH;
  },
  get NORMAL_PATH() {
    return _NORMAL_PATH;
  },
  get BASKET_PATH() {
    return _BASKET_PATH;
  },
  get root() {
    return DB_BASE;
  },
  get products() {
    return _REF_PRODUCT;
  },
  get ideas() {
    return _REF_IDEA;
  },
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
  get businessHomeImgs() {
    return _REF_BUSINESS_HOMEIMG;
  },
  get profileHomeImages() {
    return _REF_PROFILE_HOMEIMG;
  },
  get professionals() {
    return _REF_PROF;
  },
  get normalUsers() {
    return _REF_NORMAL;
  },
  get basket() {
    return _REF_BASKET;
  },
  get productImages() {
    return _REF_PRODUCT_IMAGE;
  },
  get ideaImages() {
    return _REF_IDEA_IMAGE;
  },
  get likes() {
    return _REF_USER_LIKES;
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
        ref = this.products.doc(entryId);
        break;
      case 'idea':
        ref = this.ideas.doc(entryId);
        break;
      case 'profUser':
        ref = this.professionals.doc(entryId);
        break;
      case 'normalUser':
        ref = this.normalUsers.doc(entryId);
        break;
      case 'group':
        ref = this.groups.doc(entryId);
        break;
      case 'likes':
        ref = this.likes.doc(entryId);
        break;
      case 'basket':
        ref = this.basket.doc(entryId);
        break;
    }
    return ref.get()
      .then(doc => doc.data())
      .catch(error => {
        console.log(`FirestoreServices.readDBRecord: error reading entry of type ${entryType} with id (${entryId}) from DB`)
        console.log(`ERROR: code: ${error.code}, message:${error.message}`)
        throw error
      });
    },

    //create a professional user (i.e., business user) along with the group and business entry (but not the business details)
    // user is the object from firebase.auth.
    createProfUser(user, phoneNo, coName) {
      var businessId = this.businesses.doc().id;
      let group = "prof";
      let dateCreated = Date.now();
      let businessObj = {
        owner: user.uid,
        email: user.email,
        phone: phoneNo,
        country: "Saudi Arabia",
        businessName: coName,
        dateCreated: dateCreated,
        id: businessId,
        city: "الرياض"
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

      // Get a new write batch
      var batch = db.batch();

      var profRef = this.professionals.doc(user.uid);
      batch.set(profRef, userObj);

      var groupRef = this.groups.doc(user.uid);
      batch.set(groupRef, {group: group});

      var businessRef = this.businesses.doc(businessId);
      batch.set(businessRef, businessObj);

      // add user to database and to group and to business simultaniously and atomically
      return batch.commit();
    },

    //create a normal user along with the group and business entry
    // user is the object from firebase.auth.
    createNormalUser(user, phoneNo, userName) {
      let group = "normal";
      let dateCreated = Date.now();
      let userObj = {
        uid: user.uid,
        provider: user.providerData[0].providerId, //assuming a user has only one provider. Change me to user forEach and search using the email
        email: user.email,
        phone: phoneNo,
        name: userName,
        dateCreated: dateCreated,
        country: "Saudi Arabia",
        city: "الرياض", //we get it later on from profile
        userGroup: group
      };

      // Get a new write batch
      var batch = db.batch();

      var userRef = this.normalUsers.doc(user.uid);
      batch.set(userRef, userObj);

      var groupRef = this.groups.doc(user.uid);
      batch.set(groupRef, {group: group});

      // add user to database and to group simultaniously and atomically
      return batch.commit();
    },

  //takes user id for a professional user
  //returns the business id for the professional user
  getProfessionalUserBusinessId(userId, handler, failHandler){
    console.log(userId)
    this.professionals.doc(userId).get().then( (snapshot) => {
      handler((snapshot.data().businessId || ''));
    }).catch((error) => { failHandler(error)});
  },

  //update the profile for a professional user where new data is
  //stored at profileData. error and success handlers are
  //provided by form/formUpdater
  updateProfProfileHelper(profileData, errorHandler, successHandler) {
    console.log('FirestoreServices.updateProfProfileHelper')
    try {
      var businessProfileRef = this.businesses.doc(`${profileData.id}`);
      businessProfileRef
        .update({
          categories: profileData.categories,
          city: profileData.city,
          country: 'Saudi Arabia',
          phone: profileData.phone,
          preview: profileData.preview,
          imgUrl: profileData.imgUrl,
          homeImgUrl: profileData.homeImgUrl,
          businessName: profileData.businessName,
          types: profileData.types,
          website: profileData.website,
          twitter: profileData.twitter,
          facebook: profileData.facebook,
          instagram: profileData.instagram
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
    }
    catch (error) {
      errorHandler(error);
    }
  },

  //update the profile for a normal user where new data is
  //stored at profileData. error and success handlers are
  //provided by form/formUpdater
  normalUserProfileHelper(profileData, errorHandler, successHandler) {
    console.log('FirestoreServices.normalUserProfileHelper')

    try {
      var normalUserProfileRef = this.normalUsers.doc(`${profileData.id}`);
      if (profileData.newImage) {
      normalUserProfileRef
        .update({
          city: profileData.city,
          country: 'Saudi Arabia',
          phone: profileData.phone,
          imgUrl: profileData.imgUrl,
          homeImgUrl: profileData.homeImgUrl,
          name: profileData.name,
          // email: profileData.email
        })
        .then(() => {
          console.log("insert succeeded");
          successHandler();
        })
        .catch(error => {
          console.log("could not insert profile");
          console.log(profileData);
          errorHandler(error.message);
        });
    } else {
      console.log(normalUserProfileRef)

      normalUserProfileRef
        .update({
          homeImgUrl: profileData.homeImgUrl,
          city: profileData.city,
          country: 'Saudi Arabia',
          phone: profileData.phone,
          name: profileData.name,
          // email: profileData.email,

        })
        .then(() => {
          console.log(profileData);

          console.log("insert succeeded");
          successHandler();
        })
        .catch(error => {
          console.log("could not insert profile");
          console.log(profileData);
          errorHandler(error.message);
        });
    }
  }
  catch (error) {
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
    uploadProfProfileImage(ref, uid, newImage, progressHandler, errorHandler, next){
        //1- upload the image of the profile.
        //2- add the profile to the database
        //get a reference for the image bucket (the placeholder where we will put the image into)
        var imagesRef = ref.child(`${uid}/${Date.now() + Math.random()}`);
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
    uploadProfProfileHomeImage(uid, newHImage, progressHandler, errorHandler, next){
      //1- upload the image of the profile.
      //2- add the profile to the database
      //get a reference for the image bucket (the placeholder where we will put the image into)
      var imagesRef = this.profileImages.child(`${uid}/${Date.now() + Math.random()}`);
      //upload the image. This is a task that will run async. Notice that it accepts a file as in
      //browser API File (see https://developer.mozilla.org/en-US/docs/Web/API/File)
      var metadata = {
        contentType: newHImage.type
      };
      //The following will return a task that will execte async
      var uploadTask = imagesRef.put(newHImage, metadata);
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
          let homeImgUrl = uploadTask.snapshot.downloadURL;
          console.log("upload sucessful and image URL is: " + homeImgUrl);
          next(homeImgUrl);

        }
      ); //updateTask.on
  },
    //Main method to update a professional profile
    updateProfProfile(uid, profileData, errorHandler, successHandler, progressHandler){
      console.log('FirebaseServices.updateProfProfile')
      //if we have a new image then upload it
      if (profileData.newImage) {
        this.uploadProfProfileImage(
          this.businessLogos,
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
    updateProfProfileHomeImg(uid, profileData, errorHandler, successHandler, progressHandler){
      console.log('FirebaseServices.updateProfProfile')
      //if we have a new image then upload it
      if (profileData.newHImage) {
        this.uploadProfProfileHomeImage(
          this.businessHomeImgs,
          uid,
          profileData.imageHFile,
          progressHandler,
          errorHandler,
          (homeImgUrl) => {
              profileData.homeImgUrl = homeImgUrl
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

    //Main method to update a normal user profile
    updateNormalUserProfile(uid, profileData, errorHandler, successHandler, progressHandler){
      console.log('FirebaseServices.updateNormalProfile')
      //if we have a new image then upload it
      if (profileData.newImage) {
        this.uploadProfProfileImage(
          this.profileImages,
          uid,
          profileData.imageFile,
          progressHandler,
          errorHandler,
          (imgUrl) => {
              profileData.imgUrl = imgUrl
              //update profile with new data and new image URL
              this.normalUserProfileHelper(
                profileData,
                errorHandler,
                successHandler
              );
          }
        );
      } else {
        //no change to current image/image URL
        //update profile with new data
        this.normalUserProfileHelper(
          profileData,
          errorHandler,
          successHandler
        );
      }

    },
    updateNorProfileHomeImg(uid, profileData, errorHandler, successHandler, progressHandler){
      console.log('FirebaseServices.updateProfProfile')
      //if we have a new image then upload it
      if (profileData.newHImage) {
        this.uploadProfProfileHomeImage(
          this.profileHomeImages,
          uid,
          profileData.imageHFile,
          progressHandler,
          errorHandler,
          (homeImgUrl) => {
              profileData.homeImgUrl = homeImgUrl
              //update profile with new data and new image URL
              this.normalUserProfileHelper(
                profileData,
                errorHandler,
                successHandler
              );
          }
        );
      } else {
        //no change to current image/image URL
        //update profile with new data
        this.normalUserProfileHelper(
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
      return this.products.doc(productId)
    },

    /*
      returns an idea as a promise
    */
    getIdea(ideaId){
      return this.readDBRecord('idea', ideaId).catch(error => {
        console.log(`FirebaseServices.getIdea: can not read idea ${ideaId} from DB`)
        throw error;
      })
    },

    getIdeaRef(ideaId){
      return this.ideas.doc(ideaId)
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
        var newProductRef = this.products.doc();
        var id = newProductRef.id
        var timestamp = firebase.firestore.FieldValue.serverTimestamp()
        product = {...product, id: id, timestamp: timestamp};
        return newProductRef.set(product).then(() => id)
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

    insertIdea(idea) {
      // return new Promis((resolve, reject) => {
      //   var newIdeaRef = this.ideas.push();
      //   idea = {...product, id: newIdeaRef.key};
      //   newIdeaRef.set(idea).then( () => newIdeaRef.key);
      // })
        var newIdeaRef = this.ideas.doc();
        var id = newIdeaRef.id
        var timestamp = firebase.firestore.FieldValue.serverTimestamp()
        idea = {...idea, id: id, timestamp: timestamp};
        return newIdeaRef.set(idea).then(() => id)
        .catch(error => {
          console.log(`error inserting idea: ${idea} in DB`)
          throw error;
        });
    },

    /**
     * This method is used to update an idea in DB
     * newIdeaData: an object that contains the changing product
     *   properties along with their new values
     * ideaId: the id of the idea to be updated
     * returns: non-null promise containing void that resolves when update on server is complete
     */
    updateIdea(newIdeaData, ideaId){
      var ideaRef = this.getIdeaRef(ideaId);
      return ideaRef.update(newIdeaData);
    },

    uploadProductImages(newImages, viewUploadProgress, uid, productId){
      var i = 0;
      //get list of upload tasks from firebase SDK (this will immediatly start upload)
      var tasks = _.map(newImages, image => {
        const file = image.file
        //const imageRef = this.productImages.child(`${uid}/${Date.now() + Math.random()}`);
        const imageRef = this.productImages
          .child(`${uid}/${productId}/${i++}${Date.now() + Math.random()}`);
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
          console.log(images)
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
    return this.uploadProductImages(newImages, viewUploadProgress, uid, productId)
    .then(images => {
      return this.getProduct(productId)
      .then(product => {
        console.log("product" + product)
        //combine new images with current images from DB into 'images' property of product
        images = product.images? [...images, ...product.images]: images;
        var productRef = this.products.doc(productId);
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
    1- delete the image and thumb from the storage
    2- delete the image from the product images
    returns: a promise reporesenting product images after deleting the given image
  */
  deleteProductImage(imageUrl, productId){
    console.log('FirebaseServices.deleteImage(): 1- deleting image from storage')
    var thumbPre = "thumb_";
    var path = imageUrl.substr(imageUrl.indexOf('%2F') + 3, (imageUrl.indexOf('?')) - (imageUrl.indexOf('%2F') + 3));
	  var oldName = path.substr(path.lastIndexOf('%2F')+3);
    path = path.replace(oldName, thumbPre + oldName);
    path = path.replace("%2F", "/");
    if (path.includes("%2F")){
      path = path.replace("%2F", "/");
    }
    const storagePath = this.productImages.child(`${path}`);
    this.deleteThumbnail(storagePath);
    //delete original image "large" using url
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
  },

  deleteThumbnail(storagePath) {
      storagePath.getDownloadURL().then({
      onResolve(foundURL) {
        storagePath.delete();
      },onReject(error) {
        console.log(error.code);
      }
      })
  },

  uploadIdeaImages(newImages, viewUploadProgress, uid, ideaId){
    var i = 0;
    //get list of upload tasks from firebase SDK (this will immediatly start upload)
    var tasks = _.map(newImages, image => {
      const file = image.file
      const imageRef = this.ideaImages
        .child(`${uid}/${ideaId}/${i++}${Date.now() + Math.random()}`);
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
    1- uploads idea images.
    2- add images to idea.
    newImages: an array of [{file: ..., url: ...}] where 'file' of type File(Blob), 'url' of type DataURL (not needed here)
    returns: non-null promise containing void that resolves when update on server is complete
  */
  addIdeaImages(ideaId, newImages, viewUploadProgress, uid){
    return this.uploadIdeaImages(newImages, viewUploadProgress, uid, ideaId)
    .then(images => {
      return this.getIdea(ideaId)
      .then(idea => {
        //combine new images with current images from DB into 'images' property of idea
        images = idea.images? [...images, ...idea.images]: images;
        var ideaRef = this.ideas.doc(ideaId);
        ideaRef.update({images: images})
      })
      .catch(error => {
        console.log(`FirebaseServices.addIdeaImages: error while adding idea images for idea ${ideaId}`)
        console.log(`ERROR: code: ${error.code}, message:${error.message}`);
        throw error
      })
    })

  },

  deleteIdeaImage(imageUrl, ideaId){
    console.log('FirebaseServices.deleteImage(): 1- deleting image from storage')
    var thumbPre = "thumb_";
    var path = imageUrl.substr(imageUrl.indexOf('%2F') + 3, (imageUrl.indexOf('?')) - (imageUrl.indexOf('%2F') + 3));
	  var oldName = path.substr(path.lastIndexOf('%2F')+3);
    path = path.replace(oldName, thumbPre + oldName);
    path = path.replace("%2F", "/");
    if (path.includes("%2F")){
      path = path.replace("%2F", "/");
    }
    const storagePath = this.ideaImages.child(`${path}`);
    //storagePath.delete();
    this.deleteThumbnail(storagePath);
    //delete original image "large" using url
    return storage.refFromURL(imageUrl).delete()
      .then(() => {
        return this.getIdea(ideaId)
      })
      .then( (idea) => {
        console.log('FirebaseServices.deleteImage(): 2- image deleted from storage. Start updating idea')
        var images = idea.images;
        images = images.filter( image => image.large !== imageUrl )
        var ideaRef = this.getIdeaRef(ideaId)
        return ideaRef.update({images: images}).then(() => {return images});
      })
      .catch(error => {
        console.log(`FirebaseServices.deleteImage(): can not delete image. error code: ${error.code}, error message:${error.message}`)
        throw error
      })
  },

  /*
    returns a basket as a promise
  */
  getBasket(userId){
    return this.readDBRecord('basket', userId).catch(error => {
      console.log(`FirebaseServices.getBasket: can not read idea ${userId} from DB`)
      throw error;
    })
  },

  getBasketRef(userId){
    return this.basket.doc(userId)
  },

  addTimestamp(){
    this.products.get().then(docs => {
      docs.forEach(doc =>{
        if (!doc.data().timestamp){
          var timestamp = firebase.firestore.FieldValue.serverTimestamp()
          this.products.doc(doc.id).update({timestamp: timestamp})
      }
    })
    })
  },
  copyImages(){
    this.products.get().then(docs => {
      docs.forEach(doc => {
          this.products.doc(doc.id).update({images: doc.data().imagesTemp})
      })
    })
  }
  /**
   * This method is used to insert a new item into basket into DB
   */
  // insertItem(item, userId) {
  //   console.log("userId " + userId)
  //   console.log("item.id " + item.id)
  //   var cartData = {
  //     quantity: 1
  // };
  //   return this.basket.doc(userId).collection("items").doc(item.id).set(cartData)
  //     .then( () => item.id )
  //     .catch(error => {
  //       console.log(`error adding product: ${item} in user basket`)
  //       throw error;
  //     });
  // }
};
