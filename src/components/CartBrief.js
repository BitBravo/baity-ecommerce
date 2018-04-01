import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import styled from 'styled-components'
import {
    Col,
    Modal,
    Row,
    Grid,
    Glyphicon

  } from "react-bootstrap";
  import logo_placeholder from '../assets/img/logo-placeholder.jpg';

const CartRow=styled(Row)`
display:flex;
 flexWrap: wrap;
 background:white;
 margin-bottom:20px;
 box-shadow: 5px 5px 5px #d7d7d7;`

const ProductImg=styled.img`
height:150px;
width:150px;
@media only screen and (max-width: 991px) {
    width:100px;
   height:100px;;
}
`
export class MainCartBrief extends Component {

  constructor() {
    super();

  }

  removeItem() {
    this.props.removefromCart(this.props.product.id)
  }


    render(){
      const product = this.props.product;

    return(
        <Grid>
             <CartRow  >
             <Col xs={4} sm={2}style={{ padding: '0 ' }} >
             <Link to={`/${product.owner}/products/${product.id}`}>
            <ProductImg src={product.images[0].large}/></Link>
             </Col>
             <Col xs={8} sm={10} style={{ padding: '0 ' }}>
             <Col xs={5} sm={5} md={5} lg={5} style={{ padding: '0 0 0 15px' }}>
                <h4 style={{ color: 'rgb(26,156,142)', float: 'left' }}>{product.price} ر.س </h4>
              </Col>
              <Col xs={7} sm={7} md={7} lg={7} style={{ padding: '0' }}>
              <Link  style={{color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
              <h4>{product.name}</h4></Link>
              </Col>
              <p>{product.desc.substring(0,150)}
              <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
              ... المزيد
              </Link>
              </p>
              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
                <p style={{ color: 'rgb(26,156,142)' }}> من : 
                  {product.businessName}
                </p>
              </div>
              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0', left: '15px' }}>
              {/*remove item from the cart by calling the removeItem method passed from myCart
              */}

                  <Glyphicon  style={{cursor: 'pointer'}} glyph="trash" onClick={this.removeItem.bind(this)}/>

              </div>
              </Col>

              </CartRow>
            </Grid>


    );
  };
}


export class HeaderCartBrief extends Component {

  constructor() {
    super();

  }

  removeItem() {
    this.props.removefromCart(this.props.product.id)
  }


    render(){
      const product = this.props.product;

    return(
        <Grid>
              <Row style={{ display: 'flex', flexWrap: 'wrap',width: 'auto ',paddingTop:'5px',borderBottom:'dotted 1px lightgray ' }}>
         
              <Col xs={1} style={{float:'right' }} >
              <Link to={`/${product.owner}/products/${product.id}`}>
            <img src={product.images[0].large} style={{height:'50px',width:'50px'}}/></Link>
             </Col>
             <Col xs={5}  >
             <Link  style={{color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
             <p style={{fontSize:'12px' }}>{product.name}</p></Link>
             <p style={{ color: 'rgb(26,156,142)',fontSize:'14px' }}>{product.price} ر.س </p>

              </Col>
              <hr/>
              </Row>
            </Grid>


    );
  };
}
export default {MainCartBrief,HeaderCartBrief};
