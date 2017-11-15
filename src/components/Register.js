import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Collapse, Alert, Modal } from "react-bootstrap"
import { app } from '../base'

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

class Register extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      formStatusAlert: {
        alert: false,
        type: "info", //indicates that we should show an alert msg due to form invalid
        alertMsg: "", //message shown when form can not be submitted cause form is not valid
      }
    }

    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.reportError = this.reportError.bind(this)
  }

  reportError(msg) {
    this.setState({
      formStatusAlert: {
        alert: true,
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
    const password2 = this.password2Input.value
    if (password === password2){
      
      // create user (Returns non-null firebase.Promise containing non-null firebase.User)
      app.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user && user.email) {
          this.registerForm.reset()//this works only cause this is not controlled
          this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      }).catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                this.reportError('كلمة السر ضعيفة. يجب أن يكون طول كلمة السر ٨ أحرف على الأقل وأن تكون خليط من الأحرف والأرقام');
              } else if (errorCode == 'auth/email-already-in-use') {
                this.reportError('البريد الالكتروني مسجل مسبقا. نرجو استخدام عنوان آخر أو طلب استرداد كلمة سر في حال كانت كلمة السر مفقودة');
              } else if (errorCode == 'auth/invalid-email') {
                this.reportError('عنوان البريد الالكتروني غير صحيح');
              } else {
                this.reportError("حدث خطأ غير معروف. نرجو ابلاغ الصيانة: " + errorCode + "  " + errorMessage);
              }
            });
    } else {//passwords are not the same
      this.reportError("كلمتي السر غير متطابقتين");
    }
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
          </Alert>
        </Collapse>
        <form className="form-signin" onSubmit={(event) => this.authWithEmailPassword(event)}
          ref={(form) => { this.registerForm = form }}>
          <h2 className="form-signin-heading">مرحبا بك معنا في بيتي</h2>
          <hr/>
          <div className="form-group">
          <label htmlFor="inputEmail">البريد الالكتروني</label>
          <input id="inputEmail"  className="form-control" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="عنوان البريد الالكتروني"></input>
          <small id="emailHelp" className="form-text text-muted">نقدر خصوصية عملائنا ولن يتم مشاركة البريد الالكتروني مع أي جهة أخرى</small>
          </div>
          <div className="form-group">
          <label htmlFor="inputPassword">كلمة السر</label>
            <input className="form-control" id="inputPassword" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="كلمة السر"></input>
            <small id="passwordHelpInline" className="text-muted">
      كلمة السر خليط من الحروف والأرقام بطول لا يقل عن ٨ أحرف
    </small>

          </div>
          
          <div className="form-group">
          <label htmlFor="inputPassword2">تأكيد كلمة السر</label>
            <input className="form-control" id="inputPassword2" name="password" type="password" ref={(input) => {this.password2Input = input}} placeholder="تأكيد كلمة السر"></input>
         </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">تسجيل</button>
          
        </form>
      </div>
    )
  }
}

export default Register