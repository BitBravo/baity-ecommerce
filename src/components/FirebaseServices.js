import { app, base, database, storage } from '../base'


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

let PRODUCTS_PATH = "testProducts"//change me by removing test
let IDEAS_PATH = "idea"
let USER_POSTS_PATH = "userPosts"
let PRODUCT_DEPTS_PATH = "productDepartment"
let IDEA_DEPTS_PATH = "ideaDepartment"
let USERS_PATH = "testUsers"//change me by removing test
let BUSINESSES_PATH = "testBusiness"//change me by removing test
let LIKES_PATH = "likes"
let GROUPS_PATH = "testGroup"//change me by removing test
let BUSINESS_LOGOS_PATH = "testBusinessLogo";
let PRODUCT_IMAGES_PATH = "testProductImages";
let IDEA_IMAGES_PATH = "ideaImage";
let PROFILE_IMAGES_PATH = "testProfileImage";

// DB references
//You can use child() only on references (i.e. database.ref() but not database itself)
 let _REF_BASE = DB_BASE
 let _REF_PRODUCT = DB_BASE.child(PRODUCTS_PATH)//change me by removing test
 let _REF_IDEA = DB_BASE.child(IDEAS_PATH)
 let _REF_USER_POSTS = DB_BASE.child(USER_POSTS_PATH)
 let _REF_PRODUCT_DEPARTMENT = DB_BASE.child(PRODUCT_DEPTS_PATH)
 let _REF_IDEA_DEPARTMENT = DB_BASE.child(IDEA_DEPTS_PATH)
 let _REF_USERS = DB_BASE.child(USERS_PATH)//change me by removing test
 let _REF_BUSINESS = DB_BASE.child(BUSINESSES_PATH)//change me by removing test
 let _REF_USER_LIKES = DB_BASE.child(LIKES_PATH)
 let _REF_GROUP = DB_BASE.child(GROUPS_PATH)//change me by removing test


// Storage reference
 var _REF_BUSINESS_LOGO = STORAGE_BASE.child(BUSINESS_LOGOS_PATH)//change me by removing test
 var _REF_PRODUCT_IMAGE = STORAGE_BASE.child(PRODUCT_IMAGES_PATH)//change me by removing test
 var _REF_IDEA_IMAGE = STORAGE_BASE.child(IDEA_IMAGES_PATH)
 var _REF_PROFILE_IMAGE = STORAGE_BASE.child(PROFILE_IMAGES_PATH)//change me by removing test

// We are exporting an nonymous object.
// To import simply write: 
// import FirebaseServices from './FirebaseServices.js' (you can replace FirebaseServices with whatever you like)
// Notice that by exporting an anonymous object you loose performance
// See: (https://medium.com/@rauschma/note-that-default-exporting-objects-is-usually-an-anti-pattern-if-you-want-to-export-the-cf674423ac38)
export default {
  get root() {
    return DB_BASE;
  },
  get products() {
    return _REF_PRODUCT;
  },
  get users() {
    return _REF_USERS;
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
    return _REF_PROFILE_IMAGE
  },
  //create a professional user (i.e., business user) along with the group but not the business details
  // user is the object from firebase.auth. 
  createProfUser(user, phoneNo, coName) {
    let group = 'prof';
    let userObj = {
      uid: user.uid,
      provider: user.providerData[0].providerId, //assuming a user has only one provider. Change me to user forEach and search using the email
      email: user.email,
      phone: phoneNo,
      name: coName,
      dateCreated: Date.now(),
      country: 'Saudi Arabia',                    
      city: '', //we get it later on from profile
      status: false,
      userGroup: group
    }
    var updates = {};
    updates[`${USERS_PATH}/${user.uid}`] = userObj;
    updates[`${GROUPS_PATH}/${group}/${user.uid}`] = group; 
    // add user to database and to group simultaniously and tomically
    return this.root.update(updates);
  }
}

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