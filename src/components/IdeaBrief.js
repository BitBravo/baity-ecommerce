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
@media only screen and (max-width: 767px) {
  width:15px;
  height:15px;}
  @media only screen and (max-width: 400px) {
    width:12px;
    height:12px;
  }
`
const IdeaNameCol = styled(Col)`
border-bottom:dotted 1px lightgray;
height:28px;
margin-top:3px;
@media only screen and (max-width: 500px) {
  height:18px;

}
`
const PaddingDiv = styled.div`
 font-size:95%;
 padding: 5px 5px 0 5px;
  height: 120px;
  line-height:22px;
  @media only screen and (max-width: 1199px) {
    line-height:22px;
    font-size:90%;
    padding: 5px 5px 0 5px;
    height: 120px;
    display:block;}
    @media only screen and (max-width: 623px) {
      line-height:16px;
      font-size:70%;
      padding: 5px 5px 0 5px;
      height: 100px;
      display:block;
      }
      @media only screen and (max-width: 500px) {
        display:block;
        padding: 5px 5px 0 5px;
        line-height:13px;
        font-size:60%;
        height:80px;
      }
`
const Description = styled.p`
display:block;
padding-top:40px;
padding-bottom:10px;
@media only screen and (max-width: 1199px) {
  display:none;}

  `
const MDescription = styled.p`
display:none;
@media only screen and (max-width: 1199px) {
  display:block;
  padding-top:40px;
  padding-bottom:10px;}
  @media only screen and (max-width: 500px) {
    display:none;}
  `
const SDescription = styled.p`
display:none;
@media only screen and (max-width: 500px) {
  display:block;
  padding-top:27px;
  padding-bottom:3px;
}
`

const MyThumbnailCol = styled(Col)`
padding-left:10px;
padding-right:10px;
padding-bottom:5px;
padding-top:5px;
@media only screen and (max-width: 767px) {
  padding-left:5px;
  padding-right:5px;
  padding-bottom:5px;
  padding-top:5px;
}
`

const MyThumbnailDiv = styled.div`
  font-size:15px;
  position: relative;
  box-shadow:0px 10px 10px rgb(233,233,233);
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin-bottom: 30px;
  &:hover{
    box-shadow:0px 0px 10px #6A6A6A;
    border:1px solid #6A6A6A;
    transition:all 0.5s ease-in-out;
    transform: scale(1.05, 1.05);
  }
  @media only screen and (max-width: 767px) {
    &:hover{
      transition:none;
      transform: none;}
      margin-bottom: 20px;
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
    imgUrl = idea.imagesTemp[0].thumbnail
    return (

      <MyThumbnailCol xs={6} md={4} sm={6} style={{float:'right'}}>
        <MyThumbnailDiv>
          <ImageContainer>
            <ImageDiv>
            <Link to={`/${idea.owner}/ideas/${idea.id}`}>
            {
            <PreviewImg style={{background:`url(${imgUrl})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center"}}
            />
          }
          {
          // <PreviewImg
          //   src={
          //     idea.images
          //       ? idea.images[0].thumbnail? idea.images[0].thumbnail : idea.images[0].large
          //       : "http://via.placeholder.com/243x243"
          //   }
          // />
        }
              {/* <img   src="http://via.placeholder.com/243x243" */}
            </Link>
            </ImageDiv>
          </ImageContainer>

          <PaddingDiv>
            <Link to={`/${idea.owner}/ideas/${idea.id}`} style={{color:'black'}}>
            <IdeaNameCol xs ={11} style={{paddingLeft:'0',paddingRight:'0'}}>
              <p style={{color:'black',fontFamily: 'dinarm',paddingRight:'1px'}}>
              {idea.name}
              </p>
              </IdeaNameCol>
             </Link>
             <IdeaNameCol xs ={1}  style={{padding:'0 0 15px 0'}}>
             <IconImg src={Idea} className="icons"/>
             </IdeaNameCol>
             <Description className="flex-text text-muted">{idea.desc.substring(0,105)}
               <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
               ... المزيد
               </Link>
             </Description>
             <MDescription className="flex-text text-muted">{idea.desc.substring(0,90)}
               <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
               ... المزيد
               </Link>
             </MDescription>
             <SDescription className="flex-text text-muted">{idea.desc.substring(0,60)}
               <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
               ... المزيد
               </Link>
             </SDescription>

             <div style={{display:'inline-block',position:'absolute',bottom:'0'}}>
                  <p > من:
                  <Link to={`/businessprofile/${idea.owner}`}style={{color:'rgb(26,156,142)'}}>
                  {idea.businessName}
                  </Link>
                </p>
                </div>

          </PaddingDiv>
        </MyThumbnailDiv>
      </MyThumbnailCol>

    );
  }
}

export default IdeaBrief;
