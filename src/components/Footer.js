import React, { Component } from 'react';
import baityfooter from '../assets/img/baityfooter.png';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook,TiMail} from 'react-icons/lib/ti';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { IndexLinkContainer } from 'react-router-bootstrap';
import { Glyphicon ,Modal} from "react-bootstrap";
import Homepage from '../assets/img/Unselected-homepage.png';
import Idea from '../assets/img/Unselected-idea.png';
import Product from '../assets/img/UNselected-product.png';
import Profile from '../assets/img/Profile-icon.png';
import ActiveIdea from '../assets/img/Selected-idea.png';
import ActiveHomepage from '../assets/img/Selected-homepage.png';
import ActiveProduct from '../assets/img/Selected-product.png';

const MobileDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding-left:7px;
padding-right:7px;

}
`
const IconImg = styled.img`
width:22px;
 height:22px;
;`
const UserImg = styled.img`
width:30px;
height:30px;
border-radius: 50%;
`

const UserName = styled.p`
display:block;
margin-left:auto;
margin-right:auto;
text-align:center;
font-size:8px;
padding:0;
margin-bottom:1px;
color:inherit;
`

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg:"",

      year: new Date().getFullYear()
    };

  }



  render() {
    return ([


<footer className="myfooter" fixed>
  <h4  style={{display:'inline-block'}}> {this.state.year} جميع الحقوق محفوظة <span> <img  src={baityfooter}/></span></h4>
  <h6 style={{display:'inline-block', paddingRight:'20px'}}>
       <a style={{color:'white'}}>
        <TiMail className="icons"/></a>
        <a style={{color:'white'}} href="https://twitter.com/baity_sa">
        <TiSocialTwitter className="icons"/></a>
        <a style={{color:'white'}}href="https://www.instagram.com/baity_sa/">
        <TiSocialInstagram className="icons"/></a>
        <a style={{color:'white'}} href="https://www.facebook.com/profile.php?id=100025094470933">
       <TiSocialFacebook className="icons"/></a>
   </h6>
</footer>,
<footer className="mopilefooter" fixed>
       <MobileDiv >
            <IndexLinkContainer to="/" activeClassName="activePage">
            <span>
            <IconImg src={Homepage} className="icons"/>
              <IconImg src={ActiveHomepage} className="activeIcons"/>
             <UserName > الرئيسية </UserName>
            </span>
            </IndexLinkContainer>
            <LinkContainer to="/productspage" activeClassName="activePage">
            <span>
            <IconImg src={Product} className="icons"/>
              <IconImg src={ActiveProduct} className="activeIcons"/>
               <UserName > المنتجات </UserName>
            </span>
            </LinkContainer>
            <LinkContainer to="/ideaspage" activeClassName="activePage">
            <span>
            <IconImg src={Idea} className="icons"/>
              <IconImg src={ActiveIdea} className="activeIcons"/>
               <UserName > الأفكار </UserName>
            </span>
            </LinkContainer>

             {!this.props.authenticated ? (
                <LinkContainer to="/login" activeClassName="activePage">
                    {/* <UserImg src={logo_placeholder}/> */}
                  <span>
                    <IconImg src={Profile} />
                    <UserName > حسابي </UserName>
                  </span>
                </LinkContainer>
            ) : (

              <LinkContainer to="/myprofile" activeClassName="imgActivePage" 
              // style={{display:'block',marginLeft:'auto',marginRight:'auto',padding:'0'}} 
              >
              <UserImg src={this.props.userImg}/>
              </LinkContainer>
                   

          )}
       </MobileDiv >

</footer>
    ]
    );
  }
}

export default Footer;
