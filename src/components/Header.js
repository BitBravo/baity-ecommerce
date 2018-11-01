import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from '../services/FirebaseServices'
import { Nav, Navbar, NavItem, NavbarBrand, NavDropdown, MenuItem, Glyphicon, Modal, Col, Collapse, Row } from "react-bootstrap";
import bayty_icon from '../assets/img/bayty_icon.png';
import { TiUserAddOutline } from 'react-icons/lib/ti';
import { IndexLinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components'
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import Homepage from '../assets/img/Unselected-homepage.png';
import Idea from '../assets/img/Unselected-idea.png';
import Product from '../assets/img/UNselected-product.png';
import Profile from '../assets/img/Unselected-profile.png';
import ActiveProfile from '../assets/img/Profile-icon.png';
import Cart from '../assets/img/Cart-icon.png';
import { HeaderCart } from "./MyCart";
import ActiveIdea from '../assets/img/Selected-idea.png';
import ActiveHomepage from '../assets/img/Selected-homepage.png';
import ActiveProduct from '../assets/img/Selected-product.png';



const MainNav = styled(Nav)`
@media only screen and (max-width: 767px) {
  display:none;
}
`
const Line = styled.hr`
width:400%;
margin:0 -1500px 0 0;
 color:#e6e6e6;
`

const CartNo = styled.div`
position:absolute;
left:25px;
top:7px;
height:15px;
width:15px;
font-size:10px;
line-height: 15px;
color:white;
text-align:center;
background-color:red;
border-radius: 50%;
`
const UserNav = styled(Nav)`
@media only screen and (max-width: 767px) {
display:none;}
`
const UserImg = styled.img`
 width:35px;
 height:35px;
 border-radius: 50%;
 position:absolute;
 left:25px;
 top:8px;
 `
const Logo = styled.img`
 width:32px;
 height:28px;

`
const UserName = styled.p`
display:inline;
`
const PageIcon = styled.img`
width:18px;
 height:18px;
;`
const Button = styled.button`
height:30px;
width:90%;
display:block;
margin-left:auto;
margin-right:auto;
`
const Search = styled.div`
display:none;
@media only screen and (max-width: 767px) {
display:block;
position:absolute;
left:0;
margin-top:15px;
margin-left:15px;
color: rgb(26,156,142);
}
`
const Input = styled.input`
 width:550px;
 height:30px;
 margin:0;
 padding:0;
 @media only screen and (max-width: 991px) {
  width:350px;
 }
 @media only screen and (max-width: 767px) {
  width:100%;
  height:30px;
}
 `

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userImg: "",
      userName: "",
      firstTime: true,
      show: false,
      currentUser: "",
      basket: {}
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

  }
  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  componentWillMount() {
    // if (this.props.authenticated){
    //   if (this.props.group === "prof"){
    //     FirebaseServices.readDBRecord('profUser', `${this.props.currentUser.uid}`)
    //       .then(val => {
    //         this.setState({userName: val.name, firstTime: false})})
    //   }else {
    //     FirebaseServices.readDBRecord('normalUser', `${this.props.currentUser.uid}`)
    //       .then(val =>
    //           this.setState({userName: val.name, firstTime: false}))
    //   }
    // }
  }

  render() {

    return (
      <Navbar fixedTop collapseOnSelect  >
        <Navbar.Header  >
          {/* <NavbarBrand>
            <IndexLinkContainer to="/" style={{ cursor: "pointer" }}>
              <img src={bayty_icon} />
            </IndexLinkContainer>
          </NavbarBrand> */}
          {/* desktop search bar */}
          {/* <Nav className="search">
            <NavItem >
              <div className="inner-addon right-addon">
                <i className="glyphicon glyphicon-search" style={{ fontSize: '10px', color: 'gray' }} ></i>
                <Input id="search" className="form-control" type="text" placeholder="بحث عن منتجات أفكار ...."></Input>
              </div>
            </NavItem>
          </Nav> */}

          {!this.props.authenticated ? (
            <UserNav >
              {/* <NavItem style={{ float: 'left', fontSize: '8px' }}>
                <LinkContainer to="/login" activeClassName="activePage">
                  <span>
                    <Logo src={ActiveProfile} className="activeIcons" />
                    <Logo src={Profile} className="icons" />
                  </span>
                </LinkContainer>
              </NavItem> */}
            </UserNav>
          ) : (
              <UserNav >
                <NavItem style={{ float: 'left' }}>
                  <LinkContainer to="/myprofile" activeClassName="imgActivePage">
                    {this.props.userImg
                      ? <UserImg src={this.props.userImg} />
                      : <UserImg src={logo_placeholder} />
                    }

                    {/* <UserLogo > 
                       <IconImg src={Profile} />
                         <br/>
                       <UserName >
                          مرحبا ،  {this.props.userName}
                       </UserName>
             
                      </UserLogo> */}
                  </LinkContainer>

                </NavItem>
              </UserNav>
            )}


          {/* mobile search bar */}
          <Search  >
            <i className="glyphicon glyphicon-search" onClick={this.handleShow}></i>
          </Search>

          <Modal  {...this.props}
            show={this.state.show}
            onHide={this.handleHide} style={{ top: 30 }}  >
            <Modal.Body>
              <form >
                <Input placeholder="بحث عن منتجات أفكار ...." />
              </form>
            </Modal.Body>
          </Modal>

          <div style={{ float: 'left' }} className="cartmenu">
            <LinkContainer to="/mycart" activeClassName="active" style={{ position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                {this.props.cart > 0 ?
                  <CartNo>{this.props.cart}</CartNo>
                  : null
                }
                <Logo src={Cart} className="shoppingcart" />
              </div>
            </LinkContainer>
            {this.props.authenticated ?
              <div className="shorcartlist">
                <HeaderCart currentUser={this.props.currentUser}
                  basket={this.props.basket}
                />
                <LinkContainer to="/mycart" >
                  <Button>عرض السلة</Button>
                </LinkContainer>
              </div> : null}
          </div>


        </Navbar.Header>


        {/* <Navbar.Collapse > */}
        <MainNav bsStyle="tabs" justified>
          <Line style={{}} />

          <IndexLinkContainer to="/" activeClassName="activePage">
            <NavItem >
              <PageIcon src={ActiveHomepage} className="activeIcons" />
              <PageIcon src={Homepage} className="icons" />الرئيسية</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/productspage" activeClassName="activePage">
            <NavItem >
              <PageIcon src={ActiveProduct} className="activeIcons" />
              <PageIcon src={Product} className="icons" />المنتجات</NavItem>
          </LinkContainer>
          <LinkContainer to="/ideaspage" activeClassName="activePage">
            <NavItem >
              <PageIcon src={ActiveIdea} className="activeIcons" />
              <PageIcon src={Idea} className="icons" />الأفكار</NavItem>
          </LinkContainer>

        </MainNav>


        {/* </Navbar.Collapse > */}

      </Navbar>

    );
  }
}

export default Header;
