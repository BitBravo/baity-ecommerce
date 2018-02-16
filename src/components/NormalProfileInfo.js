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

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

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
        <Col sm={12}  lg={12}>
          <PreviewImg  src={livingroom}     />
          <div style={{position: 'absolute',top: '10px',left: '20px',width: '20%'}}>
            <Link to={`/updateprofile/`}>
              <button>الاعدادات</button>
            </Link>
          </div>
        </Col>
      <Col sm={4} lg={3}>
        {this.state.profile.imgUrl
        ? <Image style={{borderRadius: '50%', width: '180px', height: '180px', margin: '-100px auto'}} src={this.state.profile.imgUrl}  alt="logo" circle responsive />
        : <Image style={{borderRadius: '50%', width: '180px', height: '180px', margin: '-100px auto'}} src={logo_placeholder} alt="logo" circle responsive />
        }
      </Col>
        <Col sm={8}  lg={6}>
          <h3>{this.state.profile.name}</h3>
          <label>{this.state.profile.city} ،السعودية</label>
        </Col>
        <Col sm={12}  lg={3}>
          <button>اتصل بنا</button>
        </Col>
        
      </Row>
      <hr/>
      </Grid>
   
    )
  }
}

export default NormalProfileInfo;
