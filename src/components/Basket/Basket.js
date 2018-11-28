import React, { Component } from "react";
import { base } from "../base";
import FirebaseServices from './FirebaseServices'
import { Col, Grid, Row } from "react-bootstrap";
import ProductBrief from "./ProductBrief";
import Loading from './Loading'


class Basket extends Component {
  constructor() {
    super();
    this.state = {
      basket: {},
      products: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: ""
      }
    };
  }

  componentWillMount() {
    var path = FirebaseServices.BASKET_PATH + `/${this.props.currentUser.uid}`
    this.basketRef = base.bindToState(path, {
      context: this,
      state: "basket",
      then(data) {
        var productIds = Object.keys(this.state.basket)
        console.log("data " + this.state.basket.length)
        var newProducts = {}
        const listPromises = productIds.map(id => {
          return FirebaseServices.products.child(id).once('value', snapshot => {
            snapshot.val()
            newProducts = [...newProducts, snapshot.val()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          this.setState({ products: newProducts, loading: false })
          console.log("newProducts " + newProducts.length)
        })
      },
      onFailure(error) {
        this.setState({ errorHandling: { showError: true, errorMsg: error } });
      }
    })
  }

  componentWillUnmount() {
    this.basketRef && base.removeBinding(this.basketRef);
  }

  render() {
    const products = this.state.products
    const productIds = Object.keys(products)
    console.log("products.length " + productIds.length)

    if (this.state.loading)
      return (
        <Loading />
      )
    else {
      return (
        <div style={{ paddingTop: "30px" }}>
          <Grid>
            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>

              <Col xs={12} md={12}>
                {productIds.length < 1
                  ? <h4 style={{ textAlign: 'center' }}>لم تقم باضافة منتجات، إبدأ الان</h4>
                  : <div>{
                    productIds.map(id => {
                      const product = products[id];
                      return <ProductBrief key={id} product={product} />;
                    })
                  }</div>
                }
              </Col>

            </Row>

          </Grid>
        </div>
      );
    }
  }
}
export default Basket;
