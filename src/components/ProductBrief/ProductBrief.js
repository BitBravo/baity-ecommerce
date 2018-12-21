// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Col, Modal } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';
// import styled from 'styled-components';
// import Product from 'assets/img/Selected-product.png';
// import EmptyHeart from 'assets/img/emptyHeart.png';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "config/base";
import { Image, Col, Thumbnail, Button, Card, Row, Modal } from "react-bootstrap";
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import {MdEventSeat} from 'react-icons/lib/md';
import Product from 'assets/img/Selected-product.png';

// const TagDiv = styled.span`
// position: absolute;
// top:5px;
// right: 0;
// font-size:10px;
// background-color:rgb(26,156,142);
// color: white;
// width: 70px;
// height: 18px;
// text-align:center;

// `;

// const IconImg = styled.img`
// width: 20px;
// height: 20px;
// @media only screen and (max-width: 767px) {
//   width: 20px;
//   height: 20px;
// }
//   @media only screen and (max-width: 400px) {
//     width: 20px;
//     height: 20px;
//   }
// `;

// const LikeImg = styled.div`
// width: 18px;
// margin-right: 8px;
// position: absolute;
// height: unset;
// left: 3px;
// padding: 3px;
// font-size: 10px;
// text-align: center;
// min-height: 28px;
// color: black;
// // @media only screen and (max-width: 767px) {
// //   width:15px;
// //   height:15px;}
// //   @media only screen and (max-width: 400px) {
// //     width:12px;
// //     height:12px;
// //   }
// `;


// const PaddingDiv = styled.div`
//  font-size:95%;
//   padding-right: 10px;
//   padding-left: 10px;
//   height: 120px;
//   line-height:22px;
//   @media only screen and (max-width: 1199px) {
//   //  display:none;
//   }
// `;

// const MyThumbnailCol = styled(Col)`
// // padding-left:10px;
// // padding-right:10px;
// // padding-bottom:5px;
// // padding-top:5px;
// @media only screen and (max-width: 767px) {
//   // padding-left:5px;
//   // padding-right:5px;
//   // padding-bottom:5px;
//   // padding-top:5px;
// }
// `;

// const MyThumbnailDiv = styled.div`
//   font-size:15px;
//   position: relative;
//   box-shadow:0px 10px 10px rgb(233,233,233);
//   background-color: #fff;
//   transform: scale(1, 1);
//   transition: transform 1s ease;
//   margin: 0px auto;
//   margin-bottom: 15px;
//   width: 340px;
//   height: 370px;
//   &:hover{
//     box-shadow:0px 0px 10px #6A6A6A;
//     border:1px solid #6A6A6A;
//     transition:all 0.5s ease-in-out;
//     transform: scale(1.05, 1.05);
//   }
//   @media only screen and (max-width: 767px) {
//     width: 100%;
//     height: auto;
//     &:hover{
//       transition:none;
//       transform: none;}
//       margin-bottom: 20px;
//   }
// `;
// const PreviewImg = styled.div`
// width:340px;
// height:250px;
// min-height: 200px;
// background-size: cover !important;
// @media only screen and (max-width: 767px) {
//   width: 100%;
//   height: auto;
//   padding-top: 100%;
// }
// `;

// const ImageDiv = styled.div`
//   // position:  absolute;
//   // top: 0;
//   // left: 0;
//   // bottom: 0;
//   // right: 0;
//   // overflow: hidden;
// `;

// const ImageContainer = styled.div`
//   // width: 100%;
//   // padding-top: 100%;
//   position: relative;
// `;

// const DescriptionCol = styled(Col)`
// padding-right:0;
// padding-left:0;
// padding-top:5px;
// font-family: 'dinarm';
// `;


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
height:20px;
@media only screen and (max-width: 767px) {
  width:15px;
  height:15px;}
  @media only screen and (max-width: 400px) {
    width:12px;
    height:12px;
  }

`

const PaddingDiv = styled.div`
 font-size:95%;
  padding-right: 5px;
  padding-left: 5px;
  height: 120px;
  line-height:22px;
  @media only screen and (max-width: 1199px) {
   display:none;}
`
const MPaddingDiv = styled.div`
  display:none;
  @media only screen and (max-width: 1199px) {
    line-height:20px;
    font-size:90%;
    padding: 0 5px 0 5px;
    height: 120px;
    display:block;}
    @media only screen and (max-width: 623px) {
      display:none;
    }
`
const SPaddingDiv = styled.div`
  display:none;
  @media only screen and (max-width: 623px) {
    line-height:16px;
    font-size:70%;
    padding: 0 5px 0 5px;
    height: 100px;
    display:block;
    }
    @media only screen and (max-width: 500px) {
      display:none;
}
`
const XSPaddingDiv = styled.div`
  display:none;
    @media only screen and (max-width: 500px) {
      display:block;
      padding: 0 5px 0 5px;
      line-height:13px;
      font-size:60%;
      height:80px;
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
const PreviewImg = styled.div`
// width:100%;
// height:100%;
`;

// const ImageDiv = styled.div`
//   position:  absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   overflow: hidden;
// `;

// const ImageContainer = styled.div`
//   width: 100%;
//   padding-top: 100%;
//   position: relative;
// `;
const DescriptionCol = styled(Col)`
padding-right:0;
padding-left:0;
padding-top:6px;
font-family: 'dinarm';
`;

const MiddleDiv = styled.div`
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
const EditButton = styled.button`
color: gray;
background-color: white;
font-size: 23px;
padding: 6px 0px;
height: auto;
width: 70%;
`;


const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.1,
};

const dialogStyle = (x, y) => ({
  position: 'absolute',
  width: 250,
  top: `${x}px`,
  left: `${y}px`,
  border: '1px solid #e5e5e5',
  backgroundColor: '#eff1ec',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  padding: '20px 20px 10px 20px',
});


class ProductBrief extends Component {
  constructor(props) {
    super();
    this.state = {
      product: {},
      rowId: 0,
      productId: '',
      itemType: 'product',
      showModal: false,
      leftMargin: 0,
      topMargin: 0,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.onSaveAction = this.onSaveAction.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onCancelAction = this.onCancelAction.bind(this);
    this.onEditAction = this.onEditAction.bind(this);
  }

  componentWillMount() {
    const { product, rowId } = this.props;
    const productId = product ? product.id : '';
    this.setState({ product, rowId, productId });
  }

  componentWillReceiveProps(nextProps) {
    const { product, rowId } = nextProps;
    const productId = product ? product.id : '';
    this.setState({ product, rowId, productId });
  }

  onChangeAction(e) {
    this.setState({ productId: e.target.value });
  }

  onCancelAction() {
    this.setState({ showModal: false });
  }

  onEditAction = (data) => {
    const { rowId, productId, type } = data;
    this.setState({ rowId, productId, type, showModal: true });
  }

  onSaveAction() {
    const { rowId, itemType, productId } = this.state;

    FirestoreServices.readDBRecord(itemType, productId).then((result) => {
      if (result.postType === itemType) {
        const data = { [rowId]: { rowId, type: itemType, productId, itemData: result } };
        FirestoreServices.saveAdminData('home-items', data).then((res) => {
          if (res) {
            this.setState({ product: result, showModal: false });
            console.log('Product added successfully');
          }
        });
      }
    })
      .catch(() => {
        alert('Can not find this product from database!');
      });
  }

  changeHandler(e) {
    const leftMargin = (e.target.getClientRects()[0].left - 60);
    const topMargin = (e.target.getClientRects()[0].bottom + 20);
    this.setState({ showModal: true, leftMargin, topMargin });
  }

  render() {
    const { product } = this.state;
    const imgUrl = typeof product === 'object' && product.images
      ? product.images[0].thumbnail ? product.images[0].thumbnail : product.images[0].large
      : 'http://via.placeholder.com/243x243';

    let { styleWidth: cssStyle, adminViewFlag } = this.props;

    cssStyle = cssStyle ? `col-xs-12 col-sm-6 col-md-${cssStyle}` : 'col-xs-12 col-sm-6 col-md-4';
    console.log(product)
    return (
      typeof product === 'object' ? (
        <MyThumbnailCol xs={6} md={4} sm={6} style={{float:'right'}} >
          <MyThumbnailDiv>
            <div>
              <Link to={`/${product.owner}/products/${product.id}`}>
                <div
                  style={{
                    background: `url(${imgUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                  }}
                  className="product-img"
                />
              </Link>
            </div>

            {product.price > 0
              ? null
              : <TagDiv> المنتج للعرض</TagDiv>
            }


          <PaddingDiv >
            <div style={{marginTop:'0',borderBottom:'dotted 1px lightgray ',height:'35px'}}>

              <DescriptionCol xs ={5} md={3}  >
                <p style={{color:'rgb(26, 156, 142)',float:'left'}}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{color:'black'}} >
              <DescriptionCol xs ={6} md={8}>
              <p style={{color:'black'}}> {product.name} </p>
              </DescriptionCol>
              </Link>

              <Col xs ={1}  style={{padding:'4px 0 0 0'}}>
              <IconImg src={Product} className="icons"/> </Col>
              </div>

              <p style={{paddingTop:'10px',paddingBottom:'10px'}}>
                {(product.desc || '').substring(0,105)}
                <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
                </Link>
                </p >

              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
                  <p className="item-owner-name"> من:
                    <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                      {product.businessName}
                    </Link>
                </p>
              </div>
              <div>ddd</div>
          </PaddingDiv>


           <MPaddingDiv >
            <div style={{marginTop:'0',borderBottom:'dotted 1px lightgray ',height:'35px'}}>

              <DescriptionCol xs ={5} md={4}  >
                <p style={{color:'rgb(26, 156, 142)',float:'left'}}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{color:'black'}} >
              <DescriptionCol xs ={6}md={7}>
              <p style={{color:'black'}}> {(product.name || '').substring(0,22)} </p>
              </DescriptionCol>
              </Link>

              <Col xs ={1}  style={{padding:'5px 0 0 0'}}>
              <IconImg src={Product} className="icons"/> </Col>
              </div>

              <p style={{paddingTop:'10px',paddingBottom:'10px'}}>
                {(product.desc || '').substring(0,90)}
                <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
                </Link>
                </p >

              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0' }}>
                  <p className="item-owner-name"> من:
                    <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                      {product.businessName}
                    </Link>
                  </p>
              </div>
          </MPaddingDiv>

          <SPaddingDiv >
            <div style={{marginTop:'0',borderBottom:'dotted 1px lightgray ',height:'30px'}}>

              <DescriptionCol xs ={5} md={4}  >
                <p style={{color:'rgb(26, 156, 142)',float:'left'}}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{color:'black'}} >
              <DescriptionCol xs ={6}md={7}>
              <p style={{color:'black',padding:'0 5px 0 0'}}> {(product.name || '').substring(0,20)} </p>
              </DescriptionCol>
              </Link>

              <Col xs ={1}  style={{padding:'5px 0 0 0'}}>
              <IconImg src={Product} className="icons"/> </Col>
              </div>

              <p style={{paddingTop:'5px'}}>
                {(product.desc || '').substring(0,90)}
                <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
                </Link>
                </p >

              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0'}}>
                  <p className="item-owner-name"> من:
                    <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                      {product.businessName}
                    </Link>
                  </p>
              </div>

          </SPaddingDiv>

          <XSPaddingDiv >
            <div style={{marginTop:'0',borderBottom:'dotted 1px lightgray ',height:'23px'}}>

              <DescriptionCol xs ={5} md={4}  >
                <p style={{color:'rgb(26, 156, 142)',float:'left'}}>{product.price} ر.س</p>
              </DescriptionCol>

              <Link to={`/${product.owner}/products/${product.id}`} style={{color:'black'}} >
              <DescriptionCol xs ={6}md={7}>
              <p style={{color:'black',padding:'0 5px 0 0'}}> {(product.name || '').substring(0,12)} </p>
              </DescriptionCol>
              </Link>

              <Col xs ={1}  style={{padding:'5px 0 0 0'}}>
              <IconImg src={Product} className="icons"/> </Col>
              </div>

              <p style={{paddingTop:'3px'}}>
                {(product.desc || '').substring(0,60)}
                <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${product.owner}/products/${product.id}`}>
                ... المزيد
                </Link>
                </p >

              <div style={{ display: 'inline-block', position: 'absolute', bottom: '0'}}>
                <p className="item-owner-name"> من:
                  <Link to={`/businessprofile/${product.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                    {product.businessName}
                  </Link>
                </p>
              </div>
            </XSPaddingDiv>
            
            {adminViewFlag
              ? (
                <MiddleDiv>
                  <EditButton onClick={this.changeHandler} name="product" value={product.id}>Edit</EditButton>
                </MiddleDiv>
              )
              : ''}
            <Modal
              aria-labelledby="modal-label"
              style={modalStyle}
              backdropStyle={backdropStyle}
              show={this.state.showModal}
              onHide={this.onCancelAction}
            >
              <div style={dialogStyle(this.state.topMargin, this.state.leftMargin)}>
                <div className="imageInfo">
                  <input type="text" value={this.state.productId} onChange={this.onChangeAction} />
                </div>
                <div className="toolbar">
                  <Col md={5} mdOffset={1}>
                    <button onClick={this.onCancelAction}>Cancel</button>
                  </Col>
                  <Col md={5}>
                    <button onClick={this.onSaveAction}>Save</button>
                  </Col>
                </div>
              </div>
            </Modal>
          </MyThumbnailDiv>
        </MyThumbnailCol>
      )
        : ''
    );
  }
}


export default ProductBrief;
