import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import { Image, Alert, Col, Thumbnail, Button, Modal,Row, Grid } from "react-bootstrap";
import Loading from './Loading';
import Equalizer from "react-equalizer";
import styled from 'styled-components'
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right'
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left'
import plus from '../assets/img/plus.png';

const FlexRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;
class IdeaDetails extends Component {
  constructor(props) {
    super(props);
    this.ideaId = this.props.match.params.id;

    this.state = {
      idea: {},
      loading: true,
      errorHandling: {
        showError: false, errorMsg: 'error'
      },
      index: 0
    };
  }

  componentWillMount() {
    this.ideasRef = base.syncState(`${FirebaseServices.IDEAS_PATH}/${this.ideaId}`, {
      context: this,
      state: 'idea',
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }

  componentWillUnmount() {
    this.ideasRef && base.removeBinding(this.ideasRef);
  }

  nextImage(){
    if (this.state.index < this.state.idea.images.length - 1)
      this.setState({index: (this.state.index + 1)});
  }

  prevImage(){
    if (this.state.index > 0)
      this.setState({index: (this.state.index - 1)});
  }

  like(){
    const userLikes = FirebaseServices.likes
    const currentUserRef = userLikes.child(`${this.props.currentUser.uid}/ideas`)
    const ideaRef = FirebaseServices.ideas.child(this.ideaId)

    return ideaRef.transaction(function(post) {
      console.log("Idea detailes - transaction()")
      console.log(post)
      if (post) {
        currentUserRef.child(post.id).once('value', function (snap) {
        if (snap.val()) {

          post.likes--;
          currentUserRef.child(post.id).set(null);
        } else {
          post.likes++;
          //console.log(userLikes.child(currentUserId).child(post.id));
          currentUserRef.child(post.id).set(post.postType);
        }
      })
      }
      return post;
    });
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




          <Row className="productdetails">

            <Col  xs={12} sm={4} md={4} lg={4} >

            <div className="padding">
              <h4 >{idea.name}</h4>
              <p >{idea.desc}</p>
              </div>
              <hr/>
              <div>
            <p>
              {/* only idea owner can update a idea */}
              {
                this.props.authenticated
                ?this.props.currentUser.uid === this.state.idea.owner
              ?<Link to={`/ideas/${idea.id}/updateIdea`}>
                <button >
                  تحديث بيانات الفكرة
                </button>
              </Link>
                : null
              : null

              }
            </p>
            </div>
            </Col>

            <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
              <div style={{marginTop: '30%'}}>
              <FaArrowCircleRight size={50}   onClick={this.nextImage.bind(this)}/>
              </div>
          </Col>
           <Col  xs={10} sm={6} md={6} lg={6} className="ideadetailsimgbckgrnd">
            <img src={idea.images[this.state.index].large} />
            </Col>
            <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
            <div style={{marginTop: '30%'}}>
            <FaArrowCircleLeft size={50}  onClick={this.prevImage.bind(this)}/>
            </div>
          </Col>
          <Col xs={1} sm ={1} md={1} lg={1} style={{backgroundColor: '#f4f4f4'}}>
            <div style={{marginTop: '30%'}}>
              <img src={plus}  onClick={this.like.bind(this)}/>
            </div>
          </Col>

            </Row>





    );
  }
}


export default IdeaDetails;
