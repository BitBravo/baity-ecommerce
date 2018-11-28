import React, { Component } from "react";
import { MainCartBrief, HeaderCartBrief } from "../CartBrief";
import styled from 'styled-components'
import { Col } from 'react-bootstrap';


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
    this.setState({ products: this.props.products })
  }

  render() {
    const products = this.props.products
    const productIds = Object.keys(products)

    return (

      <Col xs={12} lg={12} style={{ padding: '0 ' }}>
        {productIds.length < 1
          ? <h4 style={{ textAlign: 'center' }}>لم تقم باضافة منتجات، إبدأ الان</h4>
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
    this.setState({ products: this.props.products })
  }

  render() {
    const products = this.props.products
    const productIds = Object.keys(products)

    return (
      <div >
        {productIds.length < 1
          ? <h4 style={{ textAlign: 'center' }}>لم تقم باضافة منتجات، إبدأ الان</h4>
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