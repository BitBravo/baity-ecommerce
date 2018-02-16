import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'


class FavProducts extends Component {
  constructor() {
    super();
    this.likedProducts = this.likedProducts.bind(this);
    this.state = {
      products: {},
      loading: true
    };
  }

  likedProducts(val) {
    if(val){
      const productIds = Object.keys(val);
      var productsList = {}
      console.log("the list contines" + productIds)
      productIds.map(id => {
        FirebaseServices.products.child(id).once("value", (snapshot) => {
          console.log(snapshot.val())
          var products = [...this.state.products, snapshot.val()]
          this.setState({products: products, loading: false})

        });

      });
    }else {
      this.setState({loading: false})
  }
  }

  componentWillMount() {
      if(this.props.shortList){
        FirebaseServices.likes.child(this.props.currentUser.uid).child("products").limitToLast(3).once("value", function (snapshot) {
        }).then(snapshot => this.likedProducts(snapshot.val()));


    } else {
      this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/products`)
      .then(val => this.likedProducts(val))
    }

  }

  componentWillUnmount() {
    this.userLikesRef && base.removeBinding(this.userLikesRef);
  }

  render() {
    const products = this.state.products;
    const productIds = Object.keys(products);
console.log("In render")
      if (this.state.loading)
      return(
       <Loading/>
      )
    else if (this.props.shortList){
      return (
        
      
         <Grid style={{backgroundColor:"white"}}>
            {console.log("render - shortList")}
        <Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col sm={12}  lg={12}>  <hr/>
          <Link to={`/favproducts`}>
          <h2 style={{color:'rgb(26,156,142)'}}>المنتجات المفضلة</h2>
          </Link>
            {productIds.map(id => {
              const product = products[id];
              return <ProductBrief key={id} product={product} />;
            })}
             
          </Col>
          </Row>
          
        </Grid>
    );
  } else {
    return (
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col sm={12}  lg={12}>
          {productIds.map(id => {
            const product = products[id];
            return <ProductBrief key={id} product={product} />;
          })}
           <hr/>
         </Col>
         </Row>
       </Grid>
  );
  }
  }
}

export default FavProducts;
