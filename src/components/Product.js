import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { app, base } from '../base'

const productCardStyles = {
    maxWidth: "30%",
    minWidth: "150px",
    flex: "1",
    margin: "5px",
  }
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
            <div key={product.id} style={productCardStyles} className="pt-card pt-elevation-0 pt-interactive">
            <h5>
              <Link to={`/products/${product.id}`}>
                <img maxWidth="100%" src={product.imgUrl}/>
                <p>{product.category}</p>
              </Link>
            </h5>
          </div>
        );
    }

}

export default Product