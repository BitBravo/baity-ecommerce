import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base, DBBase } from "../base";
import FirestoreServices from './FirestoreServices'
import FirebaseServices from './FirebaseServices'
import CartList from './CartList';
import CartBrief from "./CartBrief";
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

const Button =styled.button`
display:block;
margin-left:auto;
margin-right:auto;
width:30%;
height:40px;
@media only screen and (max-width: 767px) {
    width:80%;
   height:30px;;
}
`

class MyCart extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removefromCart = this.removefromCart.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.fetchItems = this.fetchItems.bind(this)


    this.state = {
      basket: {},
      products: {},
      loading: true,
      total: 0,
      completed: false,
      errorHandling: {
        showError: false,
        errorMsg: ""}
    };
  }

  componentWillMount() {
    this.fetchItems()
  }

  componentWillUnmount() {
    this.basketRef && base.removeBinding(this.basketRef);
  }

  fetchItems() {
    // var path = FirebaseServices.BASKET_PATH + `/${this.props.currentUser.uid}/items`
    // console.log("path " + path)
    // this.basketRef = DBBase.bindToState(path, {
    //   context: this,
    //   state: "basket",
    //   then(data) {
    //     console.log("DBBase data: " + data)
    //     var productIds = Object.keys(this.state.basket)
    //     console.log(productIds)
      var ref = FirebaseServices.basket.child(`${this.props.currentUser.uid}/items`)
      ref.once('value',snapshot => {

        if(snapshot.val() !== null) {
        var newProducts = {}
        var total = 0
        var productIds = Object.keys(snapshot.val())
        var products = snapshot.val()
        const listPromises = productIds.map(doc =>
            FirestoreServices.products.doc(doc).get().then(snapshot => {
            console.log("items " + snapshot.data())
            total = Number(snapshot.data().price) + total
            return newProducts = [...newProducts, snapshot.data()]
          })
        );

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          console.log("data " + this.state.basket.length)
          this.setState({products: newProducts, loading: false, total: total, basket: products})
          console.log("newProducts " + newProducts.length)
        })

      }else {
        this.setState({loading:false})
      }
    })
      // onFailure(error) {
      // this.setState({errorHandling: {showError: true, errorMsg: error}});
      // }

  }

  handleSubmit(event) {
    // create a chat between user and business owner **later
    // fetch owners emails
    // send email msg with uesr email and product information
    FirebaseServices.basket.child(this.props.currentUser.uid).set({'completed': true})
    this.props.updateCart(false,true)
    this.setState({completed: true});
  }

  removefromCart(id) {
    this.deleteItem(id)
  }

  deleteItem(id) {
    delete this.state.basket[id]
    this.setState({basket: this.state.basket})

    FirebaseServices.basket.child(`${this.props.currentUser.uid}/items/${id}`).remove()
    // for some reason calling fetch will not cause the page to rerender
    this.fetchItems()
    this.props.updateCart(false,false)
  }

  render(){
    var subtotal = this.state.total
    var vat = subtotal * 0.05
    var total = subtotal + vat

    if (this.state.loading)
      return(
       <Loading />
      )
    else if(this.state.completed)
      return (
        <h4 style={{textAlign:'center'}}>تم إرسال الطلب للبائعين، شكرا لتسوقكم معنا</h4>
      )
    else {
      return (
        <Grid>
          <h2 style={{ textAlign:'center',color: 'rgb(26,156,142)'}}>سلة التسوق</h2>
          {this.state.total > 0 ?
            <Row style={{ display: 'flex', flexWrap: 'wrap', boxShadow: '5px 5px 5px #d7d7d7' }} >
            <CartList products={this.state.products} removefromCart={this.removefromCart}/>
            <Col xs={12} style={{ background:'white' }}>
           <h4 style={{ textAlign:'left'}}> قيمة الطلبات: &nbsp;&nbsp;
           <span style={{ color: 'rgb(26,156,142)'}}> {subtotal}ر.س</span></h4>
           <h4 style={{ textAlign:'left'}}> القيمة الضريبية:&nbsp;&nbsp;
           <span style={{ color: 'rgb(26,156,142)'}}> {vat} ر.س </span></h4>
           <h4 style={{ textAlign:'left'}}> المجموع : &nbsp;&nbsp;
           <span style={{ color: 'rgb(26,156,142)'}}> {total} ر.س </span></h4>
           {total > 0
           ?<Button onClick={this.handleSubmit}>اتمام العملية</Button>
           :null}
            </Col>
             </Row>
          : <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
           }
            </Grid>

    );
    };
  }
}
export default MyCart;
