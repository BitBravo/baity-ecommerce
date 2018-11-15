import React, { Component } from "react";
import CarouselMenu from 'commons/CarouselMenu';
import FirestoreServices from 'services/FirestoreServices'

import './styles.css'

export class ItemDiscovery extends Component {
  constructor(props) {
    super();
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    this.getDiscoveryData();
  }

  getDiscoveryData = () => {
    // FirestoreServices.getDataQuery(this.props.collection)
    //   .then(items => {
    //     this.setState({ items })
    //   });
    FirestoreServices.readDBRecord('admin', 'product-discovery')
      .then(items => {
        this.setState({ items: items.discoveryList })
      });
  }

  render() {
    return (
      <CarouselMenu {...{ items: this.state.items, title: this.props.title }} onRefresh={this.getDiscoveryData} />
    );
  }
}
export default ItemDiscovery;
