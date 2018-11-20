import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import FirestoreServices from 'services/FirestoreServices';
import CaroselImg from '../assets/img/CaroselImg.jpg';
import styled from 'styled-components'
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import { TiSocialTwitter, TiSocialInstagram, TiSocialFacebook } from 'react-icons/lib/ti';
import { MdSettings } from 'react-icons/lib/md';
import { GoSignOut } from 'react-icons/lib/go';

const SettingtButton = styled.button`
font-size:15px;
float:left;
width:150px;
height:40px;
@media only screen and (max-width: 767px) {
  height: 25px;
  width:100px;
`;

const LogoutButton = styled.button`
width:80%;
height: 30px;
padding:  0;
background-color:transparent;
border:1px solid rgb(26, 156, 142);
color:rgb(26, 156, 142);
@media only screen and (max-width: 767px) {
  height: 25px;
  width: 100%;
  font-size:10px;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageCol = styled(Col)`
height:280px;
padding:0;
@media only screen and (max-width: 767px) {
  height:200px;
  }
`;

const UserImg = styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
margin-top: -75px ;
@media only screen and (max-width: 767px) {
width: 80px;
height: 80px;
margin-top: -40px ;
}`;

const SocialDiv = styled.div`
text-align:center;
font-size:15px;
color:rgb(95,96,93);
@media only screen and (max-width: 767px) {
  font-size:10px;}
`;

class NormalProfileInfo extends Component {
  constructor() {
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

  componentWillMount() {
    FirestoreServices.readDBRecord('normalUser', this.props.currentUser.uid)
      .then(value => this.setState({
        loading: false,
        profile: value
      })
      )
  }

  render() {
    return (
      <Grid style={{ backgroundColor: "white" }}>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <ImageCol sm={12} lg={12}>
            {this.state.profile.homeImgUrl
              ? <PreviewImg src={this.state.profile.homeImgUrl} />
              : <PreviewImg src={CaroselImg} />
            }
            {/* <PreviewImg  src={livingroom}     /> */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '25%' }}>
              <Link to={`/updateprofile/`}>
                <SettingtButton>الاعدادات <MdSettings style={{ fontSize: "17px", paddingRight: "3px" }} /></SettingtButton>
              </Link>
            </div>
          </ImageCol>
          <Col xs={12} lg={12}  >
            <Col xs={3} sm={2} md={2} lg={2} style={{ padding: '0' }}>
              <LinkContainer to="/logout" >
                <LogoutButton> تسجيل خروج <GoSignOut style={{ fontSize: "17px", paddingRight: "3px" }} /></LogoutButton>
              </LinkContainer>
              <SocialDiv >
                <TiSocialTwitter className="icons" />
                <TiSocialInstagram className="icons" />
                <TiSocialFacebook className="icons" />
              </SocialDiv>        </Col>
            <Col xs={6} sm={6} md={7} lg={7} style={{ padding: '0' }}>
              <h4 style={{ color: 'rgb(26,156,142)', paddingRight: '6px' }}>{this.state.profile.name}</h4>
              <h6>{this.state.profile.city} ،السعودية</h6>
            </Col>
            <Col xs={3} sm={4} md={3} lg={3} style={{ paddingRight: '0' }}>
              {this.state.profile.imgUrl
                ? <UserImg src={this.state.profile.thumbUrl ? this.state.profile.thumbUrl : this.state.profile.imgUrl} />
                : <UserImg src={logo_placeholder} />
              }
            </Col>
          </Col>
        </Row>
        <hr />
      </Grid>
    )
  }
}

export default NormalProfileInfo;
