import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Modal } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';
import styled from 'styled-components';
import { relative } from 'path';
import './style.css';

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
  display: none;
  padding-left:5px;
  padding-right:5px;
  padding-bottom:5px;
  padding-top:5px;
}
`
const MyThumbnailColMb = styled(Col)`
padding-left:5px;
padding-right:5px;
padding-bottom:5px;
padding-top:5px;
@media only screen and (min-width: 767px) {
 display: none;
}
`

const MyThumbnailDiv = styled.div`
  font-size:15px;
  position: relative;
  box-shadow:0px 10px 10px rgb(233,233,233);
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 1s ease;
  margin-bottom: 10px;
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
      margin-bottom: 5px;
  }
`


const PreviewImg = styled.div`
  width: 80%;
  height: 70%;
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

const ImgDiv = styled.div`
height: inherit;
`;

const ImageContainer = styled.div`
  width: 100%;
  // padding-top: 100%;
  // position: relative;
  height: -webkit-fill-available;
  z-index: 1;
`;

// const MyThumbnailCol = styled(Col)`
// // padding-left:10px;
// // padding-right:10px;
// // padding-bottom:5px;
// // padding-top:5px;
// @media only screen and (max-width: 1200px) {
//   padding: 0px !important;
//   // padding-left:5px;
//   // padding-right:5px;
//   // padding-bottom:5px;
//   // padding-top:5px;
// }
// @media only screen and (max-width: 767px) {
//   padding-left:15px !important;
//   padding-right:15px !important;
//   // padding-bottom:5px;
//   // padding-top:5px;
// }
// `;

// const MyThumbnailSDiv = styled.div`
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

// const MyThumbnailLDiv = styled.div`
//   font-size:15px;
//   position: relative;
//   box-shadow:0px 10px 10px rgb(233,233,233);
//   background-color: #fff;
//   transform: scale(1, 1);
//   transition: transform 1s ease;
//   margin: 0px auto;
//   margin-left: 8.328;
//   margin-right: 8.328;
//   // width: 680px;
//   height: 185px;
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

// const PreviewSImg = styled.div`
// width:340px;
// height:370px;
// min-height: 200px;
// background-size: cover !important;
// @media only screen and (max-width: 767px) {
//   width: 100%;
//   height: auto;
//   padding-top: 100%;
// }
// `;

// const PreviewLImg = styled.div`
// width:100%;
// height:185px;
// // min-height: 200px;
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

const ActionDiv = styled.div`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
width: 50%;
height: 90%;
margin: auto;
text-align: -webkit-center;
`;
const BannerButton = styled.button`
// height: 38px;
border-radius: 1px;
background-color: #f0f8ff00;
border: 1px solid black;
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
z-index: 9999;
`;
const EditButton = styled.button`
color: gray !important;
background-color: white;
font-size: 23px;
padding: 6px 0px;
height: auto;
width: 70%;
max-width: 150px;
margin: 10px 0px 10px 0px !important;
outline: none;
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


class BannerBrief extends Component {
  constructor() {
    super();
    // this.updatebanner = this.updatebanner.bind(this);
    this.state = {
      banner: {},
      rowId: 0,
      bannerId: '',
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
    const { banner, rowId } = this.props;
    const bannerId = banner ? banner.id : '';
    this.setState({ banner, rowId, bannerId });
  }

  componentWillReceiveProps(nextProps) {
    const { banner, rowId } = nextProps;
    const bannerId = banner ? banner.id : '';
    this.setState({ banner, rowId, bannerId });
  }

  onChangeAction(e) {
    this.setState({ bannerId: e.target.value });
  }

  onCancelAction() {
    this.setState({ showModal: false });
  }

  onEditAction = (data) => {
    const { rowId, bannerId, type } = data;
    this.setState({ rowId, bannerId, type, showModal: true });
  }

  onSaveAction() {
    const { rowId, itemType, bannerId } = this.state;
    
    FirestoreServices.readDBRecord(itemType, bannerId).then((result) => {
      if (result.postType === itemType) {
        const data = { [rowId]: { rowId, type: itemType, bannerId, itemData: result } };
        FirestoreServices.saveAdminData('home-items', data).then((res) => {
          if (res) {
            this.setState({ banner: result, showModal: false });
            console.log('Banner added successfully');
          }
        });
      }
    })
      .catch(() => {
        alert('Can not find this banner from database!');
      });
  }

  changeHandler(e) {
    const leftMargin = (e.target.getClientRects()[0].left - 60);
    const topMargin = (e.target.getClientRects()[0].bottom + 20);
    this.setState({ showModal: true, leftMargin, topMargin });
  }

  render() {
    const { banner } = this.state;
    const imgUrl = typeof banner === 'object' && banner.images
      ? banner.images[0].thumbnail ? banner.images[0].thumbnail : banner.images[0].large
      : 'http://via.placeholder.com/243x243';

    let { styleWidth, adminViewFlag } = this.props;
    const cssStyle = styleWidth === 8 ? `col-xs-12 col-sm-12 col-md-12` : 'col-xs-12 col-sm-6 col-md-4';
    const bannerType = this.props.bannerType;
    const idea = {}
    return (
      typeof banner === 'object'
        ? (
          <div>
            {
              bannerType === 'right'
                ? (
                  <div>
                    <MyThumbnailCol xs={6} md={4} sm={4} className="single-banner" style={{ float: 'right' }}>
                      <MyThumbnailDiv className={`banner-container banner-single ${bannerType}`}>
                        <ImgDiv>
                          <Link to={`/${banner.owner}/banners/${banner.id}`}>
                            <ActionDiv className="action-div">
                              {
                                banner.name
                                  ? <h4>banner.name</h4>
                                  : <h4>banner.name</h4>
                              }
                              <PreviewImg
                                style={{
                                  background: `url(${imgUrl})`,
                                  backgroundSize: 'contain',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'center center',
                                }}
                                className="img-container"
                              />
                              <BannerButton>
                                {
                                  banner.name
                                    ? 'banner.name'
                                    : 'TEST BUTTON'
                                }
                              </BannerButton>
                            </ActionDiv>
                          </Link>
                        </ImgDiv>
                      </MyThumbnailDiv>
                      {adminViewFlag
                        ? (
                          <MiddleDiv>
                            <EditButton onClick={this.changeHandler} name="product" value={banner.id}>Edit</EditButton>
                          </MiddleDiv>
                        ) : ''
                      }
                    </MyThumbnailCol>
                    <MyThumbnailColMb xs={12} md={12} sm={12} className="banner-wide" style={{ float: 'left', padding: '0px' }}>
                      <MyThumbnailDiv className={`banner-container ${bannerType}`}>
                        <ImageContainer>
                          <ImgDiv className="col-xs-6 col-sm-7 col-md-7" style={{ padding: '0px' }}>
                            <Link to={`/${banner.owner}/banners/${banner.id}`}>
                              <PreviewImg
                                className="vertical-middle padding-img"
                                style={{ background: `url(${imgUrl})` }}
                              />
                            </Link>
                          </ImgDiv>
                          <div className="col-xs-6 col-sm-5 col-md-5" style={{ position: relative }}>
                            <ActionDiv>
                              {
                                banner.name
                                  ? <h4>banner.name</h4>
                                  : <h4>'banner.name'</h4>
                              }
                              <Link to={`/${banner.owner}/banners/${banner.id}`}>
                                <BannerButton>
                                  {
                                    banner.name
                                      ? banner.name
                                      : 'TEST BUTTON'
                                  }
                                </BannerButton>
                              </Link>
                            </ActionDiv>
                          </div>
                        </ImageContainer>
                      </MyThumbnailDiv>
                      {adminViewFlag
                        ? (
                          <MiddleDiv>
                            <EditButton onClick={this.changeHandler} name="product" value={banner.id}>Edit</EditButton>
                          </MiddleDiv>
                        ) : ''
                      }
                    </MyThumbnailColMb>
                  </div>
                )
                : (
                  <MyThumbnailCol xs={12} md={12} sm={12} className="banner-wide" style={{ float: 'left', padding: '0px' }}>
                    <MyThumbnailDiv className={`banner-container ${bannerType}`}>
                      <ImageContainer>
                        <ImgDiv className="col-xs-6 col-sm-7 col-md-7" style={{ padding: '0px' }}>
                          <Link to={`/${banner.owner}/banners/${banner.id}`}>
                            <PreviewImg
                              className="vertical-middle padding-img"
                              style={{ background: `url(${imgUrl})` }}
                            />
                          </Link>
                        </ImgDiv>
                        <div className="col-xs-6 col-sm-5 col-md-5" style={{ position: relative }}>
                          <ActionDiv>
                            {
                              banner.name
                                ? <h4>banner.name</h4>
                                : <h4>'banner.name'</h4>
                            }
                            <Link to={`/${banner.owner}/banners/${banner.id}`}>
                              <BannerButton>
                                {
                                  banner.name
                                    ? banner.name
                                    : 'TEST BUTTON'
                                }
                              </BannerButton>
                            </Link>
                          </ActionDiv>
                        </div>
                      </ImageContainer>
                    </MyThumbnailDiv>
                    {adminViewFlag
                      ? (
                        <MiddleDiv>
                          <EditButton onClick={this.changeHandler} name="product" value={banner.id}>Edit</EditButton>
                        </MiddleDiv>
                      ) : ''
                    }
                  </MyThumbnailCol>
                )
            }
            <Modal
              aria-labelledby="modal-label"
              style={modalStyle}
              backdropStyle={backdropStyle}
              show={this.state.showModal}
              onHide={this.onCancelAction}
            >
              <div style={dialogStyle(this.state.topMargin, this.state.leftMargin)}>
                <div className="imageInfo">
                  <input type="text" value={this.state.bannerId} onChange={this.onChangeAction} />
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
          </div>
        )
        : ''
    );
  }
}


export default BannerBrief;
