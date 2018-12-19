import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Modal } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';
import styled from 'styled-components';
import { relative } from 'path';
import './style.css';

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

    return (
      typeof banner === 'object'
        ? (
          <MyThumbnailCol className={`${cssStyle}  banner-${bannerType}`} style={{ float: 'right', padding: styleWidth ===8? '0px 8px 0px 8px' : '' }} >
            {styleWidth === 8
              ? (
                <MyThumbnailLDiv className="banner-container">
                  <ImageContainer>
                    <div className="col-xs-7 col-sm-7 col-md-7" style={{padding: '0px'}}>
                      <ImageDiv>
                        <Link to={`/${banner.owner}/banners/${banner.id}`}>
                          <PreviewLImg
                            style={{
                              background: `url(${imgUrl})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center center',
                            }}
                          />
                        </Link>
                      </ImageDiv>
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5" style={{ position: relative }}>
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
                </MyThumbnailLDiv>
              )
              : (
                <MyThumbnailSDiv>
                  <ImageContainer>
                    <ImageDiv>
                      <Link to={`/${banner.owner}/banners/${banner.id}`}>
                        <PreviewSImg
                          style={{
                            background: `url(${imgUrl})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                          }}
                          className="banner-container"
                        >
                          <ActionDiv className="action-div">
                            {
                              banner.name
                                ? <h4>banner.name</h4>
                                : <h4>banner.name</h4>
                            }

                            <BannerButton>
                              {
                                banner.name
                                  ? 'banner.name'
                                  : 'TEST BUTTON'
                              }
                            </BannerButton>
                          </ActionDiv>
                        </PreviewSImg>
                      </Link>
                    </ImageDiv>
                  </ImageContainer>
                </MyThumbnailSDiv>
              )
            }
            {adminViewFlag
              ? (
                <MiddleDiv>
                  <EditButton onClick={this.changeHandler} name="product" value={banner.id}>Edit</EditButton>
                </MiddleDiv>
              ) : ''
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
          </MyThumbnailCol>
        )
        : ''
    );
  }
}


export default BannerBrief;
