import React, { Component } from "react";
import CarouselMenu from 'commons/CarouselMenu';
import FirestoreServices from 'services/FirestoreServices'

import './styles.css'

const Elements = () => {
  console.log(this.props.product)
}
export class CarouselBanner extends Component {
  constructor(props) {
    super();
    this.state = {
      products: []
    };
  }

  componentWillMount() {
    console.log(this.props)
    FirestoreServices.getProductsQuery()
      .then(products => this.setState({ products }))
  }

  render() {
    return (
      <CarouselMenu {...{ products: this.state.products, title: this.props.title }} />
    );
  }
}
export default CarouselBanner;
