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

const MobileDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
padding:0 4px 0 4px;}
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

const UserName = styled.p`
display:block;
margin-left:auto;
margin-right:auto;
text-align:center;
font-size:8px;
padding:0;
margin-bottom:1px;
`

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
            <LinkContainer to="/" >
            <span>
              <IconImg src={Homepage}/>
             <UserName > الرئيسية </UserName>
            </span>
            </LinkContainer>
            <LinkContainer to="/productspage" >
            <span>
               <IconImg src={Product} />
               <UserName > المنتجات </UserName>
            </span>
            </LinkContainer>
            <LinkContainer to="/ideaspage" >
            <span>
               <IconImg src={Idea} />
               <UserName > الأفكار </UserName>
            </span>
            </LinkContainer>

             {!this.props.authenticated ? (
                <LinkContainer to="/login" activeClassName="active">
                    {/* <UserImg src={logo_placeholder}/> */}
                  <span>
                    <IconImg src={Profile} />
                    <UserName > حسابي </UserName>
                  </span>
                </LinkContainer>
            ) : (
          <div>
              <LinkContainer to="/myprofile" activeClassName="active" style={{display:'block',marginLeft:'auto',marginRight:'auto',padding:'0'}} >
               <IconImg src={Profile} />
              </LinkContainer>
                    <UserName >
           {this.props.userName.substring(0,13)}
              </UserName>

           </div>
          )}
       </MobileDiv >

</footer>
    ]
    );
  }
}

export default Footer;
