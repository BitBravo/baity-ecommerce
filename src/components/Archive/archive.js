// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Grid, Row, Col } from "react-bootstrap";
// import { app, base } from "config/base";
// import FirebaseServices from './FirebaseServices'
// import ProductBrief from "./ProductBrief";
// import Loading from './Loading'
// import styled from 'styled-components'
// import {MdEventSeat} from 'react-icons/lib/md';
// import FirebasePaginator from 'firebase-paginator';
//
//
// const Button = styled.button`
//   width:180px;
//   @media only screen and (max-width: 767px) {
//     height: 40px;
//     width:100%;
//   `;
//
//
// class ProductList extends Component {
//   constructor() {
//     super();
//     // this.updateproduct = this.updateproduct.bind(this);
//     this.state = {
//       products: {},
//       extraProducts: [],
//       loading: true,
//       firstTime: true
//     };
//
//   }
//
//   componentWillMount() {
//     this.print = this.print.bind(this)
//     this.lazyLoading = this.lazyLoading.bind(this)
//     this.listToArray = this.listToArray.bind(this)
//
//
//     if (this.props.thisUserOnly){
//       if(this.props.shortList){
//     this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
//       context: this,
//       state: "products",
//       queries: {
//         orderByChild: 'owner',
//         limitToLast: 3,
//         equalTo: this.props.currentUser.uid
//       },
//       then(data) {
//         var products = [this.state.extraProducts]
//         this.setState({loading: false, firstTime: false, products: products})
//       },
//       onFailure(error) {
//       this.setState({errorHandling: {showError: true, errorMsg: error}});
//       }
//     });
//   } else {
//     this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
//       context: this,
//       state: "products",
//       queries: {
//         orderByChild: 'owner',
//         equalTo: this.props.currentUser.uid
//       },
//       then(data) {
//         this.setState({loading: false, firstTime: false})
//       },
//       onFailure(error) {
//       this.setState({errorHandling: {showError: true, errorMsg: error}});
//       }
//     });
//   }
// } else {
//     if (this.state.firstTime) {
//       this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
//         context: this,
//         state: "products",
//         queries: {
//           orderByKey: 'key',
//           limitToLast: 2
//         },
//         then(data) {
//           this.setState({firstTime: false})
//           this.listToArray()
//         },
//         onFailure(error) {
//         this.setState({
//           errorHandling: {showError: true, errorMsg: error}});
//         }
//       });
//     }
//   }
//
//   }
//
//   componentWillUnmount() {
//     this.productsRef && base.removeBinding(this.productsRef);
//   }
//
//   lazyLoading(){
//     this.print()
//     this.setState({loading: true})
//           const productIds = Object.keys(this.state.products);
//           console.log("lazyLoading - Last element = " + productIds[0])
//
//           var products = [...this.state.products]
//           console.log("length of products" + products.length)
//         this.productsRef = base.syncState(FirebaseServices.PRODUCTS_PATH, {
//           context: this,
//           state: "products",
//           queries: {
//             orderByKey: 'key',
//             limitToLast: 2,
//             endAt: productIds[0]
//           },
//           then(data) {
//
//             this.setState({firstTime: false})
//             this.listToArray()
//           },
//           onFailure(error) {
//           this.setState({
//             errorHandling: {showError: true, errorMsg: error}});
//           }
//         });
//   }
//
//   print() {
//     const productIds = Object.keys(this.state.extraProducts);
//     console.log("extraProducts - new Last element = " + productIds[0])
//     productIds.map(id => {
//       const product = this.state.extraProducts[id];
//       console.log("extraProducts "+product.id)
//     });
//   }
//
//   listToArray() {
//     console.log("copy product ")
//     const products = this.state.products
//     const productIds = Object.keys(products);
//     var arr = [];
//     productIds.map(id => {
//       const product = products[id];
//       console.log("copy product " + product.id)
//       arr.push(product)
//     });
//     var list = [...this.state.extraProducts, ...arr.slice()]
//     this.setState({extraProducts: list, loading: false})
//     console.log("extraProducts.length " + this.state.extraProducts.length)
//       console.log(this.state.extraProducts)
//
//   }
//
//   firebasePaginator() {
//     // var products = {}
//     // return paginator.next()
//     // .then(() => {
//     //     console.log('paginated forward');
//     //     const products = this.state.extraProducts;
//     //     const productIds = Object.keys(products);
//     //     console.log(productIds.length)
//     //   });
//   }
//
//   render() {
//     const products = this.state.products
//     const productIds = Object.keys(products)
//     const allProducts = this.state.extraProducts.slice()
//     console.log(allProducts)
//     console.log(allProducts[0])
//
//
//     if (this.state.loading)
//       return(
//        <Loading />
//       )
//     else if (this.props.shortList){
//       return (
//         <Grid style={{backgroundColor:"white"}}>
//         {this.props.group === 'prof'
//         ?<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
//         <Col xs={12}  lg={12} >
//         <hr style={{marginBottom: '30px'}}/>
//         <Col xs={5} md={3} lg={2} >
//           <Link to={`/newproduct`}>
//             <Button>إضافة منتج<MdEventSeat className="icons" /></Button>
//           </Link>
//           </Col>
//           <Col xs={7} md={9} lg={10} >
//           <Link to={`/myproducts`}>
//           <h2 style={{color:'rgb(26,156,142)'}}>منتجاتي</h2>
//           </Link>
//           </Col>
//           </Col>
//           </Row>
//         :<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
//           <Link  to={`/favproducts`}>
//           <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}>المنتجات المفضلة</h2>
//           </Link >
//           </Row>
//         }
//           <Row style={{display: 'flex', flexWrap: 'wrap'}}>
//           <Col xs={12}  lg={12} >
//           {productIds.length < 1
//             ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
//           : null}
//             {productIds.map(id => {
//               const product = products[id];
//               return <ProductBrief key={id} product={product} />;
//             })}
//             </Col>
//           </Row>
//         </Grid>
//
//     );
//   } else {
//     return (
//        <div style={{paddingTop: "30px"}}>
//       <Grid>
//         <Row style={{display: 'flex', flexWrap: 'wrap'}}>
//         <Col xs={12} md={12}>
//         {allProducts.length < 1
//           ? <h4 style={{textAlign:'center'}}>لم تقم باضافة منتجات، إبدأ الان</h4>
//
//         : <div>
//           {allProducts.map((product, index) => {
//             //const product = allProducts[index];
//             console.log("render - product " + product)
//             console.log("render - product " + product.id)
//             return <ProductBrief key={product.id} product={product} />;
//           })}
//           </div>
//         }
//                </Col>
//         </Row>
//         <Row><Button onClick={this.lazyLoading}>إضافة منتج</Button></Row>
//
//       </Grid>
//     </div>
//   );
//   }
//   }
// }
//
// export default ProductList;
