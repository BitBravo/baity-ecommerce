import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import { Image, Col, Thumbnail, Button, Card, Row } from "react-bootstrap";
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import {MdWeekend} from 'react-icons/lib/md';
import Idea from '../assets/img/Selected-idea.png';

const IconImg = styled.img`
width:20px;
 height:20px;
`
const PaddingDiv = styled.div`
  padding-right: 5px;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 5px;
  height: 125px;
`

const MyThumbnailDiv = styled.div`
  position: relative;
  box-shadow:0px 10px 10px rgb(233,233,233);
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin-bottom: 50px;
  &:hover{
    box-shadow:0px 0px 10px #6A6A6A;
    border:1px solid #6A6A6A;
    transition:all 0.5s ease-in-out;
    transform: scale(1.05, 1.05);
  }
`


const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageDiv = styled.div`
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
`;
class IdeaBrief extends Component {
  constructor() {
    super();
    this.state = {
      idea: {}
    };
  }

  //src="http://via.placeholder.com/243x243"
  render() {
    const idea = this.props.idea;

    var imgUrl;
    idea.images
    ? imgUrl = idea.images[0].thumbnail? idea.images[0].thumbnail : idea.images[0].large
    : imgUrl = "http://via.placeholder.com/243x243"

    return (

      <Col xs={12} md={4} sm={6} style={{float:'right'}}>
        <MyThumbnailDiv>
          <ImageContainer>
            <ImageDiv>
            <Link to={`/${idea.owner}/ideas/${idea.id}`}>
            <PreviewImg style={{background:`url(${imgUrl})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center"}}
            />

              {/* <img   src="http://via.placeholder.com/243x243" */}
            </Link>
            </ImageDiv>
          </ImageContainer>

          <PaddingDiv>
            <Link to={`/${idea.owner}/ideas/${idea.id}`} style={{color:'black',fontWeight:'900'}}>
            <Col xs ={12} md={12} style={{borderBottom:'dotted 1px lightgray',marginBottom:'10px'}} >
              <h5><IconImg src={Idea} className="icons"/> {idea.name} </h5>
              </Col>
             </Link>
             <p className="flex-text text-muted">{idea.desc.substring(0,50)}
               <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
               ... المزيد
               </Link>
             </p>
             <div style={{display:'inline-block',position:'absolute',bottom:'0'}}>
                  <h6 > من:
                  <Link to={`/businessprofile/${idea.owner}`}style={{color:'rgb(26,156,142)'}}>
                  {idea.businessName}
                  </Link>
                </h6>
                </div>
          </PaddingDiv>
        </MyThumbnailDiv>
      </Col>

    );
  }
}

export default IdeaBrief;
