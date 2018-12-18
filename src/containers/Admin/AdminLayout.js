import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './style.css';


class AdminLayout extends Component {
  render() {
    console.log('Admin Layout ...');
    const {
      children,
      children: {
        props: {
          state: {
            deviceFlag,
          },
        },
      },
    } = this.props;
    return (
      <div className={`wrapper admin-layout ${deviceFlag ? 'desktop' : 'mobile'}`}>
        <Header />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Sidebar />
          <div className="main-content">
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default AdminLayout;
