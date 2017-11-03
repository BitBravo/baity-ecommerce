import React, { Component } from "react";
import { Link } from "react-router-dom";
import bayty_icon from "../assets/img/bayty_icon.png";

class Header extends Component {
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-right">
        <div className="pt-navbar-heading pt-rtl">
            بيتي
        </div>  
              <img
                src={bayty_icon}
                style={{ maxHeight: "80%", maxWidth: "100%"  }}
              />
        
           
          
        </div>
        <div className="pt-navbar-group pt-align-left">
          
        <button className="pt-button pt-minimal pt-icon-cog" />          
          <button className="pt-button pt-minimal pt-icon-user" />
          <span className="pt-navbar-divider" />
        </div>
      </nav>
    );
  }
}

export default Header;
