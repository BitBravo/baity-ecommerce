import React from "react";
import { Link } from "react-router-dom";
import LogoImg from 'assets/img/bayty_icon.png';
import UserAvater from 'assets/img/Profile-icon.png';
import styled from 'styled-components'

import './style.css'

const CompanyNameDiv = styled.div`
  @media only screen and (max-width: 1024px) {
    display: none;
  `;

const Header = (props) => {
  return (
    <div className="admin-header">
      {/* <div className="company-name col-md-3">
        <Link to="/admin/profile">
          <p>Baity Admin</p>
        </Link>
      </div> */}
      <CompanyNameDiv
        className="company-name col-md-3 col-sm-12"
      >
        <Link to="/">
          <p>Baity Admin</p>
        </Link>
      </CompanyNameDiv>
      <div className="company-logo col-md-6 col-sm-6 col-xs-6">
        <Link to="/">
          <img className="logo-img" src={LogoImg} alt="Smiley face" height="50px" width="80px" />
        </Link>
      </div>
      <div className="company-admin col-md-3 col-sm-6 col-xs-6">
        <Link to="/admin/profile">
          <span>Amdin</span>
          <img className="user-avater" src={UserAvater} alt="Smiley face" height="32px" width="30px" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
