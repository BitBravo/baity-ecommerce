import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { app, base } from '../base'
import Product from './Product'

const productListStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  }
  
  

class ProductList extends Component {

  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      products: { }
    };
}


componentWillMount() {
    this.productsRef = base.syncState('product', {
      context: this,
      state: 'products',
    });
      // base.fetch('product', {
      //   context: this,
      //   asArray: true,
      //   then(data){
      //     console.log("fetching data the stupid way")
      //     console.log(data);
      //   }
      // });
    
}

componentWillUnmount() {
    base.removeBinding(this.productsRef);
}

    render() {
        const products  = this.state.products;
        const productIds = Object.keys(products);
        console.log("products are:")
        console.log(productIds.length)
        console.table(products);
    
        return (
          <div>
            <h1 style={{marginBottom: "0.5em"}}>products</h1>
    
            <div style={productListStyles}>
              {productIds.map((id) => {
                const product = products[id]
                console.log(product)
                return (
                  <Product key={id} product={product}></Product>
                )
              })}
            </div>
          </div>
        )
      }
}

export default ProductList