import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { app, base } from '../base'
import { Image, Col, Thumbnail, Button } from 'react-bootstrap';


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
          product: { }
        };
    }


    // getProductImage() {
    //     const storageRef = app.storage().ref();
    //     storageRef.child('productImage/' + this.props.product.imgUrl).

    // }

    componentWillMount() {
        this.productRef = base.syncState(`product`, {
          context: this,
          state: 'products'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.productsRef);
    }

    render() {
        const product = this.props.product
        return(
            
            <Col xs={6} md={4}>
                <Thumbnail src={product.imgUrl} alt="242x200">
            
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="primary">Button</Button>&nbsp;
                  <Button bsStyle="default">Button</Button>
                </p>
                    <Link  to={`/products/${product.id}`}>
                        التفاصيل
                    </Link>
                    </Thumbnail>
                    </Col>
                
            
          
        );
    }

}

export default Product