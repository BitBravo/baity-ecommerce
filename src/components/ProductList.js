import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { app, base } from '../base'

const productListStyles = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  }
  
  const productCardStyles = {
    maxWidth: "30%",
    minWidth: "150px",
    flex: "1",
    margin: "5px",
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
                return (
                  <div key={id} style={productCardStyles} className="pt-card pt-elevation-0 pt-interactive">
                    <h5><Link to={`/products/${product.id}`}>{product.title}</Link></h5>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
}

export default ProductList