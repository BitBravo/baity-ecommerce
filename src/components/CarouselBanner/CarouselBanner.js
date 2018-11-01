import React, { Component } from "react";
import CarouselMenu from 'commons/CarouselMenu';
import FirestoreServices from 'services/FirestoreServices'

import './styles.css'


export class CarouselBanner extends Component {
  constructor(props) {
    super();
    this.state = {
      products: {}
    };
  }
  componentWillMount() {
    console.log(this.props.city)
    let ref = FirestoreServices.products.where(`city== ${this.props.city}`).orderBy('timestamp', 'desc')


  }
  render() {
    return (
      <CarouselMenu products={this.products} />
    );
  }
}

export default CarouselBanner;
