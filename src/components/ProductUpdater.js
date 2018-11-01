import React, { Component } from "react";
import { Modal, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirestoreServices from 'services/FirestoreServices'
import Loading from "./Loading";
import styled from 'styled-components'


import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Panel
} from "react-bootstrap";
import ProductForm from "./ProductForm";

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

const ErrorMessage = (props) =>
  <div>
  <Modal show={true} style={{ top: 300 }}>
    <Modal.Header>حدث خطأ غير معروف</Modal.Header>
    <Modal.Body>

        <Alert bsStyle="danger">
          {props.message}
        </Alert>
        <Link to="/">
        <Button>العودة للصفحة الرئيسية</Button>
        </Link>
    </Modal.Body>
  </Modal>
  </div>

function getStateForNewProduct(){
  return {
    isNewProduct: true,
    product: null,
    loading: false,
    errorHandling: {
      showError: false,
      errorMsg: "error"
    },
  }
}

function getStateForUpdateProduct(){
  return {
    product: {},
    loading: true,
    errorHandling: {
      showError: false,
      errorMsg: "error"
    },
    isNewProduct: false,
    isUpdated: false
  };
}

class ProductUpdater extends Component {
  constructor(props) {
    super(props);
    console.log(`${this.constructor.name}.constructor`);
    //if we updating an existing product
    if (this.props.match.params.id){
      this.productId = this.props.match.params.id;

      this.state = getStateForUpdateProduct();
    } else {
      this.state = getStateForNewProduct();
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    // this.formPercentageViewer = this.formPercentageViewer.bind(this)
    // this.formSuccessHandler = this.formSuccessHandler.bind(this)
  }

  componentWillMount() {
    console.log(`${this.constructor.name}.componentWillMount`);
    if (!this.state.isNewProduct){
      this.productsRef = base.bindDoc(`${FirestoreServices.PRODUCTS_PATH}/${this.productId}`, {
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
    //add owner to product
    FirestoreServices.readDBRecord('profUser', this.props.currentUser.uid)
    .then(val => {
      console.log(val.name)
      this.name = val.name
      })
  }

  componentWillUnmount() {
    console.log(`${this.constructor.name}.componentWillUnmount`);
    !this.state.isNewProduct && this.productsRef && base.removeBinding(this.productsRef);
  }


  componentDidMount(){
    console.log(`${this.constructor.name}.componentDidMount`);
  }

  /**
   * This should be called if user clicked on 'add new product' while viewing the form.
   * Not sure if there is another case where this method will be called
   */
  componentWillReceiveProps(nextProps){
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
    //if there is no id in the url (which means a new product)
    if (!nextProps.match.params.id){
      //since updating current product was inturrupted,
      !this.state.isNewProduct && this.productsRef && base.removeBinding(this.productsRef);
      this.productId = undefined
      this.setState(getStateForNewProduct());
    }
  }

  componentWillUpdate(){
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }

//addImages(productId, newImages, selectedImg, formPercentageViewer){
  addImages(productId, newImages, formPercentageViewer){
    return FirestoreServices.addProductImages(productId, newImages, formPercentageViewer, this.props.currentUser.uid)
  }

  addProduct(product){
    product = {...product, owner: this.props.currentUser.uid, businessName: this.name};
    return FirestoreServices.insertProduct(product);//returns a promise resolved with product ID
  }


  updateProduct(newProductData){
    return FirestoreServices.updateProduct(newProductData, this.productId);//returns a promise resolved with product ID
  }

//  handleSubmit(product, newImages, selectedImg, formPercentageViewer) {
  handleSubmit(product, newImages, formPercentageViewer) {
    if (this.state.isNewProduct) {
      return this.addProduct(product)
          .then((productId) => this.addImages(productId, newImages, formPercentageViewer))
          .catch((error) => {
            console.log('could not insert product or upload images');
            console.log(`ERROR: code: ${error.code}, message:${error.message}`);
            throw error
          })
    } else {
      return this.updateProduct(product)
        .then(() => {
          this.setState({isUpdated: true});
          return this.addImages(this.productId, newImages, formPercentageViewer)
        })
        .catch((error) => {
          console.log('could not update product or upload images');
          console.log(`ERROR: code: ${error.code}, message:${error.message}`);
          throw error
        })
    }
  }

  deleteImageFromDB(imageUrl){
    return FirestoreServices.deleteProductImage(imageUrl, this.productId)
  }

  render() {
    console.log(`${this.constructor.name}.render`);
    if (this.state.loading && !this.state.errorHandling.showError)
      return <Loading />;
    if (this.state.errorHandling.showError)
      return (
        <ErrorMessage message={this.state.errorHandling.errorMsg.message}/>

      );
    if (!this.state.loading && !this.state.showError){
      return (
        <StyledProductForm>
              <ProductForm
                isNewProduct={this.state.isNewProduct}
                product={this.state.product}
                onSubmit={this.handleSubmit.bind(this)}
                currentUser={this.props.currentUser}
                deleteImageFromDB={this.deleteImageFromDB.bind(this)}
                isUpdated={this.state.isUpdated}
              />
        </StyledProductForm>
      );
    }
  }
}

export default ProductUpdater;
