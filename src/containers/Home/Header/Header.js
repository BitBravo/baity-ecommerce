import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavbarBrand, Modal } from "react-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components'
import logo_placeholder from 'assets/img/logo-placeholder.jpg';
import Homepage from 'assets/img/Unselected-homepage.png';
import Idea from 'assets/img/Unselected-idea.png';
import Product from 'assets/img/UNselected-product.png';
import Cart from 'assets/img/Cart-icon.png';
import ActiveIdea from 'assets/img/Selected-idea.png';
import ActiveHomepage from 'assets/img/Selected-homepage.png';
import ActiveProduct from 'assets/img/Selected-product.png';
import bayty_icon from 'assets/img/bayty_icon.png';
import ActiveProfile from 'assets/img/Profile-icon.png';
import Profile from 'assets/img/Unselected-profile.png';
import FirestoreServices from 'services/FirestoreServices';

const MainNav = styled(Nav)`
@media only screen and (max-width: 767px) {
  display:none !important;
}
`
const Line = styled.hr`
width:400%;
border-style: ridge;
margin:0 -1500px 0 0;
 color:#e6e6e6;
`;

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
`;

const UserNav = styled(Nav)`
width:100px !important;

@media only screen and (max-width: 767px) {
display:none !important;}
`;

const AdminNav = styled(Nav)`
width:70px !important;
padding: 6px 0 !important;
@media only screen and (max-width: 767px) {
display:none;}
`;

const AdminIcon = styled.i`
font-size: 24px !important;
font-weight: 900;
color: #00A19A;
`;

const UserImg = styled.img`
 width:35px;
 height:35px;
 border-radius: 50%;
 position:absolute;
 left:25px;
 top:8px;
 `
const Logo = styled.img`
 width:28px;
 height:28px;
//  margin-top: 9px;
`
const PageIcon = styled.img`
width:18px;
 height:18px;
;`
const SearchNavItem = styled.div`
padding: 10px 0px;
height: 100%;
@media only screen and (max-width: 767px) {
  padding: 12px 0px;
}
@media only screen and (max-width: 250px) {
  display: none;
}
`;
const Search = styled.div`
display:none;
@media only screen and (max-width: 250px) {
display: block;
color: rgb(26,156,142);
width: 100%;
font-size: 22px;
text-align: left;
margin: auto;
padding-left: 10px;
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

const LogImg = styled.img`
padding: 7px 0px 5px 0px !important;
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
    if (this.props.authenticated) {
      if (this.props.group === "prof") {
        FirestoreServices.readDBRecord('profUser', `${this.props.currentUser.uid}`)
          .then(val => {
            this.setState({ userName: val.name, firstTime: false })
          })
      } else {
        FirestoreServices.readDBRecord('normalUser', `${this.props.currentUser.uid}`)
          .then(val =>
            this.setState({ userName: val.name, firstTime: false }))
      }
    }
  }

  render() {
    const { adminRoute, admin } = this.props;
    const profileUrl = this.props.group ? '/myprofile' : '/myprofile';

    const adminLinkFlag = !!(!adminRoute && (admin && admin.toString() === 'true'));
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <NavbarBrand>
            <IndexLinkContainer to="/" style={{ cursor: 'pointer' }}>
              <LogImg src={bayty_icon} />
            </IndexLinkContainer>
          </NavbarBrand>
          {/* desktop search bar */}
          <Nav>
            <SearchNavItem>
              <div className="inner-addon right-addon">
                <i className="glyphicon glyphicon-search" style={{ fontSize: '10px', color: 'gray' }} />
                <Input id="search" className="form-control" type="text" placeholder="بحث عن منتجات أفكار ...." style={{ width: adminLinkFlag? '100%' : '' }} />
              </div>
            </SearchNavItem>
          </Nav>

          {/* mobile search bar */}
          <Search>
            <i className="glyphicon glyphicon-search" onClick={this.handleShow} />
          </Search>

          {adminLinkFlag ? (
            <AdminNav>
              <NavItem style={{ float: 'left', fontSize: '8px' }}>
                <LinkContainer to="/admin">
                  <AdminIcon className="fa fa-cogs" aria-hidden="true" />
                </LinkContainer>
              </NavItem>
            </AdminNav>
          )
            : ''
          }

          {!this.props.authenticated ? (
            <UserNav>
              <NavItem style={{ float: 'left', fontSize: '8px' }}>
                <LinkContainer to="/login" activeClassName="activePage">
                  <span>
                    <Logo src={ActiveProfile} className="activeIcons" />
                    <Logo src={Profile} className="icons" />
                  </span>
                </LinkContainer>
              </NavItem>
            </UserNav>
          ) : (
            <UserNav>
              <NavItem style={{ float: 'left' }}>
                <LinkContainer to={profileUrl} activeClassName="imgActivePage">
                  {this.props.userImg && this.props.userImg !== 'undefined'
                    ? <UserImg src={this.props.userImg} />
                    : <UserImg src={logo_placeholder} />
                  }
                  {/* <UserLogo >
                    <IconImg src={Profile} />
                    <br />
                    <UserName >
                      مرحبا ،  {this.props.userName}
                    </UserName>
                  </UserLogo> */}
                </LinkContainer>
              </NavItem>
            </UserNav>
          )}


          {/* mobile search bar */}
          <Modal
            {...this.props}
            show={this.state.show}
            onHide={this.handleHide}
            style={{ top: 30 }}>
            <Modal.Body>
              <form>
                <Input placeholder="بحث عن منتجات أفكار ...." />
              </form>
            </Modal.Body>
          </Modal>

          <div style={{ float: 'left' }} className="cartmenu">
            {this.props.authenticated
              ? (
                <LinkContainer to="/mycart" activeClassName="active" style={{ position: 'relative', cursor: 'pointer', margin: '3px' }}>
                  <div style={{ position: 'relative' }}>
                    {this.props.cartCount > 0
                      ? <CartNo>{this.props.cartCount}</CartNo>
                      : null
                    }
                    <Logo src={Cart} className="shoppingcart" />
                  </div>
                </LinkContainer>
              )
              : (
                <LinkContainer to="/registration" activeClassName="active" className="authenticated-cart" style={{ position: 'relative', cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    {/* {this.props.cartCount > 0 ?
                  <CartNo>{this.props.cartCount}</CartNo>
                  : null
                } */}
                    <Logo src={Cart} className="shoppingcart" />
                  </div>
                </LinkContainer>
              )}
            {/* {this.props.authenticated ?
              <div className="shorcartlist">
                <HeaderCart currentUser={this.props.currentUser}
                  basket={this.props.basket}
                />
                <LinkContainer to="/mycart" >
                  <Button>عرض السلة</Button>
                </LinkContainer>
              </div>
              : null} */}
          </div>
        </Navbar.Header>

        {/* <Navbar.Collapse > */}
        <MainNav bsStyle="tabs" justified className="itemNav">
          <Line style={{}} />
          <IndexLinkContainer to="/" activeClassName="activePage">
            <NavItem>
              <PageIcon src={ActiveHomepage} className="activeIcons" />
              <PageIcon src={Homepage} className="icons" />
                الرئيسية
            </NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/productspages" activeClassName="activePage">
            <NavItem>
              <PageIcon src={ActiveProduct} className="activeIcons" />
              <PageIcon src={Product} className="icons" />
                المنتجات
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/ideaspage" activeClassName="activePage">
            <NavItem>
              <PageIcon src={ActiveIdea} className="activeIcons" />
              <PageIcon src={Idea} className="icons" />
                 التصاميم
            </NavItem>
          </LinkContainer>
        </MainNav>
        {/* </Navbar.Collapse > */}
      </Navbar>
    );
  }
}

export default Header;
