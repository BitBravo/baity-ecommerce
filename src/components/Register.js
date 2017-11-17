import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
  ProgressBar
} from "react-bootstrap";
import Loading from "./Loading";
import { app } from "../base";

/*
This is the registration form for professional users.
It is uncontrolled react form.
It uses firebase email/password authentication.
*/
const loginStyles = {
  width: "90%",
  maxWidth: "415px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  marginTop: "50px",
  background: "#FFFFFF"
};

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

class Register extends Component {
  constructor() {
    super();
    this.formValidationStatus = {
      email: {
        valid: false,
        firstTime: true,
        errorMessage: ""
      },
      password1: {
        valid: false,
        firstTime: true,
        errorMessage: ""
      },
      password2: {
        valid: false,
        firstTime: true,
        errorMessage: ""
      },
      coName: {
        valid: false,
        firstTime: true,
        errorMessage: ""
      },
      phoneNo: {
        valid: false,
        firstTime: true,
        errorMessage: ""
      }
    };

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

    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.reportError = this.reportError.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validationState = this.validationState.bind(this);
    this.parseArabic = this.parseArabic.bind(this);
    this.resetValidation = this.resetValidation.bind(this);
  }

  reportError(msg) {
    this.setState({
      formStatusAlert: {
        alert: true,
        type: "danger",
        alertMsg: msg,
        showSuccessfulSubmit: false
      }
    });
  }

  //converts indian digits into arabic ١ -> 1, ٢ -> 2 ...etc
  parseArabic(str) {
    var result = str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
      return d.charCodeAt(0) - 1632;
    });
    // .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
    //   return d.charCodeAt(0) - 1776;
    // })
    return result;
  }

  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(firstTimeFlag, validFlag) {
    if (firstTimeFlag) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  resetValidation(formValidationStatus) {
    formValidationStatus.password1.valid = formValidationStatus.password2.valid = true;
    formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
    formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
      "";
    formValidationStatus.email.valid = true;
    formValidationStatus.email.firstTime = false;
    formValidationStatus.email.errorMessage = "";
    formValidationStatus.coName.valid = true;
    formValidationStatus.coName.firstTime = false;
    formValidationStatus.coName.errorMessage = "";
    formValidationStatus.phoneNo.valid = true;
    formValidationStatus.phoneNo.firstTime = false;
    formValidationStatus.phoneNo.errorMessage = "";
  }

  validateForm(
    email,
    password1,
    password2,
    coName,
    phoneNo,
    formValidationStatus
  ) {
    let validResult = {
      valid: false,
      errorMessage: ""
    };

    const emailPattern = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const companyNamePattern = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{3,30})$/i;
    const phoneNoPattern = /^(05)\d{8}$/;
    if (password1 !== password2) {
      formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
      formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
      formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
        "  كلمتي السر غير متطابقتين";
    }
    if (!passwordPattern.test(password1)) {
      formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
      formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
      formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
        "  يجب أن تكون كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف";
    }
    if (!emailPattern.test(email)) {
      formValidationStatus.email.valid = false;
      formValidationStatus.email.firstTime = false;
      formValidationStatus.email.errorMessage =
        "  البريد الالكتروني ليس عنوان صحيح";
    }
    if (!companyNamePattern.test(coName)) {
      formValidationStatus.coName.valid = false;
      formValidationStatus.coName.firstTime = false;
      formValidationStatus.coName.errorMessage =
        "  يجب أن لا يحتوي اسم الشركة على رموز غير معروفة";
    }
    if (!phoneNoPattern.test(phoneNo)) {
      formValidationStatus.phoneNo.valid = false;
      formValidationStatus.phoneNo.firstTime = false;
      formValidationStatus.phoneNo.errorMessage = "  رقم التلفون غير صالح";
    }
    validResult.valid =
      formValidationStatus.phoneNo.valid &&
      formValidationStatus.coName.valid &&
      formValidationStatus.email.valid &&
      formValidationStatus.password1.valid &&
      formValidationStatus.password2.valid;

    return validResult;
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    //first collect input values from user
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const password2 = this.password2Input.value;
    const coName = this.coNameInput.value;
    const phoneNo = this.parseArabic(this.phoneNoInput.value);

    //and assuming everything is valid
    let formValidationStatus = { ...this.formValidationStatus };
    this.resetValidation(formValidationStatus);
    //then validate the form and invalidate invalid inputs
    const validResult = this.validateForm(
      email,
      password,
      password2,
      coName,
      phoneNo,
      formValidationStatus
    );

    //and set the state based on result to render errors/acceptance
    this.setState({ formValidationStatus: formValidationStatus }, () => {
      //after settting the state, if form is locally valid then try to register the user
      if (validResult.valid) {
        this.setState({ loading: true }, () => {
          // create user (Returns non-null firebase.Promise containing non-null firebase.User)
          app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              if (user && user.email) {
                this.registerForm.reset(); //this works only cause this is not controlled
                this.props.setCurrentUser(user);
                this.setState({ redirect: true });
              }
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == "auth/weak-password") {
                formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
                formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
                formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
                  "  يجب أن تكون كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف";
                this.reportError(
                  "كلمة السر ضعيفة. يجب أن يكون طول كلمة السر ٨ أحرف على الأقل وأن تكون خليط من الأحرف والأرقام"
                );
              } else if (errorCode == "auth/email-already-in-use") {
                formValidationStatus.email.valid = false;
                formValidationStatus.email.firstTime = false;
                formValidationStatus.email.errorMessage =
                  "  البريد الالكتروني مسجل مسبقا";
                this.reportError(
                  "البريد الالكتروني مسجل مسبقا. نرجو استخدام عنوان آخر أو طلب استرداد كلمة سر في حال كانت كلمة السر مفقودة"
                );
              } else if (errorCode == "auth/invalid-email") {
                formValidationStatus.email.valid = false;
                formValidationStatus.email.firstTime = false;
                formValidationStatus.email.errorMessage =
                  "  عنوان البريد الالكتروني غير صحيح";
                this.reportError("عنوان البريد الالكتروني غير صحيح");
              } else {
                this.reportError(
                  "حدث خطأ غير معروف. نرجو ابلاغ الصيانة: " +
                    errorCode +
                    "  " +
                    errorMessage
                );
              }
              this.setState(
                { formValidationStatus: formValidationStatus },
                this.setState({ loading: false })
              );
            });
        }); //END setState loading
      } else {
        //report an error
        this.reportError("يوجد خطأ في تعبئة النموذج");
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to={from} />;
    }
    return (
      <div style={loginStyles}>
        {loading
        ? <Loading />
        : <Collapse in={this.state.formStatusAlert.alert}>
           <Alert bsStyle={this.state.formStatusAlert.type}>
             {this.state.formStatusAlert.alertMsg
               .split(",")
               .filter(msg => msg.length > 0)
               .map(msg => <div key={msg}>- {msg}</div>)}
           </Alert>
         </Collapse>
        }
        <form
          className="form-signin"
          onSubmit={event => this.authWithEmailPassword(event)}
          ref={form => {
            this.registerForm = form;
          }}
        >
          <h2 className="form-signin-heading">تسجيل حساب تجاري</h2>
          <hr />

          <FieldGroup
            id="inputEmail"
            type="text"
            label="البريد الالكتروني"
            placeholder="عنوان البريد الالكتروني"
            inputRef={input => {
              this.emailInput = input;
            }}
            name="email"
            help={
              this.state.formValidationStatus.email.firstTime ||
              this.state.formValidationStatus.email.valid
                ? "    نقدر خصوصية عملائنا ولن يتم مشاركة البريد الالكتروني مع أي جهة أخرى"
                : this.state.formValidationStatus.email.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.email.firstTime,
              this.state.formValidationStatus.email.valid
            )}
          />

          <FieldGroup
            id="inputPassword"
            type="password"
            label="كلمة السر"
            placeholder="كلمة السر"
            inputRef={input => {
              this.passwordInput = input;
            }}
            name="password"
            help={
              this.state.formValidationStatus.password1.firstTime ||
              this.state.formValidationStatus.password1.valid
                ? " كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف"
                : this.state.formValidationStatus.password1.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.password1.firstTime,
              this.state.formValidationStatus.password1.valid
            )}
          />

          <FieldGroup
            id="inputPassword2"
            type="password"
            label="تأكيد كلمة السر"
            placeholder="تأكيد كلمة السر"
            inputRef={input => {
              this.password2Input = input;
            }}
            name="password2"
            help={
              this.state.formValidationStatus.password2.firstTime ||
              this.state.formValidationStatus.password2.valid
                ? "يجب أن تتطابق كلمتي السر"
                : this.state.formValidationStatus.password2.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.password2.firstTime,
              this.state.formValidationStatus.password2.valid
            )}
          />

          <FieldGroup
            id="inputCoName"
            type="text"
            label="اسم المؤسسة أو الشركة"
            placeholder="اسم المؤسسة أو الشركة"
            inputRef={input => {
              this.coNameInput = input;
            }}
            name="coName"
            help={
              this.state.formValidationStatus.coName.firstTime ||
              this.state.formValidationStatus.coName.valid
                ? null
                : this.state.formValidationStatus.coName.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.coName.firstTime,
              this.state.formValidationStatus.coName.valid
            )}
          />

          <FieldGroup
            id="inputPhoneNo"
            type="text"
            label="رقم الجوال"
            placeholder="05XXXXXXXX"
            inputRef={input => {
              this.phoneNoInput = input;
            }}
            name="phoneNo"
            help={
              this.state.formValidationStatus.phoneNo.firstTime ||
              this.state.formValidationStatus.phoneNo.valid
                ? null
                : this.state.formValidationStatus.phoneNo.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.phoneNo.firstTime,
              this.state.formValidationStatus.phoneNo.valid
            )}
          />

          <button type="submit" className="btn btn-lg btn-primary btn-block">
            تسجيل
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
