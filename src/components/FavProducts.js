import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'
import {MdEventSeat} from 'react-icons/lib/md';
import styled from 'styled-components'
import FirebasePaginator from './firebase-pag';
import InfiniteScroll from 'react-infinite-scroll-component';

const Button = styled.button`
  width:180px;
  @media only screen and (max-width: 767px) {
    height: 40px;
    width:100%;
  `;
const PAGE_SIZE = 12;
var options = {
  pageSize: PAGE_SIZE,
  finite: true,
  retainLastPage: false
};
var paginator;

class FavProducts extends Component {
  constructor() {
    super();
    this.likedProducts = this.likedProducts.bind(this);
    this.state = {
      products: {},
      extraProducts: [],
      loading: true,
      empty: true
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
          this.setState({products: products, loading: false, empty: false})

        });

      });
    }else {
      this.setState({loading: false, empty: true})
  }
  }

  componentWillMount() {
    this.listToArray = this.listToArray.bind(this)
    this.firebasePaginatorFiltering1 = this.firebasePaginatorFiltering.bind(this, ref)
    this.forwardFiltring = this.forwardFiltring.bind(this)

      if(this.props.shortList){
        FirebaseServices.likes.child(this.props.currentUser.uid).child("products").limitToLast(3).once("value", function (snapshot) {
        }).then(snapshot => this.likedProducts(snapshot.val()));
    } else {
      // this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/products`)
      // .then(val => this.likedProducts(val))
      var ref = FirebaseServices.likes.child(`${this.props.currentUser.uid}/products`)
      paginator = new FirebasePaginator(ref, options)
      this.firebasePaginatorFiltering()
    }
  }

  componentWillUnmount() {
    this.userLikesRef && base.removeBinding(this.userLikesRef);
    if (paginator) {
      paginator.off('value', () => {
      });
    }
  }

  listToArray() {
    const products = this.state.products
    const productIds = Object.keys(products);

    var arr = [];
    productIds.reverse().map(id => {
      const product = products[id];
      console.log("copy product " + product.id)
      arr.push(product)
    });
    var list = []
    if (this.state.extraProducts.length < 1) {
      list = arr.slice()
    }else {
      list = [...this.state.extraProducts, ...arr.slice()]
    }
    this.setState({extraProducts: list, loading: false})
  }

  firebasePaginatorFiltering() {
    var handler = ( () => {
      var productIds = (Object.keys(paginator.collection))
      console.log(productIds.length)
      if (productIds.length > 0){
        var newProducts = {}
        const listPromises = productIds.map(id => {
          return FirebaseServices.products.child(id).once('value', snapshot => {
            snapshot.val()
            console.log(snapshot.val())
            newProducts = [...newProducts, snapshot.val()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          this.setState({products: newProducts, empty: false})
          this.listToArray();

        })//results.then
      } //newProductIds.length
  })
    paginator.on('value', handler);
  }

  forwardFiltring(){
    paginator.previous()
    .then()
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
        <Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >
        <hr style={{marginBottom: '30px'}}/>
         {this.state.empty
         ? <div><h2 style={{color:'rgb(26,156,142)'}}>المنتجات المفضلة</h2>
            <h5 > ليس لديك منتجات مفضلة </h5> </div>
         : <div><Link to={`/favproducts`}>
          <h2 style={{color:'rgb(26,156,142)'}}>المنتجات المفضلة</h2>
          </Link>
          </div>
        }
            {productIds.map(id => {
              const product = products[id];
              return <ProductBrief key={id} product={product} />;
            })}

          </Col>
          </Row>

        </Grid>
    );
  } else {
    var newProducts = this.state.extraProducts.slice()
    return (
      <Grid Grid style={{backgroundColor:"white"}}>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>

       <Col xs={12}  lg={12}>
       <InfiniteScroll style={{overflow:'none'}}
          hasMore={!paginator.isLastPage}
          next={ this.forwardFiltring}
        >
        <div style={{height:'70px'}}>
        <h2 style={{color:'rgb(26,156,142)',textAlign:'center'}}> <MdEventSeat className="icons" style={{color:'rgb(26,156,142)'}}/>  منتجاتي المفضلة</h2>
        </div>
        <hr style={{marginBottom: '30px'}}/>
        {newProducts.length < 1
        ? <h5> ليس لديك منتجات مفضلة </h5>
        : null}
        {newProducts.map((product, index) => {
          return <ProductBrief key={product.id} product={product} />;
        })}
         </InfiniteScroll>

         </Col>
         </Row>

       </Grid>
  );
  }
  }
}

export default FavProducts;
