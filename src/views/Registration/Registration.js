import React, { Component } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import bayty_icon from 'assets/img/bayty_icon1.png';

class Registration extends Component {
  render() {
    return (
      <div style={{ height: 'calc(100vh - (50px + 60px))' }} className="loginreg">
        <form>
          <div className="loginregtitle">
            <img src={bayty_icon} alt=""/>
            <h2 style={{ color: 'rgb(26,156,142)' }}>التسجيل</h2>
          </div>
          <LinkContainer to="/registerProf" activeClassName="active">
            <button type="submit" >
              تسجيل حساب تجاري
          </button>
          </LinkContainer>
          <LinkContainer to="/registerNormal" activeClassName="active">
            <button>
              تسجيل حساب شخصي
          </button>
          </LinkContainer>
        </form>
      </div>
    );
  }
}

export default Registration;
