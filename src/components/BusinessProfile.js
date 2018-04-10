import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import { app, base } from "../base";
import ProductList from "./ProductList";
import IdeaList from "./IdeaList";
import ProfileInfo from "./ProfileInfo";
import NormalProfileInfo from "./NormalProfileInfo";
import FavProducts from "./FavProducts";
import FavIdeas from "./FavIdeas";

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

class BusinessProfile extends Component {


  constructor(){
    super();
  }

  render(){
    return (
      <div>
         <ProfileInfo user={true} currentUser={this.props.match.params.id}/>
         <ProductList
          user={true}
          thisUserOnly={true}
          shortList={true}
          currentUser={this.props.match.params.id}
          group={this.props.group}
         />
         <IdeaList
          user={true}
          thisUserOnly={true}
          shortList={true}
          currentUser={this.props.match.params.id}
          group={this.props.group}
         />
       </div>

  );
  }
}

export default BusinessProfile;
