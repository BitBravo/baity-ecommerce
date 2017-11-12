import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Col, Thumbnail, Button, Modal } from "react-bootstrap";
import Loading from './Loading'


class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.productId = this.props.match.params.id;

    this.state = {
      product: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      }
    };
  }

  componentWillMount() {
    console.log(`product/${this.productId}`);
    this.productsRef = base.syncState(`product/${this.productId}`, {
      context: this,
      state: 'product',
      then(data) {
      console.log(data)
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.productsRef);
  }

  render() {
    const product = this.state.product;
    console.log(product)
    if (this.state.loading)
    return (
      <Loading/>
    ) 
    else
      return(
        <Col xs={6} md={4}>
          <Thumbnail src={product.imgUrl} alt="242x200">
            <div >
              <h3 >{product.name}</h3>
            </div>
            <div >
              <p >{product.desc}</p>
            </div>
            <div className="clearfix" />
            <p>
              <Link to={`/products/${product.id}/updateProduct`}>
                <Button bsStyle="primary" block>
                  تحديث بيانات المنتج
                </Button>
              </Link>
            </p>
          </Thumbnail>
        </Col>
      
      
    );
  }
}

export default ProductDetails;
