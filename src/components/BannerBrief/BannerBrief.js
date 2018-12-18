import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import styled from 'styled-components';
import product from 'assets/img/Selected-product.png';
import EmptyHeart from 'assets/img/emptyHeart.png';
import './style.css';
import { relative } from "path";
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
  height: 120px;
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
// padding-left:10px;
// padding-right:10px;
// padding-bottom:5px;
// padding-top:5px;
@media only screen and (max-width: 1200px) {
  padding: 0px !important;
  // padding-left:5px;
  // padding-right:5px;
  // padding-bottom:5px;
  // padding-top:5px;
}
@media only screen and (max-width: 767px) {
  padding-left:15px !important;
  padding-right:15px !important;
  // padding-bottom:5px;
  // padding-top:5px;
}
`;

const MyThumbnailSDiv = styled.div`
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

const MyThumbnailLDiv = styled.div`
  font-size:15px;
  position: relative;
  box-shadow:0px 10px 10px rgb(233,233,233);
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin: 0px auto;
  margin-left: 8.328;
  margin-right: 8.328;
  // width: 680px;
  height: 185px;
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

const PreviewSImg = styled.div`
width:340px;
height:370px;
min-height: 200px;
background-size: cover !important;
@media only screen and (max-width: 767px) {
  width: 100%;
  height: auto;
  padding-top: 100%;
}
`;

const PreviewLImg = styled.div`
width:100%;
height:185px;
// min-height: 200px;
background-size: cover !important;
@media only screen and (max-width: 767px) {
  width: 100%;
  height: auto;
  padding-top: 100%;
}
`;

const ImageDiv = styled.div`

  // position:  absolute;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;
  // overflow: hidden;
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
const ActionDiv = styled.div`
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
const BannerButton = styled.button`
height: 38px;
border-radius: 1px;
background-color: #f0f8ff00;
border: 1px solid black;
`;

class BannerBrief extends Component {
  constructor() {
    super();
    // this.updatebanner = this.updatebanner.bind(this);
    this.state = {
      banner: {}
    };
  }

  //src="http://via.placeholder.com/243x243"
  render() {
    const banner = this.props.banner;
    var imgUrl = typeof banner === "object" && banner.images
      ? banner.images[0].thumbnail ? banner.images[0].thumbnail : banner.images[0].large
      : "http://via.placeholder.com/243x243";

    let styleWidth = this.props.styleWidth;
    const cssStyle = styleWidth === 8 ? `col-xs-12 col-sm-12 col-md-12` : 'col-xs-12 col-sm-6 col-md-4';
    let bannerType = this.props.bannerType;

    console.log(this.props)

    return (
      typeof banner === "object" ?
        <MyThumbnailCol className={`${cssStyle}  banner-${bannerType}`} style={{ float: 'right', padding: styleWidth ===8? '0px 8px 0px 8px' : '' }} >
          {styleWidth === 8 ?
            <MyThumbnailLDiv>
              <ImageContainer>
                <div className="col-xs-7 col-sm-7 col-md-7" style={{padding: '0px'}}>
                  <ImageDiv>
                    <Link to={`/${banner.owner}/banners/${banner.id}`}>
                      <PreviewLImg
                        style={{
                          background: `url(${imgUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      />
                    </Link>
                  </ImageDiv>
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5" style={{ position: relative }}>
                  <ActionDiv>
                    {
                      // banner.name ?
                      <h3>sss</h3>
                      // : ''
                    }
                    <Link to={`/${banner.owner}/banners/${banner.id}`}>
                      <BannerButton>
                          ssddqd
                      </BannerButton>
                    </Link>
                  </ActionDiv>
                </div>
              </ImageContainer>
            </MyThumbnailLDiv>
            :
            <MyThumbnailSDiv>
               <ImageContainer>
                  <ImageDiv>
                    <Link to={`/${banner.owner}/banners/${banner.id}`}>
                      <PreviewSImg
                        style={{
                          background: `url(${imgUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      >
                        <ActionDiv>
                          {
                            // banner.name ?
                            <h3>fwefwef</h3>
                            // : ''
                          }
                          <BannerButton>
                              ssddqd
                          </BannerButton>
                        </ActionDiv>
                      </PreviewSImg>
                    </Link>
                  </ImageDiv>
              </ImageContainer>
            </MyThumbnailSDiv>
          }
      </MyThumbnailCol>
      :
      ""
    );
  }
}


export default BannerBrief;
