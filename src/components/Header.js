import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
import bayty_icon from '../assets/img/bayty_icon.png';
import {GoSignIn,GoSignOut,GoHome} from 'react-icons/lib/go';
import {MdPersonAdd,MdAddToPhotos,MdEventSeat} from 'react-icons/lib/md';
import {TiUserAddOutline} from 'react-icons/lib/ti';

class Header extends Component {
  render() {
    return (
      <Navbar fixedTop inverse> 
        <Navbar.Header >
        <Navbar.Toggle />
        </Navbar.Header>
        
        <Navbar.Collapse >
        <Nav>
        <NavItem>
              <img className="navbrandimg" src={bayty_icon}/>
          </NavItem> 
          
            <LinkContainer to="/">
              <NavItem > <GoHome className="icons"/> الصفحة الرئيسية </NavItem>
            </LinkContainer>
          </Nav>
          {!this.props.authenticated ? (
            <Nav pullLeft>
              <LinkContainer to="/login">
                <NavItem><GoSignIn className="icons"/>تسجيل دخول</NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavItem><TiUserAddOutline className="icons"/>تسجيل مستخدم جديد</NavItem>
              </LinkContainer>
            </Nav>
          ) : (
            <div>
              <Nav >
              <LinkContainer to="/myproducts">
                <NavItem eventKey={2} href="#"> <MdEventSeat className="icons"/>
                  استعراض منتجاتي
                </NavItem>
                </LinkContainer>

                <LinkContainer to="/newproduct">
                  <NavItem eventKey={1}><MdAddToPhotos className="icons"/>اضافة منتج جديد  </NavItem>
                </LinkContainer>
              </Nav>

              <Nav pullLeft>
                <LinkContainer to="/logout">
                  <NavItem eventKey={1}><GoSignOut className="icons"/> تسجيل خروج</NavItem>
                </LinkContainer>
              </Nav>
            </div>
          )}
         
          {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
