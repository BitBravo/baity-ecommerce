import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  Col } from "react-bootstrap";
import styled from 'styled-components'
import Idea from 'assets/img/AddingIdea.png';
import EmptyHeart from 'assets/img/emptyHeart.png';

const TagDiv = styled.span`
position: absolute;
top:5px;
right: 0;
font-size:10px;
background-color:rgb(26,156,142);
color: white;
width: 70px;
height: 18px;
text-align:center;
`;

const IconImg = styled.img`
width:20px;
height:19px;
@media only screen and (max-width: 767px) {
  width:15px;
  height:15px;}
  @media only screen and (max-width: 400px) {
    width:12px;
    height:12px;
  }
`
const LikeImg = styled.img`
width:14px;
height:14px;
margin-right: 8px;
// @media only screen and (max-width: 767px) {
//   width:15px;
//   height:15px;}
//   @media only screen and (max-width: 400px) {
//     width:12px;
//     height:12px;
//   }
`

const PaddingDiv = styled.div`
 font-size:95%;
  padding-right: 10px;
  padding-left: 10px;
  height: auto;
  line-height:22px;
  @media only screen and (max-width: 1199px) {
  //  display:none;
  }
`;

// const MPaddingDiv = styled.div`
//   display:none;
//   @media only screen and (max-width: 1199px) {
//     line-height:20px;
//     font-size:90%;
//     padding: 0 5px 0 5px;
//     height: 120px;
//     display:block;}
//     @media only screen and (max-width: 623px) {
//       display:none;
//     }
// `;

// const SPaddingDiv = styled.div`
//   display:none;
//   @media only screen and (max-width: 623px) {
//     line-height:16px;
//     font-size:70%;
//     padding: 0 5px 0 5px;
//     height: 100px;
//     display:block;
//     }
//     @media only screen and (max-width: 500px) {
//       display:none;
// }
// `;

// const XSPaddingDiv = styled.div`
//   display:none;
//     @media only screen and (max-width: 500px) {
//       display:block;
//       padding: 0 5px 0 5px;
//       line-height:13px;
//       font-size:60%;
//       height:80px;
//     }
// `;

const MyThumbnailCol = styled(Col)`
padding-left:23.6px;
padding-right:23.6px;
// padding-bottom:5px;
// padding-top:5px;

@media only screen and (max-width: 1200px) {
  padding-left:15px !important;
  padding-right:15px !important;
  // padding-bottom:5px;
  // padding-top:5px;
}
`;

const MyThumbnailDiv = styled.div`
  font-size:15px;
  position: relative;
  box-shadow:0px 10px 10px rgb(233,233,233);
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 340px;
  height: 370px;
  &:hover{
    box-shadow:0px 0px 10px #6A6A6A;
    border:1px solid #6A6A6A;
    transition:all 0.5s ease-in-out;
    transform: scale(1.05, 1.05);
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    &:hover{
      transition:none;
      transform: none;}
      margin-bottom: 20px;
  }
`;
const PreviewImg = styled.div`
width:340px;
height:340px;
min-height: 200px;
background-size: cover !important;
@media only screen and (max-width: 767px) {
  width: 100%;
  height: auto;
  padding-top: 100%;
}
`;

const ImageDiv = styled.div`
  position:  relative;
`;
const IdeaDiv = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 50%;
height: 30%;
margin: auto;
text-align: center;
`;
const IdeaTitle = styled.h2`
  font-size: 36px;
  margin-top: 12px;
  font-weight: bold;
  color: white;
`
const IdeaImgDiv = styled.div`
width: 58px;
height: 58px;
width: 58px;
height: 58px;
background-color: #00A19A;
border-radius: 50%;
padding: 7px;
border: 1px solid #07a7d3;
margin: 0px auto;
text-align: center;
`;
const ImageContainer = styled.div`
  // width: 100%;
  // padding-top: 100%;
  position: relative;
`;

const DescriptionCol = styled(Col)`
padding-right:0;
padding-left:0;
padding-top:5px;
font-family: 'dinarm';
`;


class IdeaBrief extends Component {
  constructor() {
    super();
    // this.updateidea = this.updateidea.bind(this);
    this.state = {
      idea: {}
    };
  }

  //src="http://via.placeholder.com/243x243"
  render() {
    console.log(this.props)
    const idea = this.props.idea;
    let imgUrl = typeof idea === "object" && idea.images
      ? idea.images[0].thumbnail ? idea.images[0].thumbnail : idea.images[0].large
      : "http://via.placeholder.com/243x243";

    let cssStyle = this.props.styleWidth;
    const layoutClassName = cssStyle >= 8? `col-xs-12 col-sm-12 col-md-${cssStyle}` : 'col-xs-12 col-sm-6 col-md-4';

    const styles = cssStyle >= 8 ? { width: '100%'} : {}

    return (
      typeof idea === "object" ?
        <MyThumbnailCol className={layoutClassName} style={{ float: 'right' }} >
          <MyThumbnailDiv style={styles}>
          <ImageContainer>
            <ImageDiv>
              <Link to={`/${idea.owner}/ideas/${idea.id}`}>
                <PreviewImg
                  style={{
                    background: `url(${imgUrl})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    width: cssStyle>=8 ? '100%' : '',
                    }}>
                    <IdeaDiv>
                      <IdeaImgDiv>
                        <img src={Idea} style={{ width: "100%" }}/>
                      </IdeaImgDiv>
                      <IdeaTitle style={{}}>{idea.department}</IdeaTitle>
                    </IdeaDiv>
                </PreviewImg>
                  {/* <img   src="http://via.placeholder.com/243x243" */}
              </Link>
            </ImageDiv>
          </ImageContainer>
          {idea.price > 0
            ? null
            : <TagDiv> المنتج للعرض</TagDiv>
          }

          <PaddingDiv >
            <div style={{ display: 'block',  bottom: '0', height: '30px' }}>
                <Col xs={4} style={{ padding: '0px', textAlign: "left" }}>
                  {}
                  <LikeImg src={EmptyHeart} className="icons" />
              </Col>
              <p xs={8} style={{margin: '4px'}}> من:
                  <Link to={`/businessprofile/${idea.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {idea.businessName}
                </Link>
              </p>
            </div>
          </PaddingDiv>

          {/* <MPaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '35px' }}>

              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{idea.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${idea.owner}/ideas/${idea.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black' }}> {idea.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Idea} className="icons" />
              </Col>
            </div>

            <p style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              {idea.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${idea.owner}/ideas/${idea.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
              <p> من:
                  <Link to={`/businessprofile/${idea.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {idea.businessName}
                </Link>
              </p>
            </div>

          </MPaddingDiv>

          <SPaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '30px' }}>
              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{idea.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${idea.owner}/ideas/${idea.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black', padding: '0 5px 0 0' }}> {idea.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Idea} className="icons" /> </Col>
            </div>

            <p style={{ paddingTop: '5px' }}>
              {idea.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${idea.owner}/ideas/${idea.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
              <p > من:
                  <Link to={`/businessprofile/${idea.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {idea.businessName}
                </Link>
              </p>
            </div>

          </SPaddingDiv>

          <XSPaddingDiv > 
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '23px' }}>

              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{idea.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${idea.owner}/ideas/${idea.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black', padding: '0 5px 0 0' }}> {idea.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Idea} className="icons" /> </Col>
            </div>

            <p style={{ paddingTop: '3px' }}>
              {idea.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${idea.owner}/ideas/${idea.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
              <p > من:
                  <Link to={`/businessprofile/${idea.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {idea.businessName}
                </Link>
              </p>
            </div>
          </XSPaddingDiv>*/}
        </MyThumbnailDiv>
        </MyThumbnailCol>
        :
        ""
    );
  }
}


export default IdeaBrief;
