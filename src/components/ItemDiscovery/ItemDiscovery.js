import React, { Component } from 'react';
import CarouselMenu from 'commons/CarouselMenu';
import FirestoreServices from 'services/FirestoreServices';

import './styles.css';

export class ItemDiscovery extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.getDiscoveryData = this.getDiscoveryData.bind(this);
  }

  componentWillMount() {
    this.getDiscoveryData();
  }

  getDiscoveryData() {
    FirestoreServices.readDBRecord('admin', 'product-discovery')
      .then((items) => {
        this.setState({ items: items.discoveryList });
      });
  }

  render() {
    return (
      <CarouselMenu {...{ items: this.state.items, title: this.props.title }} onRefresh={this.getDiscoveryData} />
    );
  }
}
export default ItemDiscovery;
