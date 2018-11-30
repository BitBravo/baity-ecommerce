import React, { Component } from "react";
import ProductList from 'views/ProductList';
import styled from 'styled-components'
import CarouselBanner from 'components/CarouselBanner';
import ItemDiscovery from 'components/ItemDiscovery';
import './styles.css'


export class Home extends Component {

  render() {
    const { state: { authenticated, admin } } = this.props
    console.log(authenticated ? 'User Autenticated successfully' : 'None Authenticated');
    console.log(admin ? 'Admin Homepage' : 'Public Homepage');
    return (
      <div>
        <div >
          {
            this.props.authenticated ?
              ''
              :
              <CarouselBanner adminFlag={admin} />
          }
        </div>

        <div className='container discovery-containter-block'>
          <div className='discovery-containter carousel-1'>
            <ItemDiscovery {...{ collection: 'product-discovery', title: 'اختر منتجات منزلك' }} />
          </div>
        </div>
        <ProductList thisUserOnly={false} {...admin} />
      </div>
    );
  }
}

export default Home;
