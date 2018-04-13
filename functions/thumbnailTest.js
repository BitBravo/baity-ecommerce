const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')({keyFilename: './bayty-c2bd7548d364.json'});
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
//const mkdirp = require('mkdirp-promise');
const fs = require('fs');

var admin = require("firebase-admin");
var serviceAccount = require("./bayty-246cc-firebase-adminsdk-bal2m-31a49973ce.json");
// try { admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://bayty-246cc.firebaseio.com"
//   })
// } catch (e) { console.log(e)}

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports = module.exports = functions.storage.object().onFinalize((object) => {
  // File and directory paths.
  console.log(object);
  //const filePath = object.name;
  // test
  var filePath = 'p0-L6iCPEivPv1E-xTsR2E.jpg';
  // end test
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

  console.log("fileName " + fileName);
  var  collectionId = "test-product"; // 1 char
  var index = 0; // 1 char
  var docId = fileName.substring(2,22); // 20 char

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
  //return mkdirp(tempLocalDir).then(() => {
    console.log("makedir success ");
    // Download file from bucket.
    return file.download({destination: tempLocalFile
  }).then(() => {
    console.log('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
  }).then(() => {
    console.log('Thumbnail created at', tempLocalThumbFile);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
  }).then(() => {
    console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);
    console.log("file deleted ");
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
    images = [{large: fileUrl, thumbnail: thumbFileUrl}];
    return admin.firestore().collection(collectionId).doc(docId).update({images: images});
  }).then(() => console.log('Thumbnail URLs saved to database.'));
});
