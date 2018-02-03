import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Collapse, Alert, Modal,Col,Row } from "react-bootstrap"
import { app } from '../base'
import bayty_icon from '../assets/img/bayty_icon1.png';
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

class Registration extends Component {
    render() {
        return (


            <div className="loginreg">
              <form>

               <div className="loginregtitle">
               <img src={bayty_icon}  />
            <h2 style={{color:'rgb(26,156,142)'}}>التسجيل</h2>
            </div>
            <LinkContainer to="/registerProf" activeClassName="active">
            <button type="submit" >
           تسجيل حساب تجاري
          </button>
          </LinkContainer>
          <LinkContainer to="/registerNormal" activeClassName="active">
          <button>
            تسجيل حساب شخصي
          </button>
          </LinkContainer>
          </form>
          </div>
           );
        }
      }

      export default Registration;
