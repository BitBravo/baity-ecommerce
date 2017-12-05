import React, { Component } from "react";
import _ from 'lodash'
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
import Utils from './Utils'
import bayty_icon from '../assets/img/bayty_icon.png';


function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}


const SelectGroup = ({ id, label, selectedOption, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass="select"
      placeholder={props.placeholder}
      name={props.name}
      value={selectedOption}
      onChange={props.onChange}
    >
      {props.options.map(opt => {        
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </FormControl>
  </FormGroup>
);

const FIELDS = {
  bussName: {
    type: 'input',
    label: 'اسم الشركة أو المؤسسة',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  city: {
    type: 'select',
    label: 'مقر الشركة أو المؤسسة',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  logo: {
    type: 'image',
    label: 'لوقو الشركة' ,
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  preview: {
    type: 'input',
    label: 'نبذة عن الشركة',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  website: {
    type: 'input',
    label: 'موقع الشركة على الانترنت',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  types: {
    type: 'checkbox',
    label: 'نوع العمل',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  categories: {
    type: 'checkbox',
    label: 'التصنيف',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  addServices: {
    type: 'input',
    label: 'خدمات اضافية',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  phoneNo: {
    type: 'input',
    label: 'رقم الهاتف',
    valid: false,
    touched: true,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  }
}

class ProfForm extends Component {
  constructor(args) {
    super(args);
    this.state = {
      ...FIELDS
    }
    this.renderTextInputField = this.renderTextInputField.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    //name of the field
    const name = e.target.name;
    //value of the field (for a text field the text inside it, for a select the selected value)
    let value = e.target.value;
    value = Utils.hindiToArabicDigits(value)
    let fieldInfo = {...this.state[name]};


    //update state
    fieldInfo.value = value;
    let newState = {[name]: fieldInfo};
    this.setState(newState)
  }
  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(firstTimeFlag, validFlag) {
    if (firstTimeFlag) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  renderTextInputField(fieldName, label, placeHolder, touched, valid, errorMsg, helpMsg) {
    return (<FieldGroup
    name={fieldName}
    type="text"
    label={label}
    placeholder={placeHolder}
    onChange={this.handleChange}
    value={this.state[fieldName].value}
    help={
      touched ||
      valid
        ? helpMsg
        : errorMsg
    }
    validationState={this.validationState(
      touched,
      valid
    )}
  />);
  }
  /*
    render the field in a form based on an object that 
    describes the fields info. Note that currently we 
    do not render the fields in a specific order 
  */
  renderField(fieldConfig, fieldName) {
    
    if (fieldConfig.type === 'input'){
      return this.renderTextInputField(fieldName, fieldConfig.label, '', fieldConfig.touched, fieldConfig.valid, 
      fieldConfig.errorMessage, fieldConfig.helpMsg)
    }
    
  }

  render() {
    var loading = false;
    return (
      <div className="loginreg">
        <form
          onSubmit={event => this.authWithEmailPassword(event)}
          ref={form => {
            this.profForm = form;
          }}
        >
          <img src={bayty_icon} />
          <div className="loginregtitle">
            <h3>بيانات الحساب</h3>
          </div>
          {/* {loading ? (
            <Loading />
          ) : (
            <Collapse in={this.state.formStatusAlert.alert}>
              <Alert bsStyle={this.state.formStatusAlert.type}>
                {this.state.formStatusAlert.alertMsg
                  .split(",")
                  .filter(msg => msg.length > 0)
                  .map(msg => <div key={msg}>- {msg}</div>)}
              </Alert>
            </Collapse>
          )} */}
          { 
            _.map(FIELDS, this.renderField.bind(this))
            
          }
          
          {/* <Row>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={"col-lg-push-6; col-sm-push-6"}
            >
              
            </Col>
          </Row> */}
          <button type="submit">تحديث الحساب</button>
          <button type="submit">رجوع</button>
        </form>
      </div>
    );
  }
}

export default ProfForm;
