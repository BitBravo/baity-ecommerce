import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Modal } from 'react-bootstrap';
import FirestoreServices from 'services/FirestoreServices';
import styled from 'styled-components';
// import Idea from 'assets/img/AddingIdea.png';
import Idea from 'assets/img/Selected-idea.png';
import EmptyHeart from 'assets/img/emptyHeart.png';


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
`;
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


const PreviewImg = styled.div`
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

// const LikeImg = styled.div`
// width: 18px !important;
// margin-right: 8px;
// position: absolute;
// height: unset;
// left: 3px;
// padding: 3px;
// font-size: 10px;
// text-align: center;
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
//   height: auto;
//   line-height:22px;
//   @media only screen and (max-width: 1199px) {
//   //  display:none;
//   }
// `;

// const MyThumbnailCol = styled(Col)`
// padding-left:23.6px;
// padding-right:23.6px;
// // padding-bottom:5px;
// // padding-top:5px;

// @media only screen and (max-width: 1200px) {
//   padding-left:15px !important;
//   padding-right:15px !important;
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
// height:340px;
// min-height: 200px;
// background-size: cover !important;
// @media only screen and (max-width: 767px) {
//   width: 100%;
//   height: auto;
//   padding-top: 100%;
// }
// `;

// const ImageDiv = styled.div`
//   position:  relative;
// `;
// const IdeaDiv = styled.div`
// position: absolute;
// top: 0;
// bottom: 0;
// left: 0;
// right: 0;
// width: 50%;
// height: 30%;
// margin: auto;
// text-align: center;
// `;
// const IdeaTitle = styled.h2`
//   font-size: 36px;
//   margin-top: 12px;
//   font-weight: bold;
//   color: white;
//   text-shadow: 1px 2px 3px #666;
// `
// const IdeaImgDiv = styled.div`
// width: 58px;
// height: 58px;
// width: 58px;
// height: 58px;
// background-color: #00A19A;
// border-radius: 50%;
// padding: 7px;
// border: 1px solid #07a7d3;
// margin: 0px auto;
// text-align: center;
// `;
// const ImageContainer = styled.div`
//   // width: 100%;
//   // padding-top: 100%;
//   position: relative;
// `;

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
          <MyThumbnailCol xs={6} md={4} sm={6} style={{float:'right'}}>
            <MyThumbnailDiv>
              <ImageContainer>
                <ImageDiv>
                  <Link to={`/${idea.owner}/ideas/${idea.id}`}>
                    <PreviewImg
                      style={{
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                      }}
                    />
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
                <Description className="flex-text text-muted">{(idea.desc || '').substring(0,105)}
                  <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
                  ... المزيد
                  </Link>
                </Description>
                <MDescription className="flex-text text-muted">{(idea.desc || '').substring(0,90)}
                  <Link style={{display: 'inline',color:'rgb(26, 156, 142)'}} to={`/${idea.owner}/ideas/${idea.id}`}>
                  ... المزيد
                  </Link>
                </MDescription>
                <SDescription className="flex-text text-muted">{(idea.desc || '').substring(0,60)}
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
        )
        : ''
    );
  }
}


export default IdeaBrief;
