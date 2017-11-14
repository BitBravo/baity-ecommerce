import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
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
      <Navbar fixedTop> 
        <Navbar.Header >
        <Navbar.Toggle />
        </Navbar.Header>
        
        <Navbar.Collapse >
        <Navbar.Brand className="nav pull-right">
              <img src={bayty_icon}/>
          </Navbar.Brand > 
        <Nav >
        <LinkContainer to="/">
        <NavItem eventKey={2}>
          الصفحة الرئيسية
          </NavItem>
          </LinkContainer>

          <NavItem eventKey={2} href="#" >
            استعراض منتجاتي
          </NavItem>

          <LinkContainer to="/newproduct">
          <NavItem eventKey={1}  >
            اضافة منتج جديد
          </NavItem>
          </LinkContainer>
          
          <NavItem href="#"  >
            Login
          </NavItem>
         
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
