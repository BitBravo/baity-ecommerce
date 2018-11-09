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
    FirestoreServices.getDataQuery(this.props.collection)
      .then(items => {
        this.setState({ items })
      });
  }

  render() {
    return (
      <CarouselMenu {...{ items: this.state.items, title: this.props.title }} />
    );
  }
}
export default ItemDiscovery;
