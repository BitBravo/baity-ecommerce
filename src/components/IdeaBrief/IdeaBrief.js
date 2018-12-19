import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Modal } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';
import styled from 'styled-components';
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
`;

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
max-width: 150px;
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


class IdeaBrief extends Component {
  constructor(props) {
    super();
    this.state = {
      idea: {},
      rowId: 0,
      ideaId: '',
      itemType: 'idea',
      showModal: false,
      leftMargin: 0,
      topMargin: 0,
    };
    this.onSaveAction = this.onSaveAction.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onEditAction = this.onEditAction.bind(this);
    this.onCancelAction = this.onCancelAction.bind(this);
  }

  componentWillMount() {
    const { idea, rowId } = this.props;
    const ideaId = idea ? idea.id : '';
    this.setState({ idea, rowId, ideaId });
  }

  componentWillReceiveProps(nextProps) {
    const { idea, rowId } = nextProps;
    const ideaId = idea ? idea.id : '';
    this.setState({ idea, rowId, ideaId });
  }

  changeHandler = (e) => {
    const leftMargin = (e.target.getClientRects()[0].left - 60);
    const topMargin = (e.target.getClientRects()[0].bottom + 20);
    this.setState({ showModal: true, leftMargin, topMargin });
  }

  onSaveAction = () => {
    const { rowId, itemType, ideaId } = this.state;
    FirestoreServices.readDBRecord(itemType, ideaId).then((result) => {
      if (result.postType === itemType) {
        const data = { [rowId]: { rowId, type: itemType, ideaId, itemData: result } };
        FirestoreServices.saveAdminData('home-items', data).then((res) => {
          if (res) {
            this.setState({ idea: result, showModal: false });
            console.log('Idea added successfully');
          }
        });
      }
    })
      .catch(() => {
        alert('Can not find this idea from database!');
      });
  }

  onChangeAction = (e) => {
    this.setState({ ideaId: e.target.value });
  }

  onEditAction = (data) => {
    const { rowId, ideaId, type } = data;
    this.setState({ rowId, ideaId, type, showModal: true });
  }

  onCancelAction = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { idea } = this.state;
    const imgUrl = typeof idea === 'object' && idea.images
      ? idea.images[0].thumbnail ? idea.images[0].thumbnail : idea.images[0].large
      : 'http://via.placeholder.com/243x243';

    let { styleWidth: cssStyle, adminViewFlag } = this.props;
    const layoutClassName = cssStyle >= 8 ? `col-xs-12 col-sm-12 col-md-${cssStyle}` : 'col-xs-12 col-sm-6 col-md-4';

    const styles = cssStyle >= 8 ? { width: '100%' } : {};

    return (
      typeof idea === 'object'
        ? (
          <MyThumbnailCol className={layoutClassName} style={{ float: 'right' }} >
            <MyThumbnailDiv style={styles}>
              <ImageContainer>
                <ImageDiv>
                  <Link to={`/${idea.owner}/ideas/${idea.id}`}>
                    <PreviewImg
                      style={{
                        background: `url(${imgUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        width: cssStyle >= 8 ? '100%' : '',
                      }}>
                      <IdeaDiv>
                        <IdeaImgDiv>
                          <img src={Idea} style={{ width: '100%' }} alt="" />
                        </IdeaImgDiv>
                        <IdeaTitle style={{}}>{idea.department}</IdeaTitle>
                      </IdeaDiv>
                    </PreviewImg>
                  </Link>
                </ImageDiv>
              </ImageContainer>

              {idea.price > 0
                ? null
                : <TagDiv> المنتج للعرض</TagDiv>
              }

              <PaddingDiv>
                <div style={{ display: 'block', bottom: '0', height: '30px' }}>
                  <Col xs={4} style={{ padding: '0px', textAlign: 'left' }}>
                    {''}
                    <LikeImg src={EmptyHeart} className="icons" />
                  </Col>
                  <p xs={8} style={{ margin: '4px' }}>
                     من:
                    <Link to={`/businessprofile/${idea.owner}`} style={{ color: 'rgb(26,156,142)' }}>
                      {idea.businessName}
                    </Link>
                  </p>
                </div>
              </PaddingDiv>
              {adminViewFlag
                ? (
                  <MiddleDiv>
                    <EditButton onClick={this.changeHandler} name="idea" value={idea.id}>Edit</EditButton>
                  </MiddleDiv>
                )
                : ''
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
                    <input type="text" value={this.state.ideaId} onChange={this.onChangeAction} />
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


export default IdeaBrief;
