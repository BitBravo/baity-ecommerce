import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, Button, NavbarBrand } from "react-bootstrap";
import bayty_icon from '../assets/img/bayty_icon.png';
import {GoSignIn,GoSignOut,GoHome} from 'react-icons/lib/go';
import {MdPersonAdd,MdAddToPhotos,MdEventSeat} from 'react-icons/lib/md';
import {TiUserAddOutline} from 'react-icons/lib/ti';
import { IndexLinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  render() {
    return (

      <Navbar fixedTop   >

        <Navbar.Header  >
        <NavbarBrand>
          <img src={bayty_icon} />
          </NavbarBrand>

          <Navbar.Toggle />


        </Navbar.Header>


        <Navbar.Collapse   >

        <Nav  >

            <IndexLinkContainer to="/" activeClassName="active">
              <NavItem   > <GoHome className="icons"/> الصفحة الرئيسية </NavItem>
            </IndexLinkContainer>
            </Nav>


          {!this.props.authenticated ? (

            <Nav pullLeft >
              <LinkContainer to="/login" activeClassName="active">
                <NavItem ><GoSignIn className="icons"/>تسجيل دخول</NavItem>
              </LinkContainer>
              <LinkContainer to="/register" activeClassName="active">
                <NavItem ><TiUserAddOutline className="icons"/> مستخدم جديد</NavItem>
              </LinkContainer>
            </Nav>

          ) : (

            <div>
              <Nav  >

              <LinkContainer to="/myproducts">
                <NavItem  href="#"> <MdEventSeat className="icons"/>
                  استعراض منتجاتي
                </NavItem>
                </LinkContainer>

                <LinkContainer to="/newproduct">
                  <NavItem ><MdAddToPhotos className="icons"/>اضافة منتج جديد  </NavItem>
                </LinkContainer>
                <LinkContainer to="/myprofile">
                  <NavItem ><MdAddToPhotos className="icons"/>حسابي  </NavItem>
                </LinkContainer>
              </Nav>

              <Nav pullLeft  >
                <LinkContainer to="/logout">
                  <NavItem ><GoSignOut className="icons"/> تسجيل خروج</NavItem>
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

       </Navbar.Collapse >

      </Navbar>

    );
  }
}

export default Header;
