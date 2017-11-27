import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Col, Thumbnail, Button, Card,Row } from "react-bootstrap";
import Equalizer from "react-equalizer";

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

   
     
      
      <Col xs={6} md={4} >
      <Equalizer>
         <Thumbnail >
         
           <div className="dotted-border ">
          <Link to={`/products/${product.id}`} >
              <img id="middle" src={product.imgUrl} className="img-responsive"/>
              </Link>
              </div>
             
              <div className="padding" >
              <Link to={`/products/${product.id}`}>

              <h4 > {product.name} </h4>
              </Link>
            
        
            <p className="flex-text text-muted">{product.desc}</p>
            </div>
          
          </Thumbnail>
          </Equalizer>   
      </Col>
    
      
    );
  }
}

export default ProductBrief;
