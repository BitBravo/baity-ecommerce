import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import ProductBrief from "./ProductBrief";
import Loading from './Loading'


// const productListStyles = {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   }

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
         <div style={{paddingTop: "30px"}}>
        <Grid>
        {this.props.group === 'prof'
        ?<Row>
          <Link to={`/myproducts`}>
            <label>منتجاتي</label>
          </Link>
          <Link to={`/newproduct`}>
            <button>إضافة منتج</button>
          </Link>
        </Row>
        :<Row>
          <Link to={`/myideas/`}>
          <label>المنتجات المفضلة</label>
          </Link>
          </Row>
        }
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

export default ProductList;
