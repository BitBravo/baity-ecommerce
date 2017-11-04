import React, { Component } from 'react'
import { app, base } from '../base'

class Product extends Component {

    constructor() {
        super();
        // this.updateproduct = this.updateproduct.bind(this);
        this.state = {
          product: { }
        };
    }


    componentWillMount() {
        this.productRef = base.syncState(`product`, {
          context: this,
          state: 'products'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.productsRef);
    }

}

export default Product