import React, { Component } from "react";
import { Grid, Modal,Col,Row, Image } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirestoreServices from './FirestoreServices'
import livingroom from '../assets/img/livingroom.jpg';
import CaroselImg from '../assets/img/CaroselImg.jpg'; 
import styled from 'styled-components'
import Loading from "./Loading";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';
import webicon from '../assets/img/webicon.png';
import {TiSocialTwitter,TiSocialInstagram,TiSocialFacebook,TiPhoneOutline} from 'react-icons/lib/ti';
import {MdCall,MdSettings} from 'react-icons/lib/md';
import {GoSignOut} from 'react-icons/lib/go';


const SettingtButton = styled.button`
@media only screen and (max-width: 767px) {
  height: 30px;
`;
const LogoutButton = styled.button`
width:100%px;
height: 30px;
padding:  0;
background-color:transparent;
border:1px solid rgb(26, 156, 142);
color:rgb(26, 156, 142);
@media only screen and (max-width: 767px) {
  height: 30px;
  width: 100%;
  font-size:10px;
`;
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;

`;
const ImageCol=styled(Col)`
height:280px;
padding:0;
@media only screen and (max-width: 767px) {
  height:200px;

  }
`;
const UserImg=styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
margin-top: -75px ;
@media only screen and (max-width: 767px) {
width: 80px;
height: 80px;
margin-top: -40px ;

}
`
const UserNameDiv = styled.div`
display:inline-block;
padding-right:5px;
`;
const SocialDiv = styled.div`
text-align:center;
font-size:20px;
color:rgb(95,96,93);
@media only screen and (max-width: 767px) {
  font-size:15px;}
`
const Logo = styled.img`
width:15px;
 height:15px;
`
const CloseButton=styled.button`
position:absolute;
top:0px;
left:5px;
width:30px;
height:30px;
background-color:white;
color:black;`
class ProfileInfo extends Component{
  constructor(){
    super();

    this.state = {
      profile: {},
      loading: true,
      owner: "empty",
      errorHandling: {
        showError: false,
        errorMsg: "error"
      },
      show: false
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

  componentWillMount(){
    var id = ""
    if(this.props.user){
      this.setState({owner: this.props.currentUser})
      id=this.props.currentUser
      console.log("this.props.currentUser " + this.props.currentUser)
    }else{
        this.setState({owner: this.props.currentUser.uid})
        id = this.props.currentUser.uid
        console.log("this.props.currentUser.uid " + this.props.currentUser.uid)
    }
    FirestoreServices.getProfessionalUserBusinessId(id,
      (businessId) => {
        if (businessId === '') {
          this.setState({ errorHandling: { showError: true, errorMsg: {message:'خطأ داخلي: لم يتم العثور على الشركة '} } });
        } else {
          this.bussRef = base.bindDoc(`${FirestoreServices.BUSINESSES_PATH}/${businessId}`, {
            context: this,
            state: "profile",
            then(data) {
              this.setState({ loading: false });
            },
            onFailure(error) {
              this.setState({ errorHandling: { showError: true, errorMsg: error } });
            }
          })
        }//else
    }, (error) => {
      this.setState({ errorHandling: { showError: true, errorMsg: error } });
    });
  }

  componentWillUnmount(){
    this.bussRef && base.removeBinding(this.bussRef);
  }
  render(){
    return(
      <Grid style={{backgroundColor:"white"}}>
      <Row  style={{display: 'flex', flexWrap: 'wrap'}}>
        <ImageCol sm={12}  lg={12}>
        {this.state.profile.homeImgUrl
        ? <PreviewImg  src={this.state.profile.homeImgUrl}  />
        : <PreviewImg  src={CaroselImg} />
        }
          {/* <PreviewImg  src={livingroom}     /> */}
          <div style={{position: 'absolute',top: '10px',left: '30px',width:'25%'}}>
          {!this.props.user
            ?<Link to="/myprofprofile/">
              <SettingtButton>الاعدادات <MdSettings style={{fontSize:"17px",paddingRight:"3px"}}/></SettingtButton>
            </Link>
            : null
          }
          </div>
        </ImageCol>
        <Col xs={12}  lg={12} >
        <Col xs={3} sm={2} md={2} lg={2} style={{padding:'0'}}>
        {this.props.user
        ?
            <LogoutButton style={{cursor:'auto'}} onClick={this.handleShow}>اتصل بنا<TiPhoneOutline style={{fontSize:"17px",paddingRight:"3px"}}/></LogoutButton>

        : <LinkContainer to="/logout" >
            <LogoutButton> تسجيل خروج <GoSignOut style={{fontSize:"17px",paddingRight:"3px"}}/></LogoutButton>
          </LinkContainer>
        }
         <SocialDiv >
             <a href={`https://twitter.com/${this.state.profile.twitter}`} style={{color:'gray'}}><TiSocialTwitter className="icons"/></a>
             <a href={`https://www.facebook.com/${this.state.profile.facebook}`} style={{color:'gray'}}><TiSocialFacebook className="icons"/></a>
             <a href={`https://www.instagram.com/${this.state.profile.instagram}`} style={{color:'gray'}}><TiSocialInstagram className="icons"/></a>
             <a href={`${this.state.profile.website}`} style={{color:'gray'}}><Logo src={webicon}/></a>

         </SocialDiv>
        </Col>
        <Col xs={6} sm={6} md={7}lg={7} style={{padding:'0'}}>
        <UserNameDiv> <h4 style={{color:'rgb(26,156,142)',padding:'0'}}>{this.state.profile.businessName} </h4> </UserNameDiv>
         <UserNameDiv ><h6 style={{margin:'0',padding:'0'}}>{this.state.profile.types}</h6></UserNameDiv>
          <h6 style={{marginTop:'0'}}>{this.state.profile.city}،السعودية</h6>
        </Col>
          <Col xs={3} sm={4} md={3} lg={3} style={{paddingRight:'0'}}>
        {this.state.profile.imgUrl
        ? <UserImg  src={this.state.profile.thumbUrl? this.state.profile.thumbUrl : this.state.profile.imgUrl}  />
        : <UserImg  src={logo_placeholder} />
        }
      </Col>
      </Col>
    </Row>
    <hr/>
    <div>
                <Modal
                  show={this.state.show}
                  onHide={this.handleHide} style={{ top: 250 }}>
                 <Modal.Header>
                  <CloseButton onClick={this.handleHide}>X</CloseButton>
                    للتواصل مع البائع
                  </Modal.Header>
                  <Modal.Body style={{display:'inline-block'}}>
                  <div style={{display:'inline-block'}}>
                  <p>رقم الهاتف</p>
                  <a style={{color:'rgb(26,156,142)'}} href={`tel:${this.state.profile.phone}`}>{this.state.profile.phone}</a>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
    </Grid>
    )
  }
}

export default ProfileInfo;
