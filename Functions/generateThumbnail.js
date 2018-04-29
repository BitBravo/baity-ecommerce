const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')({keyFilename: './bayty-c2bd7548d364.json'});
const admin = require('firebase-admin');
//admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

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

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports = module.exports = functions.storage.object().onFinalize((object) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image MIME type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    console.log('Already a Thumbnail.');
    return null;
  }

  console.log("filePath " + filePath);
  //get DB collection and doc from filepath - type/uid/itemId/images
  var pathTokens = filePath.split("/");
  var  collectionId, docId;
  switch (pathTokens[0]) {
    case STORAGE_PRODUCT_REF:
      collectionId = PRODUCT_REF; docId = pathTokens[2]; isProfileImage = false; break;
    case STORAGE_IDEA_REF:
      collectionId = IDEA_REF; docId = pathTokens[2]; isProfileImage = false; break;
    case STORAGE_PROF_REF:
      collectionId = PROF_REF; docId = pathTokens[1]; isProfileImage = true; break;
    case STORAGE_NORMAL_REF:
      collectionId = NORMAL_REF; docId = pathTokens[1]; isProfileImage = true; break;
    case TEST_STORAGE_PRODUCT_REF:
      collectionId = TEST_PRODUCT_REF; docId = pathTokens[2]; isProfileImage = false; break;
    case TEST_STORAGE_IDEA_REF:
      collectionId = TEST_IDEA_REF; docId = pathTokens[2]; isProfileImage = false; break;
    case TEST_STORAGE_PROF_REF:
      collectionId = TEST_PROF_REF; docId = pathTokens[1]; isProfileImage = true; break;
    case TEST_STORAGE_NORMAL_REF:
      collectionId = TEST_NORMAL_REF; docId = pathTokens[1]; isProfileImage = true; break;
  }
  // // from fileName get doc id, index, and collection (procudt, prof,...)
  // // p: product, i: idea, n: normal, l: business logo
  // switch (fileName.charAt(0)) {
  //   case 'p': collectionId = PRODUCT_REF; break;
  //   case 'i': collectionId = IDEA_REF; break;
  // }
  // var index = fileName.charAt(1); // 1 char
  // console.log("fileName " + fileName);
  // var docId = fileName.substring(2,22); // 20 char
  // console.log("docId " + docId);

  // Cloud Storage files.
  const bucket = gcs.bucket(object.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = {
    contentType: contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    return file.download({destination: tempLocalFile});
  }).then(() => {
    console.log('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
     '-background', `white`,'-gravity', 'center', tempLocalThumbFile],
      {capture: ['stdout', 'stderr']});
  }).then(() => {
    console.log('Thumbnail created at', tempLocalThumbFile);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
  }).then(() => {
    console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);
    // Get the Signed URLs for the thumbnail and original image.
    const config = {
      action: 'read',
      expires: '03-01-2500',
    };
    return Promise.all([
      thumbFile.getSignedUrl(config),
      file.getSignedUrl(config),
    ]);
  }).then((results) => {
    console.log('Got Signed URLs.');
    const thumbResult = results[0];
    const originalResult = results[1];
    const thumbFileUrl = thumbResult[0];
    const fileUrl = originalResult[0];
    // Add the URLs to the Database
    if (isProfileImage) {
      return admin.firestore().collection(collectionId).doc(docId).set({thumbUrl: thumbFileUrl}, { merge: true });
    }else {
    return admin.firestore().collection(collectionId).doc(docId).get()
    .then((doc) => {
      console.log("doc images " + doc.data().images.length);
      var otherImages = doc.data().images.filter(url => !url.large.includes(fileName));
      var image = doc.data().images.filter(url => url.large.includes(fileName));
      console.log("otherImages " + otherImages.length);
      console.log("large Url " + image[0].large);
      var images;
      if (otherImages.length < 1) {
        images = [{large: image[0].large, thumbnail: thumbFileUrl}];
      }
      else {
        images = [...otherImages,{large: image[0].large, thumbnail: thumbFileUrl}];
      }
      return admin.firestore().collection(collectionId).doc(docId).update({images: images})
  })}}).then(() => console.log('Thumbnail URLs saved to database.'));
});
