import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Popover,
  Button,
  OverlayTrigger,
  Fade,
  Collapse,
  Alert,
  Modal,
  ProgressBar,
  Row,
  Col
} from "react-bootstrap";
import FirebaseServices from "./FirebaseServices";
import Loading from "./Loading";
import { app } from "../base";
import FormUtils from './FormUtils'
import bayty_icon from '../assets/img/bayty_icon.png';

/*
This is the form for selecting type of user: professional or normal.
*/


function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock style={{ fontSize: "80%" }}>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}

class UserTypeSelector extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
      formStatusAlert: {
        alert: false,
        type: "info", //indicates that we should show an alert msg due to form invalid
        alertMsg: "" //message shown when form can not be submitted cause form is not valid
      },
      formValidationStatus: this.formValidationStatus,
      loading: false //used while authenticating with firebase
    };


  }


  render() {
    return (
      <div className="loginreg">
      <form>
           <img src={bayty_icon}/>
        <div className="loginregtitle">
          <h3 >التسجيل</h3>
          </div>

          <Row>
          <Col>
            <Link to={`/registerNormal`}>
              <button>
                تسجيل حساب شخصي
              </button>
            </Link>
            </Col>
          </Row>

          <Row>
          <Col>
            <Link to={`/registerProf`}>
              <button>
                تسجيل حساب تجاري
              </button>
            </Link>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default UserTypeSelector;
