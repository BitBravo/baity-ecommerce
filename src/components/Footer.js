import React, { Component } from 'react';
import baityfooter from '../assets/img/baityfooter.png';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook,TiMail} from 'react-icons/lib/ti';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap';
import { Glyphicon ,Modal} from "react-bootstrap";
import Homepage from '../assets/img/Selected-homepage.png';
import Idea from '../assets/img/Selected-idea.png';
import Product from '../assets/img/Selected-product.png';
import Profile from '../assets/img/Profile-icon.png';

const SocialDiv = styled.div`
text-align:center;
font-size:20px;
color:white;
@media only screen and (max-width: 767px) {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding:0 10px 0 10px;}
`
const IconImg = styled.img`
width:25px;
 height:25px;
;`
const UserImg = styled.img`
width:35px;
height:35px;
border-radius: 50%;
position:absolute;
left:20px;
top:10px;
`
const UserLogo = styled.div`
font-size: 10px;
dispaly:inline-block;
color:rgb(26, 156, 142);
margin-top: -10px;
@media only screen and (max-width: 767px) {
margin:0;
}
`
const UserName = styled.p`
display:inline;
font-size:8px;
`

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      year: new Date().getFullYear()
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

  render() {
    return ([
     

<footer className="myfooter" fixed>
  <h4  > {this.state.year} جميع الحقوق محفوظة <span> <img  src={baityfooter}/></span></h4>
  <SocialDiv >
        <TiMail className="icons"/>
        <a style={{color:'white'}} href="https://twitter.com/baity_sa">
        <TiSocialTwitter className="icons"/></a>
        <a style={{color:'white'}}href="https://www.instagram.com/baity_sa/">
        <TiSocialInstagram className="icons"/></a> 
        <a style={{color:'white'}} href="https://www.facebook.com/profile.php?id=100025094470933">
       <TiSocialFacebook className="icons"/></a>
   </SocialDiv>
</footer>,
<footer className="mopilefooter" fixed>
       <SocialDiv >     
            <IndexLinkContainer to="/" >
               <IconImg src={Homepage} className="icons"/>
            </IndexLinkContainer>
            <LinkContainer to="/productspage" >
               <IconImg src={Product} className="icons"/>
            </LinkContainer>
            <LinkContainer to="/ideaspage" >
               <IconImg src={Idea} className="icons"/>
            </LinkContainer>
                {!this.props.authenticated ? (
                    <LinkContainer to="/login" activeClassName="active">
                    {/* <UserImg src={logo_placeholder}/> */}
                    <IconImg src={Profile} />
                    </LinkContainer>
            ) : (

              <LinkContainer to="/myprofile" activeClassName="active">
              <UserLogo > <IconImg src={Profile} />
              <br/>
                    <UserName >
           {this.props.userName}
                
              </UserName>
              </UserLogo>
              </LinkContainer>
           
          )}
       </SocialDiv >
 
</footer>
    ]
    );
  }
}

export default Footer;