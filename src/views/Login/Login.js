import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Collapse, Alert, Col, Row } from "react-bootstrap"
import { app } from 'config/base'
import bayty_icon from 'assets/img/bayty_icon1.png';
import FirestoreServices from 'services/FirestoreServices';

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
          console.log("fetchProvidersForEmail")

          // sign in with email/password and return user object on success
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then((user) => {
        const { adminFlag } = this.props.location.state || { adminFlag: false };
        if (user && user.email) {
          FirestoreServices.readDBRecord('group', user.uid).then((value) => {
            const { admin } = value;
            if (adminFlag && !admin) {
              this.reportError('User is not admin.', true)
              return;
            }

            console.log('Autentication Passed successfully!')
            const { setCurrentUser } = this.props;

            setCurrentUser(user, admin);
            this.setState({
              redirect: true
            })
          })
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          this.reportError('كلمة السر غير صحيحة. ');
        } else if (errorCode === 'auth/email-already-in-use') {
          this.reportError('البريد الالكتروني مسجل مسبقا. نرجو استخدام عنوان آخر أو طلب استرداد كلمة سر في حال كانت كلمة السر مفقودة');
        } else if (errorCode === 'auth/invalid-email') {
          this.reportError('عنوان البريد الالكتروني غير صحيح');
        } else if (errorCode === 'auth/wrong-password') {
          this.reportError('كلمة السر غير صحيحة. ');
        } else {
          this.reportError("حدث خطأ غير معروف. نرجو ابلاغ الصيانة: " + errorCode + errorMessage);
        }
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }, adminFlag: false }
    const { redirect } = this.state

    if (redirect) {
      console.log('redirect to ', from)
      return (
        <Redirect to={from.pathname} />
      )
    }

    return (
      <div style={{ height: '100vh' }} className="loginreg">
        <form onSubmit={(event) => this.authWithEmailPassword(event)}
          ref={(form) => { this.loginForm = form }}>

          <div className="loginregtitle">
            <img src={bayty_icon} alt=""/>
            <h2 style={{ color: 'rgb(26,156,142)' }}>تسجيل الدخول </h2>
          </div>
          <Collapse in={this.state.formStatusAlert.alert}>
            <Alert
              bsStyle={this.state.formStatusAlert.type}
            >
              {this.state.formStatusAlert.alertMsg}
              {this.state.formStatusAlert.showRegisterLink
                ? <Link to="/registration">  انقر هنا للتسجيل كمستخدم جديد </Link>
                : null
              }
            </Alert>
          </Collapse>
          <Row>
            <Col lg={12} sm={12}>
            </Col>
            <Col sm={12} lg={12} >
              <div className="form-group" >
                <input id="inputEmail" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="عنوان البريد الالكتروني"></input>
              </div>
            </Col>

            <Col sm={12} lg={12}>
              <div className="form-group">
                <input id="inputPassword" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="كلمة السر"></input>
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <button type="submit" >تسجيل دخول</button>

            <LinkContainer to="/resetpassword" activeClassName="active" style={{ cursor: "pointer" }}>
              <p><span style={{ cursor: "pointer" }}> نسيت كلمة المرور؟ </span></p>
            </LinkContainer>

            <p > <span style={{ color: "black" }}>ليس لديك حساب؟</span>
              <LinkContainer to="/registration" activeClassName="active" style={{ cursor: "pointer" }}>
                <span >&nbsp; قم بالتسجيل</span>
              </LinkContainer></p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
