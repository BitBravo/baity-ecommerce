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
    const { collection } = this.props;
    FirestoreServices.readDBRecord('admin', collection)
      .then((items) => {
        this.setState({ items: items.discoveryList });
      });
  }

  render() {
    const { adminViewFlag, redirectUrl } = this.props;

    return (
      <CarouselMenu {...{ items: this.state.items, title: this.props.title, adminViewFlag, redirectUrl }} onRefresh={this.getDiscoveryData} />
    );
  }
}
export default ItemDiscovery;
