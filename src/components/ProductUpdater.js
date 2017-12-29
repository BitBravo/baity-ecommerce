import React, { Component } from "react";
import { Modal, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices'
import Loading from "./Loading";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Panel
} from "react-bootstrap";
import ProductForm from "./ProductForm";

class ProductUpdater extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;

    this.state = {
      product: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: "error"
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.formPercentageViewer = this.formPercentageViewer.bind(this)
    this.formSuccessHandler = this.formSuccessHandler.bind(this)
  }

  componentWillMount() {
    this.productsRef = base.syncState(`${FirebaseServices.PRODUCTS_PATH}/${this.productId}`, {
      context: this,
      state: "product",
      then(data) {
        this.setState({ loading: false });
      },
      onFailure(error) {
        this.setState({ errorHandling: { showError: true, errorMsg: error } });
      }
    });
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
  }

  formPercentageViewer(percentage) {   
    this.setState(
      {
        uploadProgress: {show: percentage < 100, percentage: percentage}
      }
    )

  }

  formSuccessHandler() {
    //hide waiting alert then show submission success msg
    let uploadProgress = {
      show: false, percentage: 100
    }
    //show success popup
    let submitStatus = {
      showSubmitModal: true,
      submitSuccessful: true,
      errorMsg: ''
    }
    let newState = {...this.state, uploadProgress, submitStatus}
    
    this.setState(newState)
  }

  updateProduct(product, imgDownloadURL, formErrorViewer, formSuccessViewer) {
    try {
      var postListRef = database.ref("testProducts/" + this.productId);
      postListRef
        .update({
          category: product.cat.value,
          city: this.state.product.city,
          city_department: this.state.product.city_department,
          // dataCreated: Date.now(), // dateCreated should not be changed
          department: product.dept.value,
          desc: product.desc.value,
          height: product.height.value,
          // id: this.productId, // id should not be changed
          imgUrl: imgDownloadURL,
          length: product.length.value,
          //likes: this.state.product.likes, // likes should not be affected
          name: product.name.value,
          // owner: this.state.product.owner, // owner should not change
          postType: this.state.product.postType,
          price: product.price.value,
          width: product.width.value
        })
        .then(() => {
          console.log("insesrt succeeded");
          formSuccessViewer();
        })
        .catch(error => {
          console.log("could not insert product");
          console.log(product);
          formErrorViewer(error.message);
        });
      // formSuccessViewer();
    } catch (error) {
      formErrorViewer(error);
    }
  }

  handleSubmit(
    formData,
    formErrorViewer,
    formSuccessViewer,
    formPercentageViewer
  ) {
    //value should be the value of state of the ProductForm
    console.log(formData);
    var imgDownloadURL = null;

    //if we have a new image then upload it
    if (formData.newImages.length > 0) {
      //1- upload the image of the product.
      //2- add the product to the database
      //Check (https://firebase.google.com/docs/storage/web/upload-files) &
      //check (https://firebase.google.com/docs/database/web/read-and-write) for more info
      var newImageFile = formData.newImages[0].file;//of type html File/Blob
      //get a reference for the image bucket (the placeholder where we will put the image into)
      var imagesRef = storage
        .ref()
        .child("testProductImages/" + Date.now() + Math.random());
      //upload the image. This is a task that will run async. Notice that it accepts a file as in
      //browser API File (see https://developer.mozilla.org/en-US/docs/Web/API/File)
      var metadata = {
        contentType: newImageFile.type
      };
      //The following will return a task that will execte async
      var uploadTask = imagesRef.put(newImageFile, metadata);
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
          formPercentageViewer(progress);
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
          console.log("error uploading image of product");
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
          formErrorViewer(error.message);
        },
        //use arrow function so that you can access this.insertProduct. See (https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback)
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          imgDownloadURL = uploadTask.snapshot.downloadURL;
          console.log("upload sucessful and image URL is: " + imgDownloadURL);
          //update product with new data and new image URL
          this.updateProduct(
            formData,
            imgDownloadURL,
            formErrorViewer,
            formSuccessViewer
          );
        }
      ); //updateTask.on
    } else {
      //END-if there is an image to be uploaded
      //else just keep the current URL
      imgDownloadURL = formData.imagesFromDB[0];
      //update product with new data and new image URL
      this.updateProduct(
        formData,
        imgDownloadURL,
        formErrorViewer,
        formSuccessViewer
      );
    }
  }

  render() {
   
    if (this.state.loading && !this.state.errorHandling.showError)
      return <Loading />;
    if (this.state.errorHandling.showError)
      return (
        <div>
          <Modal show={true} style={{ top: 300 }}>
            <Modal.Header>حدث خطأ غير معروف</Modal.Header>
            <Modal.Body>
              
                <Alert bsStyle="danger">
                  {this.state.errorHandling.errorMsg.message}
                </Alert>
                <Link to="/">
                <Button>العودة للصفحة الرئيسية</Button>
                </Link>
            </Modal.Body>
          </Modal>
        </div>
      );
    if (!this.state.loading && !this.state.showError)
      return (
        <div
          style={{ padding: "10em", background: "#F5F5F5", color: "#444444" }}
        >
          <div className="panel panel-default">
            <div className="panel-body">
              <ProductForm
                isNewProduct={false}
                product={this.state.product}
                onSubmit={this.handleSubmit.bind(this)}
              />
            </div>
          </div>
        </div>
      );
  }
}

export default ProductUpdater;
