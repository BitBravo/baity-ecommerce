import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, Button, NavbarBrand,NavDropdown,MenuItem,Glyphicon ,DropdownButton,ButtonToolbar} from "react-bootstrap";
import bayty_icon from '../assets/img/bayty_icon.png';
import {GoSignIn,GoSignOut,GoHome} from 'react-icons/lib/go';
import {MdPersonAdd,MdAddToPhotos,MdEventSeat,MdPersonOutline,MdWeekend} from 'react-icons/lib/md';
import {TiUserAddOutline} from 'react-icons/lib/ti';
import { IndexLinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components'
import logo_placeholder from '../assets/img/logo-placeholder.jpg';


 const Input = styled.input`
 width:500px;
 margin:0;
 padding:0;
 @media only screen and (max-width: 767px) {
  width:100%;
}
 `
 const Search =styled.div`
 display:none;
 @media only screen and (max-width: 767px) {
display:inline-block;
float:right;
 `
 const UserImg = styled.img`
 width:35px;
 height:35px;
 border-radius: 50%;
position:absolute;
left:20px;
 `
const UserName = styled.div`
font-size: 12px;
dispaly:inline-block;
position: absolute;
top:12px;
left: 15px;
color:rgb(26, 156, 142)`

class Header extends Component {

  render() {
    return (

      <Navbar  fixedTop collapseOnSelect  >
        <Navbar.Header  >
       
           <NavbarBrand>
         <IndexLinkContainer to="/" style={{cursor:"pointer"}}>
          <img src={bayty_icon} />
          </IndexLinkContainer>
          </NavbarBrand>
          {/* mobile search bar */}
          <Nav  className="search">
          <NavItem >
            <div className="inner-addon right-addon">
            <i className="glyphicon glyphicon-search"></i>
                <Input  id="search"  className="form-control" type="text"  placeholder="بحث عن منتجات أفكار ...."></Input>
                </div> 
                </NavItem></Nav>
                <Search >
                <form id="demo-2">
	              <input type="search"  placeholder="بحث عن منتجات أفكار ...."/>
                 </form>
                </Search>
                


                {!this.props.authenticated ? (
                  <Nav pullLeft>
                    <NavItem>
                    <LinkContainer to="/login" activeClassName="active">
                    {/* <UserImg src={logo_placeholder}/> */}
                    <MdPersonOutline className='userlogo'/>
                    </LinkContainer>
                    </NavItem>
                    </Nav>
          //      <Nav pullLeft  className="dropdown"  >
          //     <NavDropdown pullRight title="الحساب" className="dropdownmenu">
          //       <LinkContainer style={{textAlign:'right'}} to="/login" activeClassName="active">
          //         <MenuItem className="menuItem" ><GoSignIn className="icons"/>تسجيل دخول</MenuItem>
          //       </LinkContainer>
          //        <LinkContainer className="menuItem" style={{textAlign:'right'}} to="/registration" activeClassName="active">
          //         <MenuItem ><TiUserAddOutline className="icons"/>تسجيل</MenuItem>
          //       </LinkContainer> 
          //     </NavDropdown>
          //  </Nav>
            ) : (
              <Nav pullLeft>
              <NavItem>
              <LinkContainer to="/myprofile" activeClassName="active">
              <UserName > <MdPersonOutline style={{fontSize:"20px"}}/><p style={{paddingTop:"0"}}>مرحبا</p></UserName>
              {/* <UserImg  src={logo_placeholder} /> */}
              </LinkContainer>
              
              </NavItem>
              </Nav>
//               <Nav pullLeft  className="dropdown">
//               <NavDropdown pullRight title="الحساب" className="dropdownmenu">
//               <LinkContainer style={{textAlign:'right'}} to="/logout" activeClassName="active">
//                 <MenuItem><GoSignOut className="icons"/>تسجيل خروج</MenuItem>
//               </LinkContainer>
//               <LinkContainer style={{textAlign:'right'}} to="/myprofile" activeClassName="active">
//                     <MenuItem ><MdPersonOutline className="icons"/>حسابي</MenuItem>
//                   </LinkContainer>
//                   </NavDropdown>
// </Nav>
        )} 
                       <Glyphicon glyph="shopping-cart" className="shoppingcart" />

         <Navbar.Toggle />
        </Navbar.Header>
        <Nav pullLeft>
        </Nav> 
        <Navbar.Collapse >

        <Nav  bsStyle="tabs" justified >
            <IndexLinkContainer to="/" >
              <NavItem> <GoHome className="icons"/>الرئيسية</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/productspage" >
              <NavItem> <MdEventSeat className="icons"/>المنتجات</NavItem>
            </LinkContainer>
            <LinkContainer to="/ideaspage" >
              <NavItem> <MdWeekend className="icons"/>الأفكار</NavItem>
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
