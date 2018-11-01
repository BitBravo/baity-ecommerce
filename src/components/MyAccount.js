import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import { app, base } from "../base";
import FirebaseServices from '../services/FirebaseServices';
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

class MyAccount extends Component {
  constructor() {
    super();
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {this.props.group === "prof" ?
          <div>
            <ProfileInfo currentUser={this.props.currentUser} />
            <ProductList
              thisUserOnly={true}
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
            <IdeaList
              thisUserOnly={true}
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
          </div>
          : <div>
            <NormalProfileInfo currentUser={this.props.currentUser} />
            <FavProducts
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
            <FavIdeas
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
          </div>
        }




      </div>
    );
  }
}

export default MyAccount;
