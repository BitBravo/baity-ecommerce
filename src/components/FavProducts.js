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
         <div style={{paddingTop: "30px"}}>
         {console.log("render - shortList")}
        <Grid>
        <Row>
          <Link to={`/favproducts`}>
          <label>المنتجات المفضلة</label>
          </Link>
          </Row>
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
            {productIds.map(id => {
              const product = products[id];
              return <ProductBrief key={id} product={product} />;
            })}
          </Row>
        </Grid>
      </div>
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

export default FavProducts;
