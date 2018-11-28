import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Alert, Modal, Col, Row, Button } from "react-bootstrap"
import { app } from 'config/base'
import bayty_icon from 'assets/img/bayty_icon1.png';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'


class PasswordResetter extends Component {
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


    this.resetPassword = this.resetPassword.bind(this)
    this.reportError = this.reportError.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.reportSuccess = this.reportSuccess.bind(this)

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

  reportSuccess(msg, registerLink = false) {
    this.setState({
      formStatusAlert: {
        alert: true,
        showRegisterLink: registerLink,
        alertMsg: msg,
        showSuccessfulSubmit: true
      }
    });
  }

  resetPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    app.auth().languageCode = 'ar';
    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          // create user
          this.reportError('الايميل المستخدم غير مسجل مسبقا.', true)
          //} else if (providers.indexOf("password") === -1) {
          // this means the user is registered using SSO so point him to SSO singin
        } else {
          // sign in with email/password and return user object on success
          app.auth().sendPasswordResetEmail(email)
          this.setState({ redirect: true })
        }
      })
      .then(() => {
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.reportError("حدث خطأ غير معروف. نرجو ابلاغ الصيانة: " + errorCode + errorMessage);
      })

  }

  render() {
    if (this.state.redirect)
      return (
        <Modal
          show={true}
          style={{ top: 300 }}
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{ color: 'green', width: '30px', height: '30px' }} />  تم ارسال ايميل لاستعادة كلمة المرور</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Link to="/">
              <Button style={{ margin: 'auto', display: 'block' }}>العودة للصفحة الرئيسية</Button>
            </Link>
          </Modal.Body>
        </Modal>
      );
    else
      return (
        <div className="loginreg">
          <form onSubmit={(event) => this.resetPassword(event)}
            ref={(form) => { this.loginForm = form }}>

            <div className="loginregtitle">
              <img src={bayty_icon} alt='' />
              <h2 style={{ color: 'rgb(26,156,142)' }}>استعادة كلمة المرور </h2>
            </div>
            <Collapse in={this.state.formStatusAlert.alert}>
              <Alert
                bsStyle={this.state.formStatusAlert.type}
              >
                {this.state.formStatusAlert.alertMsg}
                {this.state.formStatusAlert.showRegisterLink
                  ? <Link to="/register">  انقر هنا للتسجيل كمستخدم جديد </Link>
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
            </Row>

            <div className="form-group">
              <button type="submit" >ارسال</button>
            </div>

          </form>
        </div>

      )

  }

}

export default PasswordResetter
