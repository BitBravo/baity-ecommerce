import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base, db } from "../base";
import FirebaseServices from './FirebaseServices'
import FirestoreServices from './FirestoreServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid ,Carousel,Glyphicon} from "react-bootstrap";
import Loading from './Loading';
import styled from 'styled-components'
import FullHeart from '../assets/img/fullHeart.png';
import EmptyHeart from '../assets/img/emptyHeart.png';
import {MdAddShoppingCart,MdWeekend} from 'react-icons/lib/md';
import Idea from '../assets/img/Selected-idea.png';


const IconImg = styled.img`
width:20px;
 height:20px;
`
const LikeDiv = styled.span`
position: absolute;
top:10%;
left: 60px;
font-size:40px;
border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #2d2d2d;
    border: none;
    background-color: hsla(0,0%,100%,.8);
    padding: 5px 6px ;
    cursor: default;
    outline: none;
@media only screen and (max-width: 767px) {
  height: 40px;
  width: 40px;
  font-size:30px;
  left: 30px;
}
`
const LikeIcon=styled(Glyphicon)`
cursor:pointer;
color:rgb(26,156,142);

`;
const UnLikeIcon=styled(Glyphicon)`
cursor:pointer;
color: transparent;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: rgb(75, 75, 75);
`;
const TagDiv = styled.span`
position: absolute;
bottom:0;
right: 0;
font-size:20px;
background-color:rgb(26,156,142);
color: white;
width: 150px;
height: 30px;
text-align:center;
@media only screen and (max-width: 767px) {
  font-size:10px;
  width: 80px;
  height: 20px;}
`;
const ImgGallaryThumb = styled.div`
  }
`;
const PrevImgGallaryThumb = styled.div`
  }
`;

const PreviewImg = styled.img`
width: auto;
max-width:100%;
 height: 100%;
 object-fit: contain;
position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  }
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
height:70vh;


`;

const PaddingDiv = styled.div`
font-size:15px;
padding-right: 10px;
padding-top: 5px;
padding-left: 0;
@media only screen and (max-width: 991px) {
  font-size:13px;}
`;
const ImageCol=styled(Col)`
border-left: 1.5px solid rgb(218, 218, 217);
@media only screen and (max-width: 991px) {
  border:none;
`;
const DetailsCol =styled(Col)`
font-size:16px;
padding :0 5px 0 0;
margin :15px 0 0 0;
position:relative;
@media only screen and (max-width: 991px) {
  font-size: 14px;
  margin:0;
}
`

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
    this.ideaId = this.props.match.params.id;
    this.owner = this.props.match.params.owner,

    this.state = {
      idea: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      },
      index: 0,
      liked: false
    };
  }

  componentWillMount() {
    this.thumbImage.bind(this);
    const authenticated = this.props.authenticated
    this.ideasRef = base.bindDoc(`${FirestoreServices.IDEAS_PATH}/${this.ideaId}`, {
      context: this,
      state: 'idea',
      then(data) {
          //if user authenticated, get her likes to update the heart
        if (authenticated) {
          this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/ideas/${this.ideaId}`)
          .then(val => {
            if (val) {
              this.setState({liked: true, loading: false})
            }else {
              this.setState({liked: false, loading: false})
            }
          })
        }else {
          this.setState({loading: false})
        }
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  componentWillUnmount() {
    this.ideasRef && base.removeBinding(this.ideasRef);
    this.userLikesRef && base.removeBinding(this.userLikesRef);
  }

  nextImage(){
    if (this.state.index < this.state.idea.images.length - 1)
      this.setState({index: (this.state.index + 1)});
  }

  prevImage(){
    if (this.state.index > 0)
      this.setState({index: (this.state.index - 1)});
  }
  thumbImage(thumbIndex){
    this.setState({index: thumbIndex});
  }

  like(){
    if (this.props.authenticated) {
      const userLikes = FirebaseServices.likes
      const currentUserRef = userLikes.child(`${this.props.currentUser.uid}/ideas`)
      const ideaRef = FirestoreServices.ideas.doc(this.ideaId)
      var like = false;

      currentUserRef.child(this.ideaId).once('value', (snap) => {
        if (snap.val()) {
          console.log("unlike");
          currentUserRef.child(this.ideaId).set(null);
          like = false
        } else {
          console.log("like");
          currentUserRef.child(this.ideaId).set("idea");
          like = true;
        }

        return db.runTransaction((transaction) => {
            return transaction.get(ideaRef).then((doc) => {
            console.log("Prudoct detailes - transaction()")
            if (doc.exists) {
             var post = doc.data()
                if (!like) {
                  var newLikes = post.likes - 1;
                  transaction.update(ideaRef, { likes: newLikes });
                  this.setState({ liked: false })
                } else {
                  var newLikes = post.likes + 1;
                  transaction.update(ideaRef, { likes: newLikes });
                  this.setState({ liked: true })
                }
              }
            })
          });
      });
    }
  }

  render() {

    const idea = this.state.idea;

    if (this.state.loading && !this.state.errorHandling.showError)
    return <Loading />;
  if (this.state.errorHandling.showError)
    return (
      <div>
        <Modal show={true} style={{ top:-100 }}>
          <Modal.Header>حدث خطأ غير معروف</Modal.Header>
          <Modal.Body>

              <Alert bsStyle="danger">
                {this.state.errorHandling.errorMsg.message}
              </Alert>
              <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
              </Link>
          </Modal.Body>
        </Modal>
      </div>
    );
  if (!this.state.loading && !this.state.showError)
      return(

        <Grid >
          <Row style={{display: 'flex', flexWrap: 'wrap'}} className="productdetails">
             <ImageCol  xs={12} sm={12} md={8} lg={9}  style={{padding:'0'}}>
            <Carousel    indicators={false} wrap={false}>
             <Carousel.Item>
               <ImageContainer>
            <ImageDiv >
            <PreviewImg src={idea.images[this.state.index].large}/>
            </ImageDiv>
            </ImageContainer>
            <Glyphicon  className ="leftglyphicon" onClick={this.nextImage.bind(this)} glyph="chevron-left"/>
             <Glyphicon className="rightglyphicon" onClick={this.prevImage.bind(this)} glyph="chevron-right"/>
           <LikeDiv>

              {this.state.liked
              ? <LikeIcon glyph="heart"  onClick={this.like.bind(this)}/>
              : <UnLikeIcon glyph="heart"  onClick={this.like.bind(this)}/>
              }

         </LikeDiv>
         <TagDiv>هذه الفكرة للعرض</TagDiv>

              </Carousel.Item>
            </Carousel >
            <div className="product-slider">
              <div id="thumbcarousel1" className="carousel1 slide" >
                <ImgGallaryThumb className="item">
                  {idea.images.map((obj, index) => {
                    return <PrevImgGallaryThumb className="thumb " >
                             <Image src={obj.large} onClick={() => { return this.setState({index: index})}}/>
                          </PrevImgGallaryThumb>
                         })}
                </ImgGallaryThumb>
              </div>
           </div>
           <hr className='hidden-md hidden-lg' />
            </ImageCol>

            <DetailsCol  xs={12} sm={12} md={4} lg={3}  >
            <h4 style={{color:'black'}}><IconImg src={Idea} className="icons"/>{idea.name}</h4>
            <hr className='hidden-xs visible-md visible-lg' />
            <Link to={`/businessprofile/${idea.owner}`}style={{color:'rgb(26,156,142)'}}>
            <button type="submit" >
               للتواصل
             </button>
                  </Link>


            <PaddingDiv style={{marginBottom:'90px' }}>
            <h4 style={{display:'inline'}}>وصف الفكرة</h4>
            <h6 style={{color:'rgb(26,156,142)',float:'left',display:'inline',padding :'0 0 0 20px'}}>
            الاعجاب &nbsp;{idea.likes > 0 ? idea.likes : 0}
            </h6>
              <p > {idea.desc}</p>
              </PaddingDiv>

               <div >
           
              {/* only idea owner can update a idea */}
              {
                this.props.authenticated
                ?this.props.currentUser.uid === this.state.idea.owner
                ?<Link to={`/ideas/${idea.id}/updateIdea`} >
                <button style={{position:'absolute',bottom:'0',left:'5px',width:'50%'}}>
                  تحديث بيانات الفكرة
                </button>
              </Link>
                : 
                <div style={{position: 'absolute', bottom: '0',right:'5px'}}>
                      <h4 >من:&nbsp; 
                      <Link to={`/businessprofile/${idea.owner}`}style={{color:'rgb(26,156,142)'}}>
                      {idea.businessName}
                      </Link>
                    </h4>
                    </div>
              : 
              <div style={{position: 'absolute', bottom: '0',right:'5px'}}>
                    <h4 >من:&nbsp; 
                    <Link to={`/businessprofile/${idea.owner}`}style={{color:'rgb(26,156,142)'}}>
                    {idea.businessName}
                    </Link>
                  </h4>
                  </div>

              }
        
            </div>
            </DetailsCol>
            </Row>
            </Grid>



    );
  }
}


export default IdeaDetails;
