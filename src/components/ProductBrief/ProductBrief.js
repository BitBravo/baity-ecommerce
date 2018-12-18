import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import styled from 'styled-components';
import Product from 'assets/img/Selected-product.png';
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
@media only screen and (max-width: 767px) {
  // padding-left:5px;
  // padding-right:5px;
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
height:250px;
min-height: 200px;
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

class ProductBrief extends Component {
  constructor() {
    super();
    // this.updateproduct = this.updateproduct.bind(this);
    this.state = {
      product: {}
    };
  }

  //src="http://via.placeholder.com/243x243"
  render() {
    const product = this.props.product;
    var imgUrl = typeof product === "object" && product.images
      ? product.images[0].thumbnail ? product.images[0].thumbnail : product.images[0].large
      : "http://via.placeholder.com/243x243";

    let cssStyle = this.props.styleWidth;
    cssStyle = cssStyle ? `col-xs-12 col-sm-6 col-md-${cssStyle}` : 'col-xs-12 col-sm-6 col-md-4';

    return (
      typeof product === "object" ?
        <MyThumbnailCol className={cssStyle} style={{ float: 'right' }} >
        <MyThumbnailDiv>
          <ImageContainer>
            <ImageDiv>
              <Link to={`/${product.owner}/products/${product.id}`}>
                <PreviewImg
                  style={{
                    background: `url(${imgUrl})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  }}
                // src={
                //   product.images
                //     ? product.images[0].thumbnail? product.images[0].thumbnail : product.images[0].large
                //     : "http://via.placeholder.com/243x243"
                // }
                />
                {/* <img   src="http://via.placeholder.com/243x243" */}
              </Link>
            </ImageDiv>
          </ImageContainer>
          {product.price > 0
            ? null
            : <TagDiv> المنتج للعرض</TagDiv>
          }

          <PaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '38px' }}>
              <DescriptionCol xs={5} md={3}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{product.price} ر.س</p>
              </DescriptionCol>
              <Link to={`/${product.owner}/products/${product.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={8}>
                  <p style={{ color: 'black' }}> {product.name} </p>
                </DescriptionCol>
              </Link>
              <Col xs={1} style={{ padding: '4px 0 0 0' }}>
                <IconImg src={Product} className="icons" />
              </Col>
            </div>

            <p style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              {product.desc ? product.desc.substring(0, 105) : ''}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'block',  bottom: '0' }}>
                <Col xs={4} style={{ padding: '0px', textAlign: "left" }}>
                  {}
                  <LikeImg src={EmptyHeart} className="icons" />
              </Col>
              <p xs={8}> من:
                  <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {product.businessName}
                </Link>
              </p>
            </div>
          </PaddingDiv>

          {/* <MPaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '38px' }}>

              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black' }}> {product.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Product} className="icons" />
              </Col>
            </div>

            <p style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              {product.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'block',  bottom: '0' }}>
                <Col xs={4} style={{ padding: '0px', textAlign: "left" }}>
                  {}
                  <LikeImg src={EmptyHeart} className="icons" />
              </Col>
              <p xs={8}> من:
                  <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {product.businessName}
                </Link>
              </p>
            </div>

          </MPaddingDiv>

          <SPaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '38px' }}>
              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black', padding: '0 5px 0 0' }}> {product.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Product} className="icons" /> </Col>
            </div>

            <p style={{ paddingTop: '5px' }}>
              {product.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'block',  bottom: '0' }}>
                <Col xs={4} style={{ padding: '0px', textAlign: "left" }}>
                {}
                <LikeImg src={EmptyHeart} className="icons" />
              </Col>
              <p xs={8}> من:
                <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                {product.businessName}
              </Link>
              </p>
            </div>

          </SPaddingDiv> */}

          {/* <XSPaddingDiv >
            <div style={{ marginTop: '0', borderBottom: 'dotted 1px lightgray ', height: '25px' }}>

              <DescriptionCol xs={5} md={4}  >
                <p style={{ color: 'rgb(26, 156, 142)', float: 'left' }}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{ color: 'black' }} >
                <DescriptionCol xs={6} md={7}>
                  <p style={{ color: 'black', padding: '0 5px 0 0' }}> {product.name} </p>
                </DescriptionCol>
              </Link>

              <Col xs={1} style={{ padding: '5px 0 0 0' }}>
                <IconImg src={Product} className="icons" /> </Col>
            </div>

            <p style={{ paddingTop: '3px' }}>
              {product.desc}
              <Link style={{ display: 'inline', color: 'rgb(26, 156, 142)' }} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
              </Link>
            </p >

            <div style={{ display: 'block',  bottom: '0' }}>
                <Col xs={4} style={{ padding: '0px', textAlign: "left" }}>
                  {}
                  <LikeImg src={EmptyHeart} className="icons" />
              </Col>
              <p xs={8}> من:
                  <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                  {product.businessName}
                </Link>
              </p>
            </div>
          </XSPaddingDiv> */}
        </MyThumbnailDiv>
      </MyThumbnailCol>
      :
      ""
    );
  }
}


export default ProductBrief;
