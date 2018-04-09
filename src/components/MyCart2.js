import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import {MainCartList,HeaderCartList} from './CartList';
import {MainCartBrief,HeaderCartBrief}from "./CartBrief";
import styled from 'styled-components'
import {
    Col,
    Modal,
    Row,
    Grid,
    Glyphicon
  } from "react-bootstrap";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import Loading from './Loading'

const Cartbutton = styled.button`
display:block;
margin-left:auto;
margin-right:auto;
height:35px;
width:140px;
background-color:rgb(26, 156, 142);
`
const Button =styled.button`
display:block;
margin-left:auto;
margin-right:auto;
width:30%;
height:40px;
@media only screen and (max-width: 767px) {
    width:80%;
    height:35px;;
}
`
const DropCart=styled.div`
width: 250px;
height:200px;
 overflow-y:auto;
 overflow-x: hidden;
 padding-top:5px;
`



export class HeaderCart extends Component {

  constructor() {
    super();
    this.fetchItems = this.fetchItems.bind(this)


    this.state = {
      basket: {},
      products: {},
      loading: true,
      total: 0,
      completed: false,
      errorHandling: {
        showError: false,
        errorMsg: ""},
     
      };

   }
  componentWillMount() {
    this.fetchItems()
  }

  

  fetchItems() {
    var path = FirebaseServices.BASKET_PATH + `/${this.props.currentUser.uid}/items`
    console.log("path " + path)
    this.basketRef = base.syncState(path, {
      context: this,
      state: "basket",
      then(data) {
        var productIds = Object.keys(this.state.basket)

        var newProducts = {}
        var total = 0
        const listPromises = productIds.map(id => {
          return FirebaseServices.products.child(id).once('value', snapshot => {
            snapshot.val()
            total = Number(snapshot.val().price) + total
            newProducts = [...newProducts, snapshot.val()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          console.log("data " + this.state.basket.length)
          this.setState({products: newProducts, loading: false, total: total})
          console.log("newProducts " + newProducts.length)
        })
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    })
  }
 
 
  render(){
    var subtotal = this.state.total

    if (this.state.loading)
      return(
       <Loading />
      )
    
    else {
      return (
            <DropCart >
            <p style={{ textAlign:'center'}}>سلة التسوق</p>
            <hr/>
            <HeaderCartList products={this.state.products}/>
           <h4 style={{ textAlign:'center'}}> المجموع : 
        <span style={{ color: 'rgb(26,156,142)'}}> {subtotal} ر.س </span>
           </h4>
             </DropCart>
          


    );
    };
  }
}