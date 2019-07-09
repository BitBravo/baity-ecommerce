import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import {
  Col,
  Row,
  Grid,
  Glyphicon

} from "react-bootstrap";

const CartRow = styled(Row)`
display:flex;
 flexWrap: wrap;
 background:white;
 margin-bottom:20px;
 box-shadow: 5px 5px 5px #d7d7d7;
 @media only screen and (max-width: 991px) {
 height:130px;}`


const ProductImg = styled.img`
height:150px;
width:150px;
@media only screen and (max-width: 991px) {
    width:100px;
   height:100px;;
}
`
const Description = styled.p`
font-size:15px;
dispaly:block;
@media only screen and (max-width: 767px) {
  display:none ;}
`
const Mdescription = styled.p`
display:none;
    @media only screen and (max-width: 767px) {
      float:right;
      font-size:13px;
      display:block;}
      @media only screen and (max-width: 550px) {
        display:none;}
`
const Sdescription = styled.p`
display:none;
    @media only screen and (max-width: 550px) {
      font-size:12px;
      display:block;}
`
export class MainCartBrief extends Component {
  removeItem() {
    this.props.removefromCart(this.props.product.id)
  }


  render() {
    const product = this.props.product;

    return (
      <Grid>
        <CartRow  >
          <Col xs={4} sm={2} md={2} style={{ padding: '0 ' }} >
            <Link to={`/${product.owner}/products/${product.id}`} >
              <ProductImg src={product.images[0].large} /></Link>
          </Col>
          <Col xs={8} sm={10} md={10} style={{ padding: '0 ' }}>
            <Col xs={6} sm={5} md={5} lg={5} style={{ padding: '0 10px 0 5px' }}>
              <h5 style={{ color: 'rgb(26,156,142)', float: 'left' }}>{product.price} ر.س </h5>
            </Col>
            <Col xs={6} sm={7} md={7} lg={7} style={{ padding: '5px 0' }}>
              <Link style={{ color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                <Description style={{ color: 'rgb(26, 156, 142)' }}>{product.name}</Description>
                <Mdescription style={{ color: 'rgb(26, 156, 142)' }}>{product.name}</Mdescription>
                <Sdescription style={{ color: 'rgb(26, 156, 142)' }}>{product.name}</Sdescription></Link>
            </Col>
            <Col xs={12} style={{ padding: '0' }}>
              <Col xs={4} sm={3} md={2} lg={4} style={{ padding: '0 10px 0 5px' }}>
                <h6 style={{ color: 'rgb(26,156,142)', float: 'left' }}> الكمية :
                  {product.quantity}
                </h6>
              </Col>
              <Col xs={8} sm={9} md={10} lg={8} style={{ padding: '0' }}>
                <Description>{product.desc.substring(0, 200)}
                  <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                    ... المزيد
              </Link>
                </Description>
                <Mdescription>{product.desc.substring(0, 120)}
                  <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                    ... المزيد
              </Link>
                </Mdescription>
                <Sdescription>{product.desc.substring(0, 40)}
                  <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                    ... المزيد
              </Link>
                </Sdescription>
              </Col>
            </Col>
            <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
              <p style={{ color: 'rgb(26,156,142)' }}> من :
                  {product.businessName}
              </p>
            </div>
            <div style={{ display: 'inline-block', position: 'absolute', bottom: '0', left: '15px' }}>
              {/*remove item from the cart by calling the removeItem method passed from myCart
              */}

              <Glyphicon style={{ cursor: 'pointer' }} glyph="trash" onClick={this.removeItem.bind(this)} />

            </div>
          </Col>

        </CartRow>
      </Grid>


    );
  };
}


export class HeaderCartBrief extends Component {
  removeItem() {
    this.props.removefromCart(this.props.product.id)
  }


  render() {
    const product = this.props.product;

    return (
      <Grid >
        <Row style={{ display: 'flex', flexWrap: 'wrap', width: 'auto ', borderBottom: 'dotted 1px lightgray ' }}>

          <Col xs={0.75} lg={0.75} style={{ paddingRight: '5px', paddingTop: '5px' }} >
            <Link to={`/${product.owner}/products/${product.id}`}>
              <img src={product.images[0].large} style={{ height: '50px', width: '50px' }} alt=""/></Link>
          </Col>
          <Col xs={3} lg={3} style={{ float: 'right', paddingTop: '5px' }}>
            <Link style={{ color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
              <p style={{ fontSize: '12px' }}>{product.name}</p></Link>
            <p style={{ color: 'rgb(26,156,142)', fontSize: '14px' }}>{product.price} ر.س </p>
            <p style={{ color: 'rgb(26,156,142)', fontSize: '8px' }}> الكمية :
                  {product.quantity}
            </p>
          </Col>
          <hr />
        </Row>
      </Grid>
    );
  };
}
// export default { MainCartBrief, HeaderCartBrief };
