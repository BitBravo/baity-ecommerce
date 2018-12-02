import React, { Component } from "react";
import ProductList from 'components/ProductList';
import styled from 'styled-components'
import CarouselBanner from 'components/CarouselBanner';
import ItemDiscovery from 'components/ItemDiscovery';
import './styles.css'


export class Home extends Component {

  render() {
    const {
      adminRoute,
      state: {
        authenticated,
        admin,
      }
    } = this.props;
    const adminViewFlag = adminRoute && admin && admin !== "false" ? true : false;
    console.log(authenticated ? 'User Autenticated successfully' : 'None Authenticated');
    console.log(admin ? 'Admin user' : 'General User');
    console.log(this.props)
    return (
      <div>
        <div >
          {
            this.props.authenticated ?
              ''
              :
              <CarouselBanner {...{ adminViewFlag }} />
          }
        </div>

        <div className='container discovery-containter-block'>
          <div className='discovery-containter carousel-1'>
            <ItemDiscovery {...{ collection: 'product-discovery', title: 'اختر منتجات منزلك', adminViewFlag, redirectUrl: 'productspages' }} />
          </div>
          <div className='discovery-containter carousel-2'>
            <ItemDiscovery {...{ collection: 'idea-discovery', title: 'اكتشف تصاميم مبتكرة', adminViewFlag, redirectUrl: 'ideaspage' }} />
          </div>
        </div>
        <ProductList thisUserOnly={false} {...admin} />
      </div>
    );
  }
}

export default Home;
