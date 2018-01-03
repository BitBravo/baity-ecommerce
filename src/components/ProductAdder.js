import React, { Component } from "react";
import firebase from "firebase";
import { app, database, storage } from "../base";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Panel
} from "react-bootstrap";
import ProductForm from "./ProductForm";
import styled from 'styled-components'
import FirebaseServices from "./FirebaseServices";


const StyledProductForm = styled.div`
margin-top: 10px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
margin-left: auto;
margin-right: auto;
border-radius: 5px;
width: 90%;
padding: 25px;
color: #3C3C3C;
background: rgb(255,255,255);
animation-name: slideDown;
-webkit-animation-name: slideDown;	
animation-duration: 1s;	
-webkit-animation-duration: 1s;
animation-timing-function: ease;	
-webkit-animation-timing-function: ease;	
visibility: visible !important;	
`;

class ProductAdder extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertProduct = this.insertProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addImages = this.addImages.bind(this);
  }

  insertProduct(product, imgDownloadURL, formErrorViewer, formSuccessViewer) {
    try {
      var postListRef = database.ref("testProducts");
      var newPostRef = postListRef.push();
      newPostRef.set({
        category: product.cat.value,
        city: "الرياض",
        city_department: "",
        dataCreated: Date.now(),
        department: product.dept.value,
        desc: product.desc.value,
        height: product.height.value,
        id: newPostRef.key,
        imgUrl: imgDownloadURL,
        length: product.length.value,
        likes: "0",
        name: product.name.value,
        owner: this.props.currentUser.uid, //user id which is not yet implementd
        postType: "product",
        price: product.price.value,
        width: product.width.value
      })
      .then(() => {
        console.log('insesrt succeeded');
        formSuccessViewer();
      })
      .catch( (error) => {
        console.log('could not insert following product: ');
        console.log(product);
        console.log(`ERROR: code: ${error.code}, message:${error.message}`);
        formErrorViewer(error.message);
      });
      // formSuccessViewer();
    } catch (error) {
      console.log('could not insert following product: ');
      console.log(product);
      console.log(`ERROR: code: ${error.code}, message:${error.message}`);
      formErrorViewer(error);
    }
  }

  addImages(productId, newImages, formPercentageViewer){
    return FirebaseServices.addProductImages(productId, newImages, formPercentageViewer)
  }

  addProduct(product){
    //add owner to product
    product = {...product, owner: this.props.currentUser.uid};
    return FirebaseServices.insertProduct(product);//returns a promise resolved with product ID 
  }

  handleSubmit(product, newImages, formErrorViewer, formSuccessViewer, formPercentageViewer) {
    //id = push
    //set(product).then
    //upload images.then
    //set(images)
    this.addProduct(product)
        .then((productId) => this.addImages(productId, newImages, formPercentageViewer))
        .catch((error) => {
          console.log('could not insert product or upload images');
          console.log(`ERROR: code: ${error.code}, message:${error.message}`);
          formErrorViewer(`ERROR: could not insert product or upload images. error code: ${error.code}, error message:${error.message}`)
        }) 
    
    //value should be the value of state of the ProductForm

    
  }

  render() {
    return (
      <StyledProductForm>
        
            <ProductForm currentUser={this.props.currentUser} isNewProduct={true} onSubmit={this.handleSubmit.bind(this)} />
        
      </StyledProductForm>
    );
  }
}

export default ProductAdder;
