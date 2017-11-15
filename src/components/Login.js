import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Collapse, Alert, Modal } from "react-bootstrap"
import { app } from '../base'


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
          this.props.setCurrentUser(user)
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
      <div style={loginStyles}>
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
        <form className="form-signin" onSubmit={(event) => this.authWithEmailPassword(event)}
          ref={(form) => { this.loginForm = form }}>
         
          <div className="form-group">
          <label htmlFor="inputEmail">البريد الالكتروني</label>

          <input id="inputEmail"  className="form-control" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="عنوان البريد الالكتروني"></input>
          
          </div>
          <div className="form-group">
          <label htmlFor="inputPassword">كلمة السر</label>
            <input className="form-control" id="inputPassword" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="كلمة السر"></input>
          </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">تسجيل دخول</button>

          
        </form>
      </div>
    )
  }
}

export default Login