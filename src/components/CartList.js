import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
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


const ProductImg = styled.img`
height:100px;
width:100px;
`
export class MainCartList extends Component {

  constructor() {
      super();
      this.state = {
        products: {}
      }

  }

  componentWillMount() {
    this.setState({products: this.props.products})
  }


  render() {
    const products = this.props.products
    const productIds = Object.keys(products)

    return (

          <Col xs={12} lg={12} style={{ padding: '0 ' }}>

          {productIds.length < 1
          ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
          : <div>{
                productIds.map(id => {
                  const product = products[id];
                return <MainCartBrief key={id} product={product} removefromCart={this.props.removefromCart} />;
              })
            }</div>
          }


          </Col>



      );
  };
}

export class HeaderCartList extends Component {

  constructor() {
      super();
      this.state = {
        products: {}
      }

  }

  componentWillMount() {
    this.setState({products: this.props.products})
  }


  render() {
    const products = this.props.products
    const productIds = Object.keys(products)

    return (

          <div>

          {productIds.length < 1
          ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
          : <div>{
                productIds.map(id => {
                  const product = products[id];
                return <HeaderCartBrief key={id} product={product} removefromCart={this.props.removefromCart} />;
              })
            }</div>
          }
</div>





      );
  };
}