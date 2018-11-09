import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirestoreServices from 'services/FirestoreServices'
import FirestorePaginator from 'services/FirestorePaginator'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'
import styled from 'styled-components'
import { MdEventSeat } from 'react-icons/lib/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product from '../assets/img/AddingProduct.png';

const IconImg = styled.img`
width:20px;
 height:20px;
 margin-right:20px;
 @media only screen and (max-width: 767px) {
  width:15px;
  height:15px;
  margin-right:2px;
 }`

const MoreButton = styled.button`
 background-color:transparent;
 border:1px solid rgb(26, 156, 142);
 color:rgb(26, 156, 142);
   width:100px;
   height: 30px;
   @media only screen and (max-width: 767px) {
     height: 20px;
     width:40px;
     font-size:10px;
   `;
const Button = styled.button`
font-size:15px;
float:left;
width:180px;
height:40px;
@media only screen and (max-width: 767px) {
  font-size:12px;
  height: 35px;
  width:70%;}
  @media only screen and (max-width: 500px) {
    font-size:10px;
    height: 30px;
    width:90%;}
  `;

var paginator;
var hasMore = true;

class ProductList extends Component {
  constructor() {
    super();
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
    this.businessProducts = this.businessProducts.bind(this)
  }

  componentWillMount() {
    this.listToArray = this.listToArray.bind(this)
    this.forward = this.forward.bind(this)
    this.firePaginator = this.firePaginator.bind(this)
    this.setRangeFilter = this.setRangeFilter.bind(this)
    this.createQuery = this.createQuery.bind(this)
    //FirebaseServices.filterIndexing();
    //FirebaseServices.filterIndexingStyle();
    //FirebaseServices.addOwnerName()
    //FirestoreServices.copyImages()

    hasMore = true;
    if (this.props.thisUserOnly) {
      this.businessProducts(this.props)
    } else {
      var ref = FirestoreServices.products.orderBy('timestamp', 'desc')
      this.firePaginator(ref);
    }
  }

  componentWillUnmount() {
    this.productsRef && base.removeBinding(this.productsRef);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${this.constructor.name} => nextProps`)
    // filter options will be recived as props
    if (nextProps.filter) {
      if (nextProps.filter.length > 0) {
        this.setState({ loading: true }) // start loading indcator
        var filterValues = nextProps.filter
        //  var ref = FirestoreServices.products
        this.createQuery(filterValues);
      } else {
        // filter was reset => no filteration
        if (nextProps.filter.length < 1) {
          // reset the product list by deleting all from the extraProducts

          var ref = FirestoreServices.products.orderBy('timestamp', 'desc')

          this.firePaginator(ref);
        }
      }
    } else if (nextProps.thisUserOnly)
      this.businessProducts(nextProps)
  }

  createQuery(filter) {
    let query = [];
    if (filter[0].value) {
      query.push([filter[0].key, '==', filter[0].value])
    }
    if (filter[1].value) {
      query.push([filter[1].key, '==', filter[1].value])
    }
    if (filter[2].value) {
      query.push([filter[2].key, '==', filter[2].value])
    }
    console.log(query)
    FirestoreServices.getDataQuery('product', query)
      .then(items => {
        this.setState({ 'products': items });
        this.setState({ loading: false })
        console.log(items)
      })
    // var ref = FirestoreServices.products
    // if (filter[0].value !== "") {
    //   console.log("filter 0 " + filter[0].value)
    //   ref = ref.where(filter[0].key, "==", filter[0].value)
    // }
    // if (filter[1].value !== "") {
    //   console.log("filter 1 " + filter[1].value)
    //   ref = ref.where(filter[1].key, "==", filter[1].value)
    // }
    // if (filter[2].value !== "") {
    //   console.log("filter 2 " + filter[2].value)
    //   ref = ref.where(filter[2].key, "==", filter[2].value)
    // }
    // console.log("filter 3" + filter[3].value)
    // ref = this.setRangeFilter(ref, filter[3]).orderBy('timestamp', 'desc')
    // console.log(ref)
    // this.firePaginator(ref);
  }

  setRangeFilter(ref, filter) {
    var pf = false;
    if (filter.value.upper !== "") { ref = ref.where(filter.key, "<=", filter.value.upper); pf = true };
    if (filter.value.lower !== "") { ref = ref.where(filter.key, ">=", filter.value.lower); pf = true; }
    if (pf) ref = ref.orderBy('price', 'asc');
    return ref;
  }

  businessProducts(props) {
    console.log("BusinessProducts")
    var owner;
    if (props.user) {
      owner = props.currentUser
      this.setState({ owner: owner })
    } else {
      owner = props.currentUser.uid
      this.setState({ owner: owner })
    }
    // Here in the profile page or the company page
    if (props.shortList) {
      this.productsRef = base.bindCollection(FirestoreServices.PRODUCTS_PATH, {
        context: this,
        state: "products",
        query: (ref) => {
          return ref.where('owner', '==', owner)
            .orderBy('timestamp', 'desc')
            .limit(3);
        },
        then(data) {
          this.setState({ loading: false, firstTime: false })
        },
        onFailure(error) {
          this.setState({ errorHandling: { showError: true, errorMsg: error } });
        }
      });
    } else { // All products by a company
      var ref = FirestoreServices.products.where("owner", "==", owner).orderBy('timestamp', 'desc')
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

  forward() {
    console.log("calling next()")
    if (!paginator.hasMore) {
      hasMore = false;
      console.log("next() Has no more");
      return;
    }
    console.log("next() Has more")
    paginator.next()
      .then((docs) => {
        if (!paginator.hasMore) {
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
    } else {
      msg = "لم تقم باضافة منتجات، إبدأ الان"
      title = "منتجاتي"
    }

    if (this.state.loading)
      return (
        <Loading />
      )
    else if (this.props.shortList) {
      return (
        <Grid style={{ backgroundColor: "white" }}>
          {this.props.group === 'prof'
            ? <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Col xs={12} lg={12} >
                <Col xs={5} md={3} lg={2} style={{ padding: "0 15px 0 0" }}>
                  <Link to={`/newproduct`}>
                    <Button>إضافة منتج<IconImg src={Product} /></Button>
                  </Link>
                </Col>
                <Col xs={7} md={9} lg={10} >
                  <Link to={`/myproducts`}>
                    <h3 style={{ color: 'rgb(26,156,142)', fontFamily: 'dinarm' }}>{title}</h3>
                  </Link>
                </Col>
              </Col>
            </Row>
            : <Row style={{ display: 'flex', flexWrap: 'wrap' }}>

              <Col xs={9} md={9} lg={10} >
                <Link to={`/${this.state.owner}/products`}>
                  <h3 style={{ color: 'rgb(26,156,142)', padding: "0 10px 0 0", fontFamily: 'dinarm' }}> المنتجات</h3>
                </Link >
              </Col>
              <Col xs={3} md={3} lg={2} style={{ padding: "20px 10px 0 0" }} >
                <Link to={`/${this.state.owner}/products`}>
                  <MoreButton>المزيد</MoreButton>
                </Link>
              </Col>
            </Row>
          }
          <Row style={{ display: 'flex', flexWrap: 'wrap', borderBottom: 'dotted 1px lightgray ' }}>
            <Col xs={12} lg={12} style={{ padding: '0 5px 0 5px' }}>
              {productIds.length < 1
                ? <h4 style={{ textAlign: 'center' }}>{msg}</h4>
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
        <div style={{ paddingTop: "0px" }}>
          <Grid>
            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>

              <Col xs={12} md={12} style={{ padding: '0 5px 0 5px' }}>
                <InfiniteScroll style={{ overflow: 'none' }}
                  hasMore={hasMore}
                  next={this.forward}
                >
                  {products.length < 1
                    ? this.props.thisUserOnly
                      ? <h4 style={{ textAlign: 'center' }}>لم تقم باضافة منتجات، إبدأ الان</h4>
                      : <h4 style={{ textAlign: 'center' }}>لا يوجد نتائج مطابقة</h4>

                    : <div>{
                      products.map((product, index) => {
                        return <ProductBrief key={index} product={product} />;
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
