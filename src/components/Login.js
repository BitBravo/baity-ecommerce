import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Collapse, Alert, Modal,Col,Row } from "react-bootstrap"
import { app } from '../base'
import bayty_icon from '../assets/img/bayty_icon.png';
import { CSSTransition } from 'react-transition-group'
/*

This form uses firebase email/password authentication.
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
      uid: "testpro6@baity.com",
      displayName: null,
      photoURL: null,
      email: "testpro6@baity.com",
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


class Login extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      formStatusAlert: {
        alert: false,
        showRegisterLink: false,//when the email is wrong we show a link to the registration page
        type: "info", //indicates that we should show an alert msg due to form invalid
        alertMsg: "", //message shown when form can not be submitted cause form is not valid
      }
    }


    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.reportError = this.reportError.bind(this)
  }


  reportError(msg, registerLink = false) {
    this.setState({
      formStatusAlert: {
        alert: true,
        showRegisterLink: registerLink, 
        type: 'danger',
        alertMsg: msg,
        showSuccessfulSubmit: false
      }
    });
  }


  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          this.reportError('الايميل المستخدم غير مسجل مسبقا.', true)
        //} else if (providers.indexOf("password") === -1) {
          // this means the user is registered using SSO so point him to SSO singin
        } else {
          // sign in with email/password and return user object on success
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          //this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/account-exists-with-different-credential') {
          this.reportError('كلمة السر غير صحيحة. ');
        } else if (errorCode == 'auth/email-already-in-use') {
          this.reportError('البريد الالكتروني مسجل مسبقا. نرجو استخدام عنوان آخر أو طلب استرداد كلمة سر في حال كانت كلمة السر مفقودة');
        } else if (errorCode == 'auth/invalid-email') {
          this.reportError('عنوان البريد الالكتروني غير صحيح');
        } else if (errorCode == 'auth/wrong-password') {
          this.reportError('كلمة السر غير صحيحة. ');
        } else {
          this.reportError("حدث خطأ غير معروف. نرجو ابلاغ الصيانة: " + errorCode + errorMessage);
        }
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="loginreg">
   
      
       
        <form    onSubmit={(event) => this.authWithEmailPassword(event)}
          ref={(form) => { this.loginForm = form }}>
       
         <img src={bayty_icon}/>
         
         <div className="loginregtitle">
      
      <h3> تسجيل الدخول الى بيتي </h3>
      </div>
      <Row>
      <Col sm={12}  lg={6} className="col-lg-push-6">
      <Collapse in={this.state.formStatusAlert.alert}>
          <Alert
            bsStyle={this.state.formStatusAlert.type}
          >
            {this.state.formStatusAlert.alertMsg}
            {this.state.formStatusAlert.showRegisterLink
            ? <Link to="/register">  انقر هنا للتسجيل كمستخدم جديد </Link>
            :null
            }
          </Alert>
        </Collapse>
        </Col>
      <Col sm={12}  lg={6} className="col-lg-push-6">
          <div className="form-group" >
          <label htmlFor="inputEmail">البريد الالكتروني</label>

          <input id="inputEmail"  className="form-control" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="عنوان البريد الالكتروني"></input>
          
          </div>
          </Col>
         
      <Col sm={12}  lg={6} className="col-lg-pull-6" >
          <div className="form-group">
          <label htmlFor="inputPassword">كلمة السر</label>
            <input className="form-control" id="inputPassword" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="كلمة السر"></input>
          </div>
          </Col>
          </Row>
          <div className="form-group">
          <button type="submit" >تسجيل دخول</button>
          <p><span Style="cursor:pointer"> نسيت كلمة المرور؟ </span></p>
          <p > <span Style="color:black">ليس لديك حساب؟</span> 
          <LinkContainer to="/register">
          <span Style="cursor:pointer">&nbsp; قم بالتسجيل</span>
          </LinkContainer></p>
          </div>
          
        </form>
      </div>
      
    )
  }
}

export default Login