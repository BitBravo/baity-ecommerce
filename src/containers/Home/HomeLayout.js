import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

class HomeLayout extends Component {
  render() {
    const {
      children:
      {
        props: {
          adminRoute,
          state: userData,
          state: {
            authenticated: authFlag,
          },
        },
      },
    } = this.props;
    console.log(`Layout: Public Layout, Autenticated: ${authFlag}, RouteFlag: ${adminRoute}`);
    return (
      <div style={{ margin: '0 auto' }} className="publish-layout">
        <Header
          {...userData}
          className="header"
        />
        <div className="main-content">
          {this.props.children}
        </div>
        <Footer
          {...userData}
        />
      </div>
    );
  }
}

export default HomeLayout;
