import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Col, Thumbnail, Button } from "react-bootstrap";

// const productCardStyles = {
//     maxWidth: "30%",
//     minWidth: "150px",
//     flex: "1",
//     margin: "5px",
//   }
class Product extends Component {
  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      product: {}
    };
  }

  // getProductImage() {
  //     const storageRef = app.storage().ref();
  //     storageRef.child('productImage/' + this.props.product.imgUrl).

  // }

  componentWillMount() {
    this.productsRef = base.syncState(`product`, {
      context: this,
      state: "products"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.productsRef);
  }

  render() {
    const product = this.props.product;
    return (
      <Col xs={6} md={4}>
        <Thumbnail>
        <Link to={`/products/${product.id}`}>
              <img src={product.imgUrl} alt="242x200"/>
              <div >
            <h3 >{product.name}</h3>
          </div>
            </Link>
          <div >
            <p >{product.desc}</p>
          </div>
          <div className="clearfix" />
        </Thumbnail>
      </Col>
    );
  }
}

export default Product;
