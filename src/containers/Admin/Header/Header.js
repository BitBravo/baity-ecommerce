import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogoImg from 'assets/img/bayty_icon.png';
import UserAvater from 'assets/img/Profile-icon.png';
import './style.css'

const Header = (props) => {
  console.log(props)
  return (
    <div className="admin-header">
      <div className="company-name col-md-3">
        <Link to="/admin/profile">
          <p>Baity Admin</p>
        </Link>
      </div>
      <div className="company-logo col-md-6">
        <img className="logo-img" src={LogoImg} alt="Smiley face" height="50px" width="80px" />
      </div>
      <div className="company-admin col-md-3">
        <Link to="/admin/profile">
          <span>Amdin</span>
          <img className="user-avater" src={UserAvater} alt="Smiley face" height="32px" width="30px" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
