import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'
import styled from 'styled-components'
import {MdEventSeat} from 'react-icons/lib/md';
import FirebasePaginator from './firebase-pag';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from '../assets/img/AddingProduct.png';

const IconImg = styled.img`
width:20px;
 height:20px;`

const Button = styled.button`
  width:180px;
  @media only screen and (max-width: 767px) {
    height: 40px;
    width:100%;
  `;
const PAGE_SIZE = 3;
var options = {
  pageSize: PAGE_SIZE,
  finite: true,
  retainLastPage: false
};
var paginator;

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
    this.lazyLoading = this.lazyLoading.bind(this)
    this.listToArray = this.listToArray.bind(this)
    this.FirebasePaginator = this.firebasePaginator.bind(this, ref)
    this.forward = this.forward.bind(this)
    this.firebasePaginatorFiltering1 = this.firebasePaginatorFiltering.bind(this, ref)
    this.forwardFiltring = this.forwardFiltring.bind(this)

     //FirebaseServices.filterIndexing();
     //FirebaseServices.filterIndexingStyle();

    if (this.props.thisUserOnly){
      var owner;
      if(this.props.user){
        owner = this.props.currentUser
        this.setState({owner: owner})
      }else{
        owner = this.props.currentUser.uid
        this.setState({owner: owner})
      }
      if(this.props.shortList){
        this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
          context: this,
          state: "products",
          queries: {
            orderByChild: 'owner',
            limitToLast: 3,
            equalTo: owner
          },
          then(data) {
            this.setState({loading: false, firstTime: false})
          },
          onFailure(error) {
          this.setState({errorHandling: {showError: true, errorMsg: error}});
          }
    });
  } else {
      var ref = FirebaseServices.ownerProduct.child(owner)
      //this.setState({filter: 'owner', filterValue: owner})
      // paginator = new FirebasePaginator(ref, options)
      this.firebasePaginatorFiltering(ref, 'owner', owner)
  }
} else {
    var ref = FirebaseServices.products
    paginator = new FirebasePaginator(ref, options)
    this.firebasePaginator(ref)
  }

  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
    //var paginator = new FirebasePaginator(FirebaseServices.products);
    if (paginator) {
      paginator.off('value', () => {
      });
    }

  }

  componentWillReceiveProps(nextProps) {
    if (paginator) {
      paginator.off('value', () => {
      });
    }

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

      // paginator = new FirebasePaginator(ref, options)
      //   this.productsRef = base.bindToState(FirebaseServices.PRODUCTS_PATH, {
      //     context: this,
      //     state: "products",
      //     queries: {
      //       orderByChild: 'department',
      //       equalTo: nextProps.filter,
      //       limitToLast: PAGE_SIZE
      //     },
      //     then(data) {
      //       this.setState({loading: false, firstTime: false})
      //       this.listToArray();
      //     },
      //     onFailure(error) {
      //     this.setState({errorHandling: {showError: true, errorMsg: error}});
      //     }
      //   });
    }else {
      if(nextProps.filterValue.length < 1) {
        this.setState({loading: true})
      // reset the product list by deleting all from the extraProducts
      this.setState({extraProducts: [], filter: '', filterValue: ""})
      console.log("else block " + this.props.filter)

      var ref = FirebaseServices.products
      paginator = new FirebasePaginator(ref, options)
      this.firebasePaginator(ref)
    }}}
  }

  lazyLoading(){
    this.print()
    this.setState({loading: true})
          const productIds = Object.keys(this.state.products);
          console.log("lazyLoading - Last element = " + productIds[0])

          var products = [...this.state.products]
          console.log("length of products" + products.length)
        this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
          context: this,
          state: "products",
          queries: {
            orderByKey: 'key',
            limitToLast: 2,
            endAt: productIds[0]
          },
          then(data) {

            this.setState({firstTime: false})
            this.listToArray()
          },
          onFailure(error) {
          this.setState({
            errorHandling: {showError: true, errorMsg: error}});
          }
        });
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
    var list = [...this.state.extraProducts, ...arr.slice()]
    //this.setState({extraProducts: arr.slice(), loading: false})
    this.setState({extraProducts: list, loading: false})

  }

  firebasePaginator(ref) {
    var itemsList = [];
    var handler = (() => {
      this.setState({
        products: paginator.collection,
        loading: false,
        firstTime: false
      });
      this.listToArray()
    });
    paginator.on('value', handler);
  }

  firebasePaginatorFiltering(ref, filter, filterValue) {
    paginator = new FirebasePaginator(ref, options)
    this.setState({extraProducts: []})

    // the callback for the paginator
    var handler = ( () => {
      if (this.state.firstTime){
        const productIds = Object.keys(paginator.collection);
        // array is sorted in assending order
        var last = productIds[productIds.length]

          this.productsRef = base.bindToState(FirebaseServices.PRODUCTS_PATH, {
            context: this,
            state: "products",
            queries: {
              orderByChild: filter,
              equalTo: filterValue,
              limitToLast: PAGE_SIZE
            },
            then(data) {
              this.setState({loading: false, firstTime: false})
              this.listToArray();
            },
            onFailure(error) {
            this.setState({errorHandling: {showError: true, errorMsg: error}});
            }
          });

    }else {
      var newPage = this.state.page + 1;
      var productIds = (Object.keys(paginator.collection))
      console.log(productIds.length)
      if (productIds.length > 0){

        var newProducts = {}
        const listPromises = productIds.map(id => {
          return FirebaseServices.products.child(id).once('value', snapshot => {
            snapshot.val()
            newProducts = [...newProducts, snapshot.val()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          var newList = [...newProducts, ...this.state.products]

          //this.setState({products: newList, page: newPage, loading: false})
          this.setState({products: newProducts, page: newPage, loading: false})
          this.listToArray();

        })//results.then
      } //newProductIds.length
    }//else
  }) //handler
    paginator.on('value', handler);
  }

  forward(){
    paginator.previous()
    .then(() => {
      // console.log("forward - Collection " + paginator.collection)
      // var newPage = this.state.page + 1;
      // this.setState({products: paginator.collection, loading: false, page: newPage})
      // this.listToArray();
    console.log('paginated forward');
  });
  }

  forwardFiltring(){
    paginator.previous()
    .then();
  //     var newPage = this.state.page + 1;
  //     var productIds = (Object.keys(paginator.collection)).reverse();
  //     var newProductIds = productIds.slice(PAGE_SIZE * newPage).reverse()
  //     console.log("old length " + productIds)
  //     console.log("new length " + newProductIds)
  //
  //     if (newProductIds.length > 0){
  //     var productsList = {}
  //     console.log("the paginator contines" + productIds)
  //     console.log("page No. " + paginator.pageNumber)
  //
  //     var newProducts = {}
  //     const listPromises = newProductIds.map(id => {
  //       return FirebaseServices.products.child(id).once('value', snapshot => {
  //         snapshot.val()
  //         newProducts = [...newProducts, snapshot.val()]
  //       })
  //     });
  //
  //     const results = Promise.all(listPromises)
  //     results.then((snapshot) => {
  //       var newList = [...newProducts, ...this.state.products]
  //
  //       this.setState({products: newList, page: newPage, loading: false})
  //       //this.setState({products: paginator.collection, page: newPage, loading: false})
  //       this.listToArray();
  //       console.log("this.state.products")
  //       this.state.products.map(obj => {
  //         console.log(obj)
  //       })
  //
  //     })
  //     .catch(err => {
  //       // handle error
  //     })
  //   }
  //   console.log('paginated forward');
  //   console.log("paginator.collection"+ paginator.collection);
  //


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
            <Button>إضافة منتج<IconImg src={Product} style={{marginRight:'30px'}}/></Button>
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
    var newProducts = this.state.extraProducts.slice()

    return (
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>

        <Col xs={12} md={12}>
        <InfiniteScroll style={{overflow:'none'}}
          hasMore={!paginator.isLastPage}
          next={this.props.thisUserOnly? this.forwardFiltring : this.forward}
        >
        {newProducts.length < 1
          ? this.props.thisUserOnly
            ?<h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
            :<h4 style={{textAlign:'center'}}>لا يوجد نتائج مطابقة</h4>

        : <div>{
              newProducts.map((product, index) => {
              return <ProductBrief key={product.id} product={product} />;
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
