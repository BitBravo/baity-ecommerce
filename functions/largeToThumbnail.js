const functions = require('firebase-functions');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')({keyFilename: './bayty-c2bd7548d364.json'});

const admin = require('firebase-admin');
const path = require('path');
const sharp = require('sharp');

// const mkdirp = require('mkdirp-promise');
// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 400;
const THUMB_MAX_WIDTH = 400;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

const db = admin.firestore();
//firestore references - Testing
const TEST_PRODUCT_REF = "test-product";
const TEST_IDEA_REF = "test-idea";
const TEST_PROF_REF = "test-professional";
const TEST_NORMAL_REF = "test-normal";

//Storage references - Testing
const TEST_STORAGE_PRODUCT_REF = "test-productImages";
const TEST_STORAGE_IDEA_REF = "test-ideaImages";
const TEST_STORAGE_PROF_REF = "test-businessLogo";
const TEST_STORAGE_NORMAL_REF = "test-profileImage";

// firestore references - Production
const PRODUCT_REF = "product";
const IDEA_REF = "idea";
const PROF_REF = "professional";
const NORMAL_REF = "normal";

//Storage references - Production
const STORAGE_PRODUCT_REF = "productImages";
const STORAGE_IDEA_REF = "ideaImages";
const STORAGE_PROF_REF = "businessLogo";
const STORAGE_NORMAL_REF = "profileImage";

var images = [];
const collection = IDEA_REF;
const imageFolder = STORAGE_IDEA_REF;
exports = module.exports = functions.database.ref('/test/').onUpdate(image => {


  // const dataID = image.params.dataID
  // const childDataID = image.params.childDataID
  // const fileName = image.data.val()
  console.log("start function - get data")

  //get your project storage bucket id
  //const storageBucket = functions.config().firebase.storageBucket
  const storageBucket = "gs://bayty-246cc.appspot.com"
  //open bucket
  const bucket = gcs.bucket(storageBucket)

  //path to image
  // 1. loop all products to get url of large images
  return db.collection(collection).orderBy("timestamp", "desc").get()
  .then((snap) => {
    console.log("size " + snap.size)
     const productIds = (Object.keys(snap.docs)).slice(25);
    // console.log("length " +productIds.length)
    return productIds.forEach((i) => {

      //console.log("i " + i);
      const doc = snap.docs[i];
    //   var x = true;
    //   if (x){
    //   console.log("doc id " + doc.id);
    //   return null;
    // }
      // 2. get images array and store product id
      var imagesPromises = doc.data().imagesTemp.map(url => {
      //  if (!url.thumbnail)
          return toThumb(bucket, url, doc.id);
      //  else
      //    return null;
      })
    }) // closing docs map
  }).catch(error => console.log("error " + error)) // closing firestore query
})

function toThumb(bucket, image, id){
  var imageUrl = image.large


  var imgPath = image.large.substr(imageUrl.indexOf('%2F') + 3, (imageUrl.indexOf('?')) - (imageUrl.indexOf('%2F') + 3));
  imgPath = imgPath.replace("%2F", "/");
  if (imgPath.includes("%2F")) {
    imgPath = imgPath.replace("%2F", "/");
  }
  if (imgPath.includes("thumb")) {return }

  var oldName = imgPath.substr(imgPath.lastIndexOf('/')+1);
  var generalPath = imgPath.substr(0, imgPath.lastIndexOf('/'));
  var thumbPath = `${imageFolder}/${generalPath}/thumb_${oldName}`;
  // 3. loop the images to get path from url then convert
  // sample %2F6Aj8hGEV8NOEkdXTHSY1dWCvi363%2FcMtby4SJ2QCacQbQMAX4%2F01524280089300.671?alt
  // productImages/userid/productid/imageName
  //const imagePath = `productImages/${userid}`;
  const imagePath =  `${imageFolder}/${imgPath}`;
  console.log("imagePath: " +imagePath);
  console.log("thumbPath: " +thumbPath);

  //const imagePath = 'productImages/6Aj8hGEV8NOEkdXTHSY1dWCvi363/cMtby4SJ2QCacQbQMAX4/01524280089300.671'
  const fileName = oldName;
  //location of the image in the bucket
  const object = bucket.file(imagePath)

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
//console.log(filePath)


  const metadata = {
    contentType: 'image/jpeg'
  };

  // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
  // Create write stream for uploading thumbnail
  const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});
  console.log("start processing")
  // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
  const pipeline = sharp();
  pipeline
  .resize(400, 400)
  .background({r: 255, g: 255, b: 255, alpha: 1})
  .embed()
  .pipe(thumbnailUploadStream);


  bucket.file(filePath).createReadStream().pipe(pipeline);

  const streamAsPromise = new Promise((resolve, reject) =>
  thumbnailUploadStream.on('finish', resolve).on('error', reject));

  return streamAsPromise.then(() => {
    console.log('Thumbnail created successfully');

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear() + 20; // add a few years

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = mm + '-' + dd + '-' + yyyy;

    return bucket.file(thumbPath).getSignedUrl({
      action: 'read',
      expires: today
    }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Done processing " + id);
      //var elm = images.find((obj) => obj.id === id)
      //console.log("elm " + elm.id);
      //elm.images.push({large: image.large, thumb: url})
      // when all images of a product done processing, update firestore
      var productRef = db.collection(collection).doc(id)
      return db.runTransaction((transaction) => {
        return transaction.get(productRef).then((doc) => {
          var otherImages = doc.data().imagesTemp.filter(image => !image.large.includes(imageUrl));
          var image = doc.data().imagesTemp.filter(image => image.large.includes(imageUrl));
          var images = [];
          if (otherImages.length < 1) {
            images = [{large: image[0].large, thumbnail: url}];
          }
          else {
            images = [...otherImages,{large: image[0].large, thumbnail: url}];
          }
          return transaction.update(productRef, {imagesTemp: images})
        }).catch(error => console.log("error " + error))
      })
      //return url;
    });//closing signed url
  }).catch(error => console.log("error " + error)) // closing streamAsPromise
}
