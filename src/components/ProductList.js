import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import FirestoreServices from './FirestoreServices'
import FirestorePaginator from './FirestorePaginator'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'
import styled from 'styled-components'
import {MdEventSeat} from 'react-icons/lib/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from '../assets/img/AddingProduct.png';

const IconImg = styled.img`
width:20px;
 height:20px;
 margin-right:20px;
 @media only screen and (max-width: 767px) {
  width:15px;
  height:15px;
  margin-right:10px;
 }`


const Button = styled.button`
  width:180px;
  @media only screen and (max-width: 767px) {
    height: 40px;
    width:100%;
  `;

var paginator;
var hasMore = true;

class ProductList extends Component {
  constructor() {
    super();
    console.log("ProductList Constroctor");
    this.state = {
      products: {},
      extraProducts: [],
      loading: true,
      firstTime: true,
      page: 0,
      filter: "",
      filterValue: "",
      owner: ""
    };

  }

  componentWillMount() {
    this.listToArray = this.listToArray.bind(this)
    this.forward = this.forward.bind(this)
    this.firePaginator = this.firePaginator.bind(this)
    //FirebaseServices.filterIndexing();
    //FirebaseServices.filterIndexingStyle();
    //FirebaseServices.addOwnerName()

    if (this.props.thisUserOnly){
      this.businessProducts = this.businessProducts.bind(this)
    } else {
      var ref = FirestoreServices.products
      this.firePaginator(ref);
    }
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.filter){
    if(nextProps.filterValue.length > 0) {
      this.setState({loading: true, firstTime: true})
      var type;
      switch (nextProps.filter) {
        case 'department': type = FirebaseServices.deptProduct; break;
        case 'style': type = FirebaseServices.styleProduct; break;
      }
      var ref = type.child(nextProps.filterValue)
      this.firebasePaginatorFiltering(ref, nextProps.filter, nextProps.filterValue)
    }else {
      if(nextProps.filterValue.length < 1) {
        this.setState({loading: true})
      // reset the product list by deleting all from the extraProducts
      this.setState({extraProducts: [], filter: '', filterValue: ""})
      console.log("else block " + this.props.filter)

      var ref = FirebaseServices.products
      paginator = new FirestorePaginator(ref, {})
      this.firebasePaginator(ref)
    }}}
  }

  businessProducts(){
      var owner;
      if(this.props.user){
        owner = this.props.currentUser
        this.setState({owner: owner})
      }else{
        owner = this.props.currentUser.uid
        this.setState({owner: owner})
      }
      // Here in the profile page or the company page
      if(this.props.shortList){
        this.productsRef = base.bindCollection(FirestoreServices.PRODUCTS_PATH, {
          context: this,
          state: "products",
          query: (ref) => {
            return ref.where('owner', '==', owner)
                .limit(3);
          },
          then(data) {
            this.setState({loading: false, firstTime: false})
          },
          onFailure(error) {
          this.setState({errorHandling: {showError: true, errorMsg: error}});
          }
        });
    } else { // All products by a company
        var ref = FirestoreServices.products.where("owner", "==", owner)
        this.firePaginator(ref)
    }
  }

  listToArray() {
    // const products = this.state.products
    // const productIds = Object.keys(products);
    //
    // var arr = [];
    // productIds.reverse().map(id => {
    //   const product = products[id];
    //   console.log("copy product " + product.id)
    //   arr.push(product)
    // });
    // var list = [...this.state.extraProducts, ...arr.slice()]
    // //this.setState({extraProducts: arr.slice(), loading: false})
    // this.setState({extraProducts: list, loading: false})

  }

  firePaginator(ref) {
    paginator = new FirestorePaginator(ref, {})
    paginator.on()
    .then((docs) =>
      this.setState({
        products: docs,
        loading: false,
        firstTime: false
      })
     )
  }

  // firebasePaginatorFiltering(ref, filter, filterValue) {
  //   paginator = new FirebasePaginator(ref, options)
  //   this.setState({extraProducts: []})
  //
  //   // the callback for the paginator
  //   var handler = ( () => {
  //     if (this.state.firstTime){
  //       const productIds = Object.keys(paginator.collection);
  //       // array is sorted in assending order
  //       var last = productIds[productIds.length]
  //
  //         this.productsRef = base.bindToState(FirebaseServices.PRODUCTS_PATH, {
  //           context: this,
  //           state: "products",
  //           queries: {
  //             orderByChild: filter,
  //             equalTo: filterValue,
  //             limitToLast: PAGE_SIZE
  //           },
  //           then(data) {
  //             this.setState({loading: false, firstTime: false})
  //             this.listToArray();
  //           },
  //           onFailure(error) {
  //           this.setState({errorHandling: {showError: true, errorMsg: error}});
  //           }
  //         });
  //
  //   }else {
  //     var newPage = this.state.page + 1;
  //     var productIds = (Object.keys(paginator.collection))
  //     console.log(productIds.length)
  //     if (productIds.length > 0){
  //
  //       var newProducts = {}
  //       const listPromises = productIds.map(id => {
  //         return FirebaseServices.products.child(id).once('value', snapshot => {
  //           snapshot.val()
  //           newProducts = [...newProducts, snapshot.val()]
  //         })
  //       });
  //
  //       const results = Promise.all(listPromises)
  //       results.then((snapshot) => {
  //         var newList = [...newProducts, ...this.state.products]
  //
  //         //this.setState({products: newList, page: newPage, loading: false})
  //         this.setState({products: newProducts, page: newPage, loading: false})
  //         this.listToArray();
  //
  //       })//results.then
  //     } //newProductIds.length
  //   }//else
  // }) //handler
  //   paginator.on('value', handler);
  // }

  forward(){
    console.log("calling next()")
    if (!paginator.hasMore){
      hasMore = false;
      console.log("next() Has no more")
      return
    }
    console.log("next() Has more")
    paginator.next()
    .then((docs) => {
      if (!paginator.hasMore){
        hasMore = false;
        console.log("next() Has no more")
        return
      }
      console.log("hasMore = " + paginator.hasMore)
      var newProducts = this.state.products.concat(docs)
      this.setState({
        products: newProducts,
        loading: false,
        firstTime: false
      })
    })
  }

  render() {
    const products = this.state.products
    const productIds = Object.keys(products)

    var msg;
    var title;
    if (this.props.user) {
      msg = "لا يوجد منتجات"
      title = "المنتجات"
    }else {
      msg = "لم تقم باضافة منتجات، إبدأ الان"
      title = "منتجاتي"
    }

    if (this.state.loading)
      return(
       <Loading />
      )
    else if (this.props.shortList){
      return (
        <Grid style={{backgroundColor:"white"}}>
        {this.props.group === 'prof'
        ?<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >
        <hr style={{marginBottom: '30px'}}/>
        <Col xs={5} md={3} lg={2} >
          <Link to={`/newproduct`}>
            <Button>إضافة منتج<IconImg src={Product}/></Button>
          </Link>
          </Col>
          <Col xs={7} md={9} lg={10} >
          <Link to={`/myproducts`}>
          <h2 style={{color:'rgb(26,156,142)'}}>{title}</h2>
          </Link>
          </Col>
          </Col>
          </Row>
        :<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
          <Link  to={`/:id/products`}>
          <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}> المنتجات</h2>
          </Link >
          </Row>
        }
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
          <Col xs={12}  lg={12} >
          {productIds.length < 1
            ? <h4 style={{textAlign:'center'}}>{msg}</h4>
          : null}
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
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>

        <Col xs={12} md={12}>
        <InfiniteScroll style={{overflow:'none'}}
          hasMore={hasMore}
          next={this.forward}
        >
        {products.length < 1
          ? this.props.thisUserOnly
            ?<h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
            :<h4 style={{textAlign:'center'}}>لا يوجد نتائج مطابقة</h4>

        : <div>{
              products.map((product, index) => {
              return <ProductBrief key={product.id} product={product.data()} />;
            })
          }</div>
        }
           </InfiniteScroll>
               </Col>

        </Row>

      </Grid>
    </div>
  );
  }
  }
}

export default ProductList;
