import React, { Component } from "react";
import { Grid, Modal,Col,Row, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices'
import livingroom from '../assets/img/livingroom.jpg';
import styled from 'styled-components'
import Loading from "./Loading";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';

const PreviewImg = styled.img`
  width: 100%;
  height: 20%;
`;

class ProfileInfo extends Component{
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
    FirebaseServices.getProfessionalUserBusinessId(this.props.currentUser.uid,
      (businessId) => {
        if (businessId === '') {
          this.setState({ errorHandling: { showError: true, errorMsg: {message:'خطأ داخلي: لم يتم العثور على الشركة '} } });
        } else {
          this.bussRef = base.syncState(`${FirebaseServices.BUSINESSES_PATH}/${businessId}`, {
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
      <div style={{paddingTop: "30px"}}>
      <Grid>
      <Row>
        <Col sm={12}  lg={12}>
        <div style={{position: 'relative'}}>
          <PreviewImg  src={livingroom}     />
          <div style={{position: 'absolute',top: '10px',left: '20px',width: '20%'}}>
            <Link to={`/myprofprofile/`}>
              <button>الاعدادات</button>
            </Link>
          </div>
        </div>
        </Col>
      </Row>

      <Row style={{display: 'flex', flexWrap: 'wrap', marginBottom: '40px'}}>
      <Col sm={4} lg={3}>
        {this.state.profile.imgUrl
        ? <Image style={{borderRadius: '50%', width: '200px', height: '200px', margin: '-100px auto'}} src={this.state.profile.imgUrl}  alt="logo" circle responsive />
        : <Image style={{borderRadius: '50%', width: '200px', height: '200px', margin: '-100px auto'}} src={logo_placeholder} alt="logo" circle responsive />
        }
      </Col>
        <Col sm={8}  lg={6}>
          <h3 style={{display: 'inline-block'}}>{this.state.profile.businessName}</h3>
          <h4 style={{display: 'inline'}}> {this.state.profile.types} </h4>
          <label>{this.state.profile.city} ،السعودية</label>
        </Col>
        <Col sm={12}  lg={3}>
          <button>اتصل بنا</button>
        </Col>
      </Row>
      </Grid>
      <hr/>
      </div>
    )
  }
}

export default ProfileInfo;
