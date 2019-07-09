import React, { Component } from 'react';
import ItemList from 'components/ItemList';
// import ProductList from 'components/ProductList';
import CarouselBanner from 'components/CarouselBanner';
import ItemDiscovery from 'components/ItemDiscovery';
import './styles.css';


export class Home extends Component {
  render() {
    const {
      adminRoute,
      state: {
        authenticated,
        admin,
        deviceFlag,
      },
    } = this.props;
    const adminViewFlag = !!(adminRoute && admin && admin !== 'false');

    return (
      <div>
        <div>
          {
            authenticated && !adminRoute
              ? ''
              : <CarouselBanner adminViewFlag={adminViewFlag} />
          }
        </div>

        <div className="container">
          <div className="discovery-containter carousel-1">
            <ItemDiscovery {...{ collection: 'product-discovery', title: 'اختر منتجات منزلك', adminViewFlag, redirectUrl: 'productspages', deviceFlag }} />
          </div>
          <div className="discovery-containter carousel-2">
            <ItemDiscovery {...{ collection: 'idea-discovery', title: 'اكتشف تصاميم مبتكرة', adminViewFlag, redirectUrl: 'ideaspage', deviceFlag }} />
          </div>
        </div>
        
        <ItemList thisUserOnly={false} adminViewFlag={adminViewFlag} deviceFlag={deviceFlag} />
        {/* <ProductList thisUserOnly={false} {...admin} /> */}
      </div>
    );
  }
}

export default Home;
