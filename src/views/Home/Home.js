import React, { Component } from "react";
import ProductList from '../ProductList';
import styled from 'styled-components'
import CarouselBanner from 'components/CarouselBanner';
import ItemDiscovery from 'components/ItemDiscovery';
import './styles.css'


export class Home extends Component {

  render() {
    return (
      <div>
        <div >
          {
            this.props.authenticated ?
              ''
              :
              <CarouselBanner />
          }
        </div>

        <div className='container discovery-containter-block'>
          <div className='discovery-containter carousel-1'>
            <ItemDiscovery {...{ collection: 'product-discovery', title: 'اختر منتجات منزلك' }} />
          </div>
        </div>
        <ProductList thisUserOnly={false} />
      </div>

    );
  }
}

export default Home;
