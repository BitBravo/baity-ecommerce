import React, { Component } from "react";
import { Modal, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { app, base, database, storage } from "../base";
import FirebaseServices from './FirebaseServices'
import Loading from "./Loading";

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Panel, ProgressBar
} from "react-bootstrap";
import ProfProfileForm from "./ProfProfileForm";
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'

class ProfProfileUpdater extends Component {
  constructor(props) {
    super(props);
    this.profId = this.props.match.params.id;

    this.state = {
      profile: {},
      loading: true,
      errorHandling: {
        showError: false,
        errorMsg: "error"
      },
      uploadProgress: {
        show: false,
        percentage: 0
      },
      submitStatus: {
        showSubmitModal: false,
        submitSuccessful: false,
        errorMsg: ''
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.formPercentageViewer = this.formPercentageViewer.bind(this)
    this.formSuccessHandler = this.formSuccessHandler.bind(this)
  }

  componentWillMount() {
    FirebaseServices.readBusinessId(this.props.currentUser.uid, (businessId) => {
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

  componentWillUnmount() {
    this.bussRef && base.removeBinding(this.bussRef);
  }

  formPercentageViewer(percentage) {   
      this.setState(
        {
          uploadProgress: {show: percentage < 100, percentage: percentage}
        }
      )

  }
  formSuccessHandler() {
    //hide waiting alert then show submission success msg
    let uploadProgress = {
      show: false, percentage: 100
    }
    //show success popup
    let submitStatus = {
      showSubmitModal: true,
      submitSuccessful: true,
      errorMsg: ''
    }
    let newState = {...this.state, uploadProgress, submitStatus}
    
    this.setState(newState)
  }

  

  handleSubmit(
    profileData,
    formErrorHandler
  ) {
    if (!this.state.profile){
      formErrorHandler('خطأ داخلي: لم يتم العثور على البروفايل في قاعدة البيانات')
      return 
    }
    profileData.id = this.state.profile.id;
    console.log(profileData)
    console.log('ProfProfileForm.handleSubmit')
    FirebaseServices.updateProfProfile(profileData, formErrorHandler, this.formSuccessHandler, this.formPercentageViewer)  
  }

  render() {
    if (this.state.loading && !this.state.errorHandling.showError)
      return <Loading />;
    if (this.state.errorHandling.showError)
      return (
        <div>
          <Modal show={true} style={{ top: 300 }}>
            <Modal.Header>حدث خطأ غير معروف</Modal.Header>
            <Modal.Body>
              
                <Alert bsStyle="danger">
                  {this.state.errorHandling.errorMsg.message}
                </Alert>
                <Link to="/">
                <Button>العودة للصفحة الرئيسية</Button>
                </Link>
            </Modal.Body>
          </Modal>
        </div>
      );
    if (!this.state.loading && !this.state.showError)
      return (
        <div
        className="loginreg" 
        >
          
              <ProfProfileForm
                profile={this.state.profile}
                onSubmit={this.handleSubmit.bind(this)}
              />

        {/* This modal is shown after product addition/form submission is finshed.
          Its content depends if the form submission was successful or failed.
          if successful it will ask if user wants to add another new product or go to main page.
          If failed it will show error message and ask user to go to home pgae  */}
        <Modal
          show={this.state.submitStatus.showSubmitModal}
          style={{top: 300}}
        >
          <Modal.Header >
            { this.state.submitStatus.submitSuccessful 
              ? <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{color: 'green', width: '30px', height: '30px'}}/>  تم تحديث البروفايل بنجاح</Modal.Title>
              : <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{color: 'red', width: '30px', height: '30px'}}/>  حدث خطأ في تحديث البروفايل</Modal.Title>
            }
          </Modal.Header>
            <Modal.Body>
            { this.state.submitStatus.submitSuccessful 
              ?
                null 
              :
                
                <Alert
                  bsStyle='danger'
                >
                  {this.state.submitStatus.errorMsg}
                </Alert>
            
            }
              <Link to="/">
                <Button style={{margin: 'auto'}}>العودة للصفحة الرئيسية</Button>
              </Link>
            </Modal.Body>
        </Modal>
        
        {/* This modal is for showing image upload progress bar to show progress of 
        uploading/adding product to DB */}
        <Modal
          show={this.state.uploadProgress.show}
          style={{top: 300}}>
          <Modal.Header >
              <Modal.Title id="contained-modal-title2">  جاري تحديث البروفايل</Modal.Title>
              <ProgressBar now={this.state.uploadProgress.percentage} label={`${this.state.uploadProgress.percentage}%`} />
          </Modal.Header>
        </Modal>
        </div>
      );
  }
}

export default ProfProfileUpdater;
