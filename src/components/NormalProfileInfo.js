import React, { Component } from "react";
import { Grid, Modal,Col,Row, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices';
import livingroom from '../assets/img/livingroom.jpg';
import styled from 'styled-components'
import Loading from "./Loading";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook} from 'react-icons/lib/ti';

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
 
`;
const ImageCol=styled(Col)`
height:300px;
padding:0;
  }
`;
const UserImg=styled.img`
width: 180px;
height: 180px;
border-radius: 50%;
margin: -100px auto;
@media only screen and (max-width: 767px) {
width: 80px;
height: 80px;
}
`

class NormalProfileInfo extends Component{
  constructor(){
    super();

    this.state = {
      profile: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: "error"
      }
    };
  }

  componentWillMount(){

    FirebaseServices.readDBRecord('normalUser', this.props.currentUser.uid)
      .then(value => this.setState({
        loading: false,
        profile: value
    })
  )

  }

  componentWillUnmount(){
  }

  render(){
    return(
   
      <Grid style={{backgroundColor:"white"}}>
      <Row  style={{display: 'flex', flexWrap: 'wrap'}}>
        <ImageCol sm={12}  lg={12}>
          <PreviewImg  src={livingroom}     />
          <div style={{position: 'absolute',top: '10px',left: '20px',width: '20%'}}>
            <Link to={`/updateprofile/`}>
              <button>الاعدادات</button>
            </Link>
          </div>
        </ImageCol>
        <Col xs={12}  lg={12} style={{marginBottom:'20px'}}>
        <Col xs={4} lg={2}>
         <span style={{float:'left'}}><TiSocialTwitter className="icons"/> <TiSocialInstagram className="icons"/> <TiSocialFacebook className="icons"/></span>
        </Col>
        <Col xs={5}  lg={7} style={{paddingLeft:'0'}}>
          <h3>{this.state.profile.name}</h3>
          <label>{this.state.profile.city} ،السعودية</label>
        </Col>
        <Col xs={3} lg={3}>
        {this.state.profile.imgUrl
        ? <UserImg  src={this.state.profile.imgUrl}  />
        : <UserImg src={logo_placeholder} />
        }
      </Col>
        </Col>
      </Row>
      <hr/>
      </Grid>
   
    )
  }
}

export default NormalProfileInfo;
