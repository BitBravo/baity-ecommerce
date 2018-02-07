import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import { app, base } from "../base";
import FirebaseServices from './FirebaseServices';
import ProductList from "./ProductList";
import IdeaList from "./IdeaList";
import ProfileInfo from "./ProfileInfo";

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
  Alert, Modal, ProgressBar
} from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import bayty_icon from '../assets/img/bayty_icon.png';
import ImagePreviewsContainer from './ImagePreviewsContainer'
import styled from 'styled-components'
import _ from 'lodash'
import MyProgressBar from './MyProgressBar'

class MyAccount extends Component {
  constructor(){
    super();
  }

  componentWillMount(){

  }

  componentWillUnmount(){

  }

  render(){
    return (
      <div>
      {this.props.group === "prof"?
       <ProfileInfo currentUser={this.props.currentUser}/>
       : null}
       <ProductList thisUserOnly={true} shortList={true} currentUser={this.props.currentUser}/>
       <IdeaList thisUserOnly={true} shortList={true} currentUser={this.props.currentUser}/>
     </div>
  );
  }
}

export default MyAccount;
