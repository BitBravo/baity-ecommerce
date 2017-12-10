import React, { Component } from "react";
import ReactDOM from 'react-dom'
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
  Col, 
  Image
} from "react-bootstrap";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import FirebaseServices from "./FirebaseServices";
import Loading from "./Loading";
import { app } from "../base";
import FormUtils from './FormUtils'
import bayty_icon from '../assets/img/bayty_icon.png';
import logo_placeholder from '../assets/img/logo-placeholder.jpg';


function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl  {...props} />
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
      style={{paddingTop: '2px'}}
    >
      {props.options.map(opt => {        
        return (
          <option key={opt.key} value={opt.value}>
            {opt.value}
          </option>
        );
      })}
    </FormControl>
  </FormGroup>
);

const FIELDS = {
  bussName: {
    type: 'text',
    label: 'اسم الشركة أو المؤسسة',
    valid: false,
    touched: false,
    required: true,
    errorMessage: FormUtils.bussNameErrorMsg,
    helpMsg: "", 
    value: "",
    onChangeValidation: FormUtils.bussNameValid
  },
  city: {
    type: 'select',
    label: 'مقر الشركة أو المؤسسة',
    valid: true,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "", 
    value: "الرياض",
    options: FormUtils.BusinessProfileOptions.cities.map( (city) => {
      return {key: city.id, value: city.name_ar};
    })
  },
  phoneNo: {
    type: 'tel',
    label: 'رقم الهاتف',
    placeholder: '05XXXXXXXX',
    valid: false,
    touched: false,
    required: true,
    errorMessage: FormUtils.phoneNoErrorMsg,
    helpMsg: "", 
    value: "",
    onChangeValidation: FormUtils.phoneNoValid
  },
  logo: {
    type: 'image',
    label: 'لوقو الشركة' ,
    valid: false,
    touched: false,
    required: false,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
  bussDesc: {
    type: 'textarea',
    label: 'نبذة عن الشركة',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussDescErrorMsg,
    helpMsg: "", 
    value: "",
    onChangeValidation: FormUtils.bussDescValid
  },
  website: {
    type: 'text',
    label: 'موقع الشركة على الانترنت',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussWebsiteErrorMsg,
    helpMsg: "", 
    value: "",
    onChangeValidation: FormUtils.bussWebsiteValid
  },
  types: {
    type: 'checkbox',
    label: 'نوع العمل',
    valid: false,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "", 
    value: [],
    options: FormUtils.BusinessProfileOptions.businessTypes
  },
  categories: {
    type: 'checkbox',
    label: 'التصنيف',
    valid: false,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "", 
    value: [],
    options: FormUtils.BusinessProfileOptions.businessCategories
  },
  addServices: {
    type: 'text',
    label: 'خدمات اضافية',
    valid: false,
    touched: false,
    required: false,
    errorMessage: "",
    helpMsg: "", 
    value: ""
  },
}

class ProfForm extends Component {
  constructor(args) {
    super(args);
    this.state = {
      FIELDS: {...FIELDS},
      formStatusAlert: {
        alert: false,
        type: "info",
        alertMsg: "",
        showSuccessfulSubmit: false
      }
    }
    this.updateState = this.updateState.bind(this);
    this.renderInputField = this.renderInputField.bind(this);
    this.renderTextareaField = this.renderTextareaField.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderCheckboxFieldGroup = this.renderCheckboxFieldGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  updateState(fieldInfo, fieldName){
    let newStateFields = {FIELDS: {...this.state.FIELDS}};
    newStateFields.FIELDS[fieldName] = fieldInfo
    this.setState(newStateFields)
  }

  validateField(name, value){
    let fieldData = {...this.state.FIELDS[name]};


    //update state
    fieldData.value = value;
    fieldData.touched = true;
    if (FIELDS[name].onChangeValidation)
      fieldData.valid = FIELDS[name].onChangeValidation(value)? true: false;
    else
      fieldData.valid = true;
    return fieldData;
    
  }

  handleChange(e) {
    //name of the field
    const name = e.target.name;
    //value of the field (for a text field the text inside it, for a select the selected value)
    let value = e.target.value;
    value = FormUtils.hindiToArabicDigits(value)
    let fieldData = this.validateField(name, value);
    this.updateState(fieldData, name)
  }

  handleCheckboxChange(...args) {
    const name = args[2]
    const value = args[0]//an array of selected options
    let fieldInfo = {...this.state.FIELDS[name]};
    fieldInfo.value = value
    this.updateState(fieldInfo, name)    
  }

  handleFileUpload( e ) {
    e.preventDefault();
  
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imgFile: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  
   
  
  validateForm(){
    //first validate field and show errors
    let newValidationState = _.reduce(this.state.FIELDS, 
                              (newState, fieldData, fieldName) => { //result, value, key
                                let newFieldData = this.validateField(fieldName, fieldData.value);
                                newState[fieldName] = newFieldData;
                                return newState;
                              }, 
                              {});
    this.setState({FIELDS: newValidationState})
    //then compute form validation
    let formValid  = _.reduce(this.state.FIELDS, 
                          (formValid, field) => { //result, value, key 
                            console.log(formValid)
                            console.log(field)
                            if (field.type === 'checkbox' && field.required)
                              return formValid && field.value.length > 0;
                            else if (['text', 'tel', 'textarea'].includes(field.type) && !field.required && field.value.length === 0)
                              return formValid;
                            else
                              return formValid && (field.valid || !field.required); 
                          }, 
                          true);
    console.log('done validating form')
    console.log(formValid)
    return formValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()){
      console.log('*************form-valid*************')
      //update
    } else {
      this.setState({
        formStatusAlert: {
          alert: true,
          type: "danger",
          alertMsg: " عذرا ! يجب تعبئة النموذج كاملا مع الصورة بحيث تكون البيانات المعطاة صحيحة حسب المطلوب",
          showSuccessfulSubmit: false
        }
      })
      ReactDOM.findDOMNode(this).scrollTop = 0;
    }
  }

  

  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(touched, validFlag, required, value) {
    if (!touched || (!required && value.length === 0 )) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  renderInputField(fieldConfig, fieldName) {
    return (<FieldGroup
    key={fieldName}
    name={fieldName}
    componentClass='input'
    type={fieldConfig.type || null}
    label={fieldConfig.label}
    placeholder={fieldConfig.placeholder || null}
    onChange={this.handleChange}
    value={this.state.FIELDS[fieldName].value}
    help={
      !fieldConfig.touched || (!fieldConfig.required && fieldConfig.value.length === 0 ) ||
      fieldConfig.valid  
        ? fieldConfig.helpMsg
        : fieldConfig.errorMessage
    }
    validationState={this.validationState(
      fieldConfig.touched,
      fieldConfig.valid,
      fieldConfig.required,
      fieldConfig.value
    )}
  />);
  }
  renderTextareaField(fieldConfig, fieldName) {
    return (<FieldGroup
    key={fieldName}
    name={fieldName}
    componentClass='textarea'
    label={fieldConfig.label}
    placeholder={fieldConfig.placeholder || ''}
    onChange={this.handleChange}
    value={this.state.FIELDS[fieldName].value}
    help={
      !fieldConfig.touched || (!fieldConfig.required && fieldConfig.value.length === 0 ) ||
      fieldConfig.valid
        ? fieldConfig.helpMsg
        : fieldConfig.errorMessage
    }
    validationState={this.validationState(
      fieldConfig.touched,
      fieldConfig.valid,
      fieldConfig.required,
      fieldConfig.value
    )}
  />);
  }
  renderSelectField(fieldConfig, fieldName) {
    return (<SelectGroup
      key={fieldName}
      name={fieldName}
      componentClass='select'
      label={fieldConfig.label}
      onChange={this.handleChange}
      options={fieldConfig.options}
      selectedOption={this.state.FIELDS[fieldName].value}    
    />);
  }
  renderCheckboxFieldGroup(fieldConfig, fieldName) {
    return (
      <FormGroup key={'formGroup'+fieldName}>
        <ControlLabel key={'label'+fieldName} className="border-bottom-1" style={{marginTop: "30px", marginBottom: "5px"}}>
          {fieldConfig.label}
        </ControlLabel>
        <hr style={{marginTop: "10px"}}/>
        <CheckboxGroup
        key={'formgroup'+fieldName}
        
        name={fieldName}
        value={this.state.FIELDS[fieldName].value}
        onChange={this.handleCheckboxChange}>
          <Row style={{display: 'flex', flexWrap: 'wrap'}} key={'row'+fieldName}>
          {
            fieldConfig.options.map((checkbox) => { 
              return (
                  <Col key={"Col"+checkbox[0]} xs={6} sm={4}>
                    <label className="form-check-label"><Checkbox  className="form-check-input form-control-lg" value={checkbox[1]} key={checkbox[0]} />
                      {'  ' +checkbox[1]}
                    </label>
                  </Col>
              )
            })
          }
          </Row>
        </CheckboxGroup>   
        <hr />
      </FormGroup>
      
    );
  }

  /*
    render the field in a form based on an object that 
    describes the fields info. Note that currently we 
    do not render the fields in a specific order 
  */
  renderField(fieldConfig, fieldName) {
    
    if (['text', 'tel'].includes(fieldConfig.type)){
      return this.renderInputField(fieldConfig, fieldName )
    } else if(fieldConfig.type === 'textarea') {
      return this.renderTextareaField(fieldConfig, fieldName )
    } else if(fieldConfig.type === 'select') {
      return this.renderSelectField(fieldConfig, fieldName )
    } else if(fieldConfig.type === 'checkbox') {
      return this.renderCheckboxFieldGroup(fieldConfig, fieldName)
    }
    
  }

  render() {
    console.log(this.state);
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
          { loading ? (
            <Loading />
          ) : (
            <Collapse in={this.state.formStatusAlert.alert}>
              <Alert bsStyle={this.state.formStatusAlert.type}>
                {this.state.formStatusAlert.alertMsg
                  }
              </Alert>
            </Collapse>
          )} 
          <Row>
            <Col lg={12} >
            
              {this.state.imagePreviewUrl
              ? <Image style={{borderRadius: '50%', width: '200px', height: '200px', margin: '5px auto'}} src={this.state.imagePreviewUrl}  alt="logo" circle responsive /> 
              : <Image style={{borderRadius: '50%', width: '200px', height: '200px', margin: '5px auto'}} src={logo_placeholder} alt="logo" circle responsive />
              }
            
            </Col>
            </Row>
            <Row>
              <Col lg={12}>
              <div style={{margin: '10px auto 30px', textAlign: 'center'}}>
              <label htmlFor="profile_pic"><span style={{ color: 'green'}}>+&nbsp;</span>اضف شعار الشركة&nbsp;&nbsp;</label>
              <input type="file" id="profile_pic" name="profile_pic"
          accept=".jpg, .jpeg, .png" style={{opacity: 0}} onChange={this.handleFileUpload.bind(this)} />
              </div>
              </Col>
              </Row>  
          
          

          { 
            _.map(this.state.FIELDS, this.renderField.bind(this))
            
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
          <button type="submit" onClick={this.handleSubmit}>تحديث الحساب</button>
          <button type="submit">رجوع</button>
        </form>
      </div>
    );
  }
}

export default ProfForm;
