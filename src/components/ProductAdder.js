import React, { Component } from 'react';
import firebase from 'firebase';
import { app } from "../base";
import ImageUploader from './ImageUploader'
 
class ProductAdder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    };
    //change to true if you want to upload multiple images per product
    this.multipleFiles = false;
  }
 
  
 
  handleOnDrop(files, rejectedFiles) {
    var newFiles = [];
    //always (1) copy state value, (2) change the value, (3) then assign it back to state
    this.multipleFiles
      ? (newFiles = [...this.state.files, ...files])
      : (newFiles = [...files]); //allow one image only and overwrite previous one
    this.setState({
      files: newFiles
    });
  }


    componentWillUnmount() {
      //to avoid memory leaks. See Important note @ (https://react-dropzone.js.org/)
      this.state.files.map(file => {
        window.URL.revokeObjectURL(file.preview);
      });
    }


    handleUploadImages() {
      //Check (https://firebase.google.com/docs/storage/web/upload-files) for more info
      this.state.files.map(file => {
        //get a reference for the image bucket (the placeholder where we will put the image into)
        var imagesRef = app
          .storage()
          .ref()
          .child("testProductImages/" + Date.now() + Math.random());
        //upload the image. This is a task that will run async. Notice that it accepts a file as in
        //browser API File (see https://developer.mozilla.org/en-US/docs/Web/API/File)
        var metadata = {
          contentType: file.type
        };
        //The following will return a task that will execte async
        var uploadTask = imagesRef.put(file, metadata);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
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
          function(error) {
            // Handle unsuccessful uploads
            console.log("error uploading image of product");
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
          },
          function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log("upload sucessful and image URL is: " + downloadURL);
          }
        );
      });
    }
  


  render() {
    return (
      <div>
        <ImageUploader onDrop={this.handleOnDrop.bind(this)} multipleFiles={this.multipleFiles} files={this.state.files}/>
        <button onClick={this.handleUploadImages.bind(this)}>Upload Images</button>

      </div>
    );
  }
}
 
export default ProductAdder;