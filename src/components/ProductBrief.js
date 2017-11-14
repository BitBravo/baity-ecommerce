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
class ProductBrief extends Component {
  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      product: {}
    };
  }

 

  render() {
    const product = this.props.product;
    return (
      <Col xs={6} md={4}>
         <Thumbnail >
           <div className="crop">
      <Link to={`/products/${product.id}`} >

              <img src={product.imgUrl} />
              </Link>
              </div>
              <div className="padding">
              <Link to={`/products/${product.id}`}>

              <h4 > {product.name} </h4>
              </Link>
            
        
            <p >{product.desc}</p>
            </div>
          </Thumbnail>
      </Col>
    );
  }
}

export default ProductBrief;
