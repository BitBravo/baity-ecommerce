import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'
import styled from 'styled-components'
import {MdEventSeat} from 'react-icons/lib/md';


const Button = styled.button`
  width:180px;
  @media only screen and (max-width: 767px) {
    height: 30px;
    width:100%;
  `;

class ProductList extends Component {
  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      products: {},
      loading: true
    };
  }

  componentWillMount() {
    if (this.props.thisUserOnly){
      if(this.props.shortList){
    this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
      context: this,
      state: "products",
      queries: {
        orderByChild: 'owner',
        limitToLast: 3,
        equalTo: this.props.currentUser.uid
      },
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  } else {
    this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
      context: this,
      state: "products",
      queries: {
        orderByChild: 'owner',
        equalTo: this.props.currentUser.uid
      },
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }
  } else {
    this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
      context: this,
      state: "products",
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
  }

  render() {
    const products = this.state.products;
    const productIds = Object.keys(products);



      if (this.state.loading)
      return(
       <Loading/>
      )
    else if (this.props.shortList){
      return (
        <Grid style={{backgroundColor:"white"}}>
        {this.props.group === 'prof'
        ?<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >  
        <hr/>
        <Col xs={5} md={3} lg={2} >
          <Link to={`/newproduct`}>
            <Button>إضافة منتج<MdEventSeat className="icons" /></Button>
          </Link>
          </Col>
          <Col xs={7} md={9} lg={10} >
          <Link to={`/myproducts`}>
          <h2 style={{color:'rgb(26,156,142)'}}>منتجاتي</h2>
          </Link>
          </Col>
         
          </Col>
          </Row>
        :<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
          <Link  to={`/favproducts`}>
          <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}>المنتجات المفضلة</h2>
          </Link >
          </Row>
        }
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
            {productIds.map(id => {
              const product = products[id];
              return <ProductBrief key={id} product={product} />;
            })}
          </Row>
        </Grid>
 
    );
  } else {
    return (
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
          {productIds.map(id => {
            const product = products[id];
            return <ProductBrief key={id} product={product} />;
          })}
        </Row>
      </Grid>
    </div>
  );
  }
  }
}

export default ProductList;
