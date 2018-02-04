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
This is the registration form for normal users.
It is uncontrolled react form.

It uses firebase email/password authentication.
Here is how a firebase.auth().user object looks like:
 {
  uid: "3YG2PxiXSleAspmGa0Mqzi5cBCC2",
  displayName: null,
  photoURL: null,
  email: "testpro6@baity.com",
  emailVerified: false,
  phoneNumber: null,
  isAnonymous: false,
  providerData: [
    {
      uid: "testnormal6@baity.com",
      displayName: null,
      photoURL: null,
      email: "testnormal6@baity.com",
      phoneNumber: null,
      providerId: "password"
    }
  ],
  apiKey: "AIzaSyBhKqdEYDnZdPpGjAZVt-68CbtGiwimFZQ",
  appName: "[DEFAULT]",
  authDomain: "bayty-246cc.firebaseapp.com",
  stsTokenManager: {
    apiKey: "AIzaSyBhKqdEYDnZdPpGjAZVt-68CbtGiwimFZQ",
    refreshToken:
      "APWA_kqFHiupCN8QVBw8iYU2IVr69scVIBL2LCEokSi13jxxqfKyO3v5xcSPRFMA5KoMm1oDww_rxAkGMd-O2fWowIMo0doG8MuPsp0H8cgkhcvs22B48dLfkpozf0BhZQNw-sY4wqteoWOsWIHqXCZqjZ3SJ-46bLw36NZSQLMzVR_obYTP1eg_WrwNMLD_tmqebRAwLLm3mLrXB2qTJmpD63fIv7aVCQ",
    accessToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzYTAzYmRkNjBhNWU1NTFkY2RiZjkyMDVkOTc2YTAzMjU1OWYxOWMifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmF5dHktMjQ2Y2MiLCJhdWQiOiJiYXl0eS0yNDZjYyIsImF1dGhfdGltZSI6MTUxMTAyNjk4MSwidXNlcl9pZCI6IjNZRzJQeGlYU2xlQXNwbUdhME1xemk1Y0JDQzIiLCJzdWIiOiIzWUcyUHhpWFNsZUFzcG1HYTBNcXppNWNCQ0MyIiwiaWF0IjoxNTExMDI2OTgxLCJleHAiOjE1MTEwMzA1ODEsImVtYWlsIjoidGVzdHBybzZAYmFpdHkuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3Rwcm82QGJhaXR5LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.PFWAqqJWZwqZOut903_y9TzRrvNey22JlHBaYbywCEZTlfsoZzDs3yPhQuF-pFJqemH79fwEKwfCSEPlUsQVoeENLtmgSSLyxtBQgYZVuWK-A1HnS7aQXMj__HO8tGR5vf3zzulEbkHysvs-NM8cb7Jqr8XvLkwJRswONrdn4_uUlCqzkSr8tc0vLZaFA-D6x5TN6CC7RLhTV6DYwKIyhpOD51yIH3P7ijdr1h_V_-Zo4yDVPazPhILY4nA1XV21O-kcHhSV0dbsoiwypHl-v0BCZiDgCiBZYXKdd_vdYJsM0yWh6V9UqjF8n7Tr6vRp3KJg9UePdsZe-AlVidTQFg",
    expirationTime: 1511030581439
  },
  redirectEventId: null,
  lastLoginAt: "1511026933000",
  createdAt: "1511026110000"
};

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

class RegisterNormal extends Component {
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
      userName: {
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
    formValidationStatus.userName.valid = true;
    formValidationStatus.userName.firstTime = false;
    formValidationStatus.userName.errorMessage = "";
    formValidationStatus.phoneNo.valid = true;
    formValidationStatus.phoneNo.firstTime = false;
    formValidationStatus.phoneNo.errorMessage = "";
  }

  validateForm(
    email,
    password1,
    password2,
    userName,
    phoneNo,
    formValidationStatus
  ) {
    let validResult = {
      valid: false,
      errorMessage: ""
    };


    if (password1 !== password2) {
      formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
      formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
      formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
        "  كلمتي السر غير متطابقتين";
    }
    if (!FormUtils.passwordValid(password1)) {
      formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
      formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
      formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
        FormUtils.passwordErrorMsg;
    }
    if (!FormUtils.emailValid(email)) {
      formValidationStatus.email.valid = false;
      formValidationStatus.email.firstTime = false;
      formValidationStatus.email.errorMessage =
        FormUtils.emailErrorMsg;
    }
    if (!FormUtils.userNameValid(userName)) {
      formValidationStatus.userName.valid = false;
      formValidationStatus.userName.firstTime = false;
      formValidationStatus.userName.errorMessage =
        FormUtils.userNameErrorMsg;
    }
    if (!FormUtils.phoneNoValid(phoneNo)) {
      formValidationStatus.phoneNo.valid = false;
      formValidationStatus.phoneNo.firstTime = false;
      formValidationStatus.phoneNo.errorMessage = FormUtils.phoneNoErrorMsg;
    }
    validResult.valid =
      formValidationStatus.phoneNo.valid &&
      formValidationStatus.userName.valid &&
      formValidationStatus.email.valid &&
      formValidationStatus.password1.valid &&
      formValidationStatus.password2.valid;

    return validResult;
  }

  /*
  IMPORTANT: currently we first register a user then we add that user to the DB.
  There is a possibility that a user gets registered by adding him to the DB
  fails. We do not currently handle such failure and do not know what are the
  implications.
  For more info on user management in firebase see:
  (https://firebase.google.com/docs/auth/web/manage-users)
*/

  authWithEmailPassword(event) {
    event.preventDefault();
    //first collect input values from user
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const password2 = this.password2Input.value;
    const userName = this.userNameInput.value;
    const phoneNo = this.parseArabic(this.phoneNoInput.value);

    //and assuming everything is valid
    let formValidationStatus = { ...this.formValidationStatus };
    this.resetValidation(formValidationStatus);
    //then validate the form and invalidate invalid inputs
    const validResult = this.validateForm(
      email,
      password,
      password2,
      userName,
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
              //user: user.email, user.displayName, user.photoURL, user.emailVerified, user.uid
              //Note that user.uid is unique
              if (user && user.email) {

                  // add user to DB
                  FirebaseServices.createNormalUser(user, phoneNo, userName)
                  .then( () => {
                    this.registerForm.reset(); //this works only cause this is not controlled

                    //Should we set the user here or just listen to auth.onAuthStateChanged in App.js
                    //this.props.setCurrentUser(user);

                    this.setState({ redirect: true });
                  })
                  .catch( error => {
                    //User is registered into firebase.auth in DB but not in firebase.database 'users'/'group'
                    //This should be very rare and currently we just report an error without handling it
                    console.log('adding user to DB failed');
                    this.setState({ loading: false}, () =>
                        this.reportError("حدث خطأ داخلي في النظام" + " User is signed up but not added to DB. Here is firebase error: " + error.code + " " + error.message));

                  })
              }
            })
            .catch( error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === "auth/weak-password") {
                formValidationStatus.password1.valid = formValidationStatus.password2.valid = false;
                formValidationStatus.password1.firstTime = formValidationStatus.password2.firstTime = false;
                formValidationStatus.password1.errorMessage = formValidationStatus.password2.errorMessage =
                  "  يجب أن تكون كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف";
                this.reportError(
                  "كلمة السر ضعيفة. يجب أن يكون طول كلمة السر ٨ أحرف على الأقل وأن تكون خليط من الأحرف والأرقام"
                );
              } else if (errorCode === "auth/email-already-in-use") {
                formValidationStatus.email.valid = false;
                formValidationStatus.email.firstTime = false;
                formValidationStatus.email.errorMessage =
                  "  البريد الالكتروني مسجل مسبقا";
                this.reportError(
                  "البريد الالكتروني مسجل مسبقا. نرجو استخدام عنوان آخر أو طلب استرداد كلمة سر في حال كانت كلمة السر مفقودة"
                );
              } else if (errorCode === "auth/invalid-email") {
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
      <div className="loginreg">

      <form onSubmit={event => this.authWithEmailPassword(event)}
        ref={form => { this.registerForm = form; }}  >

      <div className="loginregtitle">
      <img className="img-responsive" src={bayty_icon}/>
        <h2 style={{color:'rgb(26,156,142)'}} >التسجيل </h2>
        </div>
        {loading ? (
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
        )}
        <Row>




     <Col sm={6}  md={6} lg={6} className={"col-lg-push-6; col-sm-push-6"}>
          <FieldGroup
            id="inputEmail"
            type="email"
            label="البريد الالكتروني"
            placeholder="عنوان البريد الالكتروني"
            inputRef={input => {
              this.emailInput = input;
            }}
            name="email"
            help={
              this.state.formValidationStatus.email.firstTime ||
              this.state.formValidationStatus.email.valid
                ? "نقدر خصوصية عملائنا ولن يتم مشاركة البريد الالكتروني مع أي جهة أخرى"
                : this.state.formValidationStatus.email.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.email.firstTime,
              this.state.formValidationStatus.email.valid
            )}
          />
          </Col>
          <Col sm={6}  md={6} lg={6} className={"col-lg-pull-6; col-sm-pull-6"}>
          <FieldGroup
            id="inputUserName"
            type="text"
            label="الاسم"
            placeholder="الاسم"
            inputRef={input => {
              this.userNameInput = input;
            }}
            name="userName"
            help={
              this.state.formValidationStatus.userName.firstTime ||
              this.state.formValidationStatus.userName.valid
                ? null
                : this.state.formValidationStatus.userName.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.userName.firstTime,
              this.state.formValidationStatus.userName.valid
            )}
          />
 </Col>
          </Row>
        <Row>

         <Col  sm={6} md={6} lg={6} className={"col-lg-push-6; col-sm-push-6"}>
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
                ? "كلمة السر خليط من الحروف اللاتينية والأرقام بطول لا يقل عن ٨ أحرف"
                : this.state.formValidationStatus.password1.errorMessage
            }
            validationState={this.validationState(
              this.state.formValidationStatus.password1.firstTime,
              this.state.formValidationStatus.password1.valid
            )}
          />
</Col>
<Col sm={6}  md={6} lg={6} className={"col-lg-pull-6; col-sm-pull-6"}>
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
          </Col>
</Row>

<Row>
<Col  sm={6} md={6} lg={6} className={"col-lg-push-6; col-sm-push-6"}>
          <FieldGroup  pullright
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
          </Col>
          </Row>
          <button type="submit" >
            تسجيل
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterNormal;
