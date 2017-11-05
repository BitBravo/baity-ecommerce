import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavItem,
  Button
} from "react-bootstrap";
import bayty_icon from "../assets/img/bayty_icon.png";

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop> 
        <Navbar.Header >
          
          <Navbar.Brand>
              <img src={bayty_icon}   />
              
          </Navbar.Brand>
          
          

          <Navbar.Toggle />
        </Navbar.Header>
        
        <Navbar.Collapse>
        <Nav >
        
          
          
          <NavItem eventKey={2} href="#">
            استعراض منتجاتي
          </NavItem>
          <NavItem eventKey={1} href="#">
            تحميل منتج جديد
          </NavItem>
          
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Login</a></li>
          </ul>

          {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown> */}
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
