import React, { Component } from "react";
import CarouselMenu from 'commons/CarouselMenu';
import FirestoreServices from 'services/FirestoreServices'

import './styles.css'

const Elements = () => {
  console.log(this.props.product)
}
export class ItemDiscovery extends Component {
  constructor(props) {
    super();
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    FirestoreServices.getDataQuery(this.props.category, ['banner', '==', true])
      .then(items => {
        this.setState({ items })
        // console.log(this.state.items)
      });
    // .then(items => this.setState({ items }));
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  }

  render() {
    console.log(this.state.items)
    return (
      <CarouselMenu {...{ items: this.state.items, title: this.state.items }} />
    );
  }
}
export default ItemDiscovery;
