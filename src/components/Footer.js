import React, { Component } from 'react';
import baityfooter from '../assets/img/baityfooter.png';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook,TiMail} from 'react-icons/lib/ti';
import styled from 'styled-components'


const SocialDiv = styled.div`
text-align:center;
font-size:15px;
color:white;
@media only screen and (max-width: 767px) {
  font-size:12px;}
`

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {year: new Date().getFullYear()};
  }

  render() {
    return (
     

<footer className="myfooter" fixed>

  <h4  > {this.state.year} جميع الحقوق محفوظة <span> <img  src={baityfooter}/></span></h4>
  <SocialDiv >
        <TiMail className="icons"/>
        <TiSocialTwitter className="icons"/>
        <TiSocialInstagram className="icons"/> 
       <TiSocialFacebook className="icons"/>
   </SocialDiv>
</footer>
    );
  }
}

export default Footer;