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
import Infinite from 'react-infinite-loading';

const Button = styled.button`
  width:180px;
  @media only screen and (max-width: 767px) {
    height: 40px;
    width:100%;
  `;
const PAGE_SIZE = 2;
class ProductList extends Component {
  constructor() {
    super();
    console.log("ProductList Constroctor");
    this.state = {
      products: {},
      extraProducts: [],
      loading: true,
      firstTime: true,
      page: 0
    };

  }

  componentWillMount() {
    this.lazyLoading = this.lazyLoading.bind(this)
    this.listToArray = this.listToArray.bind(this)
    this.FirebasePaginator = this.firebasePaginator.bind(this, ref)
    this.forward = this.forward.bind(this)
    this.firebasePaginatorFiltering = this.firebasePaginatorFiltering.bind(this, ref)
    this.forwardFiltring = this.forwardFiltring.bind(this)
    console.log("ProductList-componentWillMount");

//FirebaseServices.indexing();

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
            var products = [this.state.extraProducts]
            this.setState({loading: false, firstTime: false})
          },
          onFailure(error) {
          this.setState({errorHandling: {showError: true, errorMsg: error}});
          }
    });
  } else {
    // this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
    //   context: this,
    //   state: "products",
    //   queries: {
    //     orderByChild: 'owner',
    //     equalTo: this.props.currentUser.uid
    //   },
    //   then(data) {
    //     this.setState({loading: false, firstTime: false})
    //   },
    //   onFailure(error) {
    //   this.setState({errorHandling: {showError: true, errorMsg: error}});
    //   }
    // });
    var owner = this.props.currentUser.uid
    var ref = FirebaseServices.ownerProduct.child(owner)
    this.firebasePaginatorFiltering(ref, PAGE_SIZE)
  }
} else {
    var ref = FirebaseServices.products
    this.firebasePaginator(ref, PAGE_SIZE)
  }

  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
    var paginator = new FirebasePaginator(FirebaseServices.products);
    paginator.off('value', function(){});

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
    console.log("listToArray - productIds.length " + productIds.length)

    var arr = [];
    productIds.map(id => {
      const product = products[id];
      console.log("copy product " + product.id)
      arr.push(product)
    });
    var list = [...this.state.extraProducts, ...arr.slice()]
    this.setState({extraProducts: arr.slice(), loading: false})
    console.log("extraProducts.length " + this.state.extraProducts.length)
      console.log(this.state.extraProducts)

  }

  firebasePaginator(ref, pageSize) {
    var options = {
      pageSize: PAGE_SIZE,
      finite: true,
      retainLastPage: false
    };
    var paginator = new FirebasePaginator(ref, options);
    var itemsList = [];
    var handler = (() => {
      console.log("firebasePaginator - handler")
      console.log("Collection " + paginator.collection)
      this.setState({
        products: paginator.collection,
        loading: false,
        firstTime: false
      });
      this.listToArray()
    });
    console.log("firebasePaginator")
    paginator.on('value', handler);
  }

  firebasePaginatorFiltering(ref, pageSize) {
    var options = {
      pageSize: PAGE_SIZE,
      finite: true,
      retainLastPage: false,
    };
    var ref = FirebaseServices.ownerProduct
    var paginator = new FirebasePaginator(ref, options);
    var itemsList = [];
    var handler = (() => {
      console.log("firebasePaginator - handler")
      console.log("Collection " + paginator.collection)

      const productIds = Object.keys(paginator.collection);
      var productsList = {}
      console.log("the list contines" + productIds)
      productIds.map(id => {
        FirebaseServices.products.child(id).once("value", (snapshot) => {
          console.log(snapshot.val())
          var products = [...this.state.products, snapshot.val()]
          this.setState({products: products, loading: false, firstTime: false})
          this.listToArray()

        });

      });

    });
    console.log("firebasePaginator")
    paginator.on('value', handler);
  }

  forward(){
    var paginator = new FirebasePaginator(FirebaseServices.products);
    paginator.next()
    .then(() => {
      console.log("forward - Collection " + paginator.collection)
      var newPage = this.state.page + 1;
      this.setState({products: paginator.collection, loading: false, page: newPage})
      this.listToArray();
    console.log('paginated forward');
    console.log(paginator.collection);
  });
  }

  forwardFiltring(){
    var paginator = new FirebasePaginator(FirebaseServices.products);
    paginator.next()
    .then(() => {
      console.log("forward - Collection " + paginator.collection)
      var newPage = this.state.page + 1;
      var productIds = Object.keys(paginator.collection);
      productIds = productIds.slice(PAGE_SIZE * newPage)
      var productsList = {}
      console.log("the list contines" + productIds)
      // var list = productIds.map(id => {
      //   FirebaseServices.products.child(id).once("value", (snapshot) => {
      //     console.log(snapshot.val())
      //     var products = [...this.state.products, snapshot.val()]
      //     this.setState({products: products, loading: false, firstTime: false})
      //     this.listToArray()
      //
      //   });
      // })
      const listPromises = productIds.map(id => {
        return FirebaseServices.products.child(id).once('value', snapshot => {
          snapshot
          console.log("The snapshot " +  snapshot)
          console.log("The snap val " + snapshot.val());
        })
        console.log("The4444");
      });

      const results = Promise.all(listPromises)
      results.then((snapshot) => {
        this.setState({page: newPage, loading: false})
        console.log("The8888 - page " + newPage);
        console.log("The single " + snapshot);
        console.log("The key " + snapshot.key);
        console.log("The val " + snapshot.val());


      })
      .catch(err => {
        // handle error
      })
    console.log('paginated forward');
    console.log(paginator.collection);
  });
  }


  render() {
    const products = this.state.products
    const productIds = Object.keys(products)

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
          <Col xs={12}  lg={12} >
          {productIds.length < 1
            ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
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
    var newProducts = this.state.extraProducts.slice().reverse()
    return (
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12} md={12}>
        {newProducts.length < 1
          ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>

        : <div>{
              newProducts.map((product, index) => {
              return <ProductBrief key={product.id} product={product} />;
            })
          }</div>
        }
               </Col>
        </Row>
        {this.props.currentUser?
        <Infinite  handleLoading={this.forwardFiltring}  >
        </Infinite>
        : <Infinite  handleLoading={this.forward} isloading={false} >
   
        </Infinite>
        // <Row><Button onClick={this.forward}>تحميل المزيد</Button></Row>
      }
      </Grid>
    </div>
  );
  }
  }
}

export default ProductList;
