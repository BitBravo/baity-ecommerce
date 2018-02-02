import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, Button, NavbarBrand } from "react-bootstrap";
import bayty_icon from '../assets/img/bayty_icon.png';
import {GoSignIn,GoSignOut,GoHome} from 'react-icons/lib/go';
import {MdPersonAdd,MdAddToPhotos,MdEventSeat,MdPersonOutline,MdAddShoppingCart} from 'react-icons/lib/md';
import {TiUserAddOutline} from 'react-icons/lib/ti';
import { IndexLinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'


 const Input = styled.input`
 width:400px;
 margin-bottom:0;
 @media only screen and (max-width: 767px) {
  width:200px;
}
 `

class Header extends Component {
  render() {
    return (

      <Navbar fixedTop collapseOnSelect >
        <Navbar.Header  >
        <Navbar.Toggle />

           <NavbarBrand>
         <IndexLinkContainer to="/" >
          <img src={bayty_icon} />
          </IndexLinkContainer>
          </NavbarBrand>

        </Navbar.Header>

        <Navbar.Collapse>
        <Nav>
        <NavItem >
          <div className="inner-addon right-addon">
          <i className="glyphicon glyphicon-search"></i>
              <Input  id="inputEmail"  className="form-control" type="text"  placeholder="بحث عن منتجات أفكار ...."></Input>
              </div>
              </NavItem>
              {!this.props.authenticated ? (

            <Nav pullLeft >
              <LinkContainer to="/login" activeClassName="active">
                <NavItem><GoSignIn className="icons"/>تسجيل دخول</NavItem>
              </LinkContainer>
              { <LinkContainer to="/registration" activeClassName="active">
                <NavItem ><TiUserAddOutline className="icons"/>تسجيل</NavItem>
              </LinkContainer> }
            </Nav>

          ) : (
            <Nav pullLeft  >
            <LinkContainer to="/logout">
              <NavItem ><GoSignOut className="icons"/>تسجيل خروج</NavItem>
            </LinkContainer>
            <LinkContainer to="/myprofprofile" >
                  <NavItem ><MdPersonOutline className="icons"/>حسابي</NavItem>
                </LinkContainer>
                {/* <NavItem><MdAddShoppingCart className="icons"/></NavItem> */}
          </Nav>
      )}
              </Nav>
        <Nav  bsStyle="tabs"
          justified >


            <IndexLinkContainer to="/" activeClassName="active">
              <NavItem> <GoHome className="icons"/>الصفحة الرئيسية</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/productspage" activeClassName="active">
              <NavItem> <MdEventSeat className="icons"/>المنتجات</NavItem>
            </LinkContainer>
            <LinkContainer to="/products" activeClassName="active">
              <NavItem> <MdEventSeat className="icons"/>الأفكار</NavItem>
            </LinkContainer>
            </Nav>

              {/* <div>
              <Nav bsStyle="tabs"
          justified  >
              <LinkContainer to="/myproducts">
                <NavItem  href="#"> <MdEventSeat className="icons"/>
                  استعراض منتجاتي
                </NavItem>
                </LinkContainer>

                <LinkContainer to="/newproduct">
                  <NavItem ><MdAddToPhotos className="icons"/>اضافة منتج جديد  </NavItem>
                </LinkContainer>

              </Nav>
              </div>



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
