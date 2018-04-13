const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("./bayty-246cc-firebase-adminsdk-bal2m-31a49973ce.json");

try { admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bayty-246cc.firebaseio.com"
  })
} catch (e) { console.log(e)}

exports = module.exports = functions.storage.object().onFinalize((object) => {
    // const filePath = event.data.data().filePath;
    // const file = gcs.bucket(bucket).file(filePath);

    // Use the Vision API to detect labels
    return visionClient.detectLabels(file)
      .then(data => {
        //start code from other function
        // [START eventAttributes]
        const fileBucket = object.bucket; // The Storage bucket that contains the file.
        const filePath = object.name; // File path in the bucket.
        const contentType = object.contentType; // File content type.
        const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
        const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
        // [END eventAttributes]

        // [START stopConditions]
        // Exit if this is triggered on a file that is not an image.
        if (!contentType.startsWith('image/')) {
          console.log('This is not an image.');
          return null;
        }

        // Get the file name.
        const fileName = path.basename(filePath);
        // Exit if the image is already a thumbnail.
        if (fileName.startsWith('thumb_')) {
          console.log('Already a Thumbnail.');
          return null;
        }
        // [END stopConditions]

        // from fileName get doc id, index, and collection (procudt, prof,...)
        // p: product, i: idea, n: normal, l: business logo
        // var  collectionId = fileName.charAt(0); // 1 char
        // var index = fileName.charAt(1); // 1 char
        // var docId = fileName.substring(2,22); // 20 char

        var  collectionId = "test-product"; // 1 char
        var index = 0; // 1 char
        var docId = fileName.substring(2,22); // 20 char
        // [START thumbnailGeneration]
        // Download file from bucket.
        const bucket = gcs.bucket(fileBucket);
        const tempFilePath = path.join(os.tmpdir(), fileName);
        const metadata = {
          contentType: contentType,
        };
        return bucket.file(filePath).download({
          destination: tempFilePath,
        }).then(() => {
          console.log('Image downloaded locally to', tempFilePath);
          // Generate a thumbnail using ImageMagick.
          return spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
        }).then(() => {
          console.log('Thumbnail created at', tempFilePath);
          // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
          const thumbFileName = `thumb_${fileName}`;
          const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
          // Uploading the thumbnail.
          return bucket.upload(tempFilePath, {
            destination: thumbFilePath,
            metadata: metadata,
          });
          // Once the thumbnail has been uploaded delete the local file and get URL.
        }).then(() => {
        console.log('Thumbnail uploaded to Storage at', thumbFilePath);
        // delete the local files to free up disk space.
        fs.unlinkSync(tempFilePath);
        //fs.unlinkSync(tempLocalThumbFile);
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
        // [END thumbnailGeneration]

    })
  })
