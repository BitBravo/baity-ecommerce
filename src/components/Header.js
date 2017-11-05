import React, { Component } from "react";
import { Link } from "react-router-dom";
import bayty_icon from "../assets/img/bayty_icon.png";

class Header extends Component {
  render() {
    return (
      <nav >
        <div >
        <div >
            بيتي
        </div>  
              <img
                src={bayty_icon}
                style={{ maxHeight: "80%", maxWidth: "100%"  }}
              />
        
           
          
        </div>
        <div >
          
        <button  />          
          <button  />
          <span  />
        </div>
      </nav>
    );
  }
}

export default Header;
