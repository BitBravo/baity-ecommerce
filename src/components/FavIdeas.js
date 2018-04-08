import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import FirestoreServices from './FirestoreServices'
import IdeaBrief from "./IdeaBrief";
import Loading from './Loading'
import {MdWeekend} from 'react-icons/lib/md';
import styled from 'styled-components'
import FirebasePaginator from './firebase-pag';
import InfiniteScroll from 'react-infinite-scroll-component';

const Button = styled.button`
background-color:transparent;
border:1px solid rgb(26, 156, 142); 
color:rgb(26, 156, 142);
  width:100px;
  height: 30px;
  @media only screen and (max-width: 767px) {
    height: 20px;
    width:40px;
    font-size:10px;
  `;

// const Button = styled.button`
// position:absolute;
// top:50px;
// left: 20px;
// width: 17%;
// @media only screen and (max-width: 767px) {
//   left: 20px;
//   top:70px;
//   width: 40%;
//   height: 40px;
// `;
const PAGE_SIZE = 12;
var options = {
  pageSize: PAGE_SIZE,
  finite: true,
  retainLastPage: false
};
var paginator;

class FavIdeas extends Component {
  constructor() {
    super();
    this.likedIdeas = this.likedIdeas.bind(this);
    this.state = {
      ideas: {},
      extraIdeas: [],
      loading: true,
      empty: true
    };
  }

  likedIdeas(val) {
    if(val){
      const ideaIds = Object.keys(val);
      ideaIds.map(id => {
        FirestoreServices.ideas.doc(id).get().then((snapshot) => {
          console.log(snapshot.data())
          var ideas = [...this.state.ideas, snapshot.data()]
          this.setState({ideas: ideas, loading: false, empty: false})
        });

      });
    }else {
      this.setState({loading: false, empty: true})
    }
  }

  componentWillMount() {
    this.listToArray = this.listToArray.bind(this)
    this.firebasePaginatorFiltering1 = this.firebasePaginatorFiltering.bind(this, ref)
    this.forwardFiltring = this.forwardFiltring.bind(this)

      if(this.props.shortList){
        FirebaseServices.likes.child(`${this.props.currentUser.uid}/ideas`).limitToLast(3).once("value", function (snapshot) {
          console.log(snapshot.val())
        }).then(snapshot => this.likedIdeas(snapshot.val()));


  } else {
    // this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/ideas`)
    // .then(val => this.likedIdeas(val))
    var ref = FirebaseServices.likes.child(`${this.props.currentUser.uid}/ideas`)
    paginator = new FirebasePaginator(ref, options)
    this.firebasePaginatorFiltering()
  }


  }

  componentWillUnmount() {
    this.userLikesRef && base.removeBinding(this.userLikesRef);
    if (paginator) {
      paginator.off('value', () => {
      });
    }
  }

  listToArray() {
    const ideas = this.state.ideas
    const ideaIds = Object.keys(ideas);

    var arr = [];
    ideaIds.reverse().map(id => {
      const idea = ideas[id];
      console.log("copy idea " + idea.id)
      arr.push(idea)
    });
    var list = []
    if (this.state.extraIdeas.length < 1) {
      list = arr.slice()
    }else {
      list = [...this.state.extraIdeas, ...arr.slice()]
    }
    this.setState({extraIdeas: list, loading: false})
  }

  firebasePaginatorFiltering() {
    var handler = ( () => {
      var ideaIds = (Object.keys(paginator.collection))
      console.log(ideaIds.length)
      if (ideaIds.length > 0){
        var newIdeas = {}
        const listPromises = ideaIds.map(id => {
          return FirestoreServices.ideas.doc(id).get().then(snapshot => {
            snapshot.data()
            newIdeas = [...newIdeas, snapshot.data()]
          })
        });

        const results = Promise.all(listPromises)
        results.then((snapshot) => {
          this.setState({ideas: newIdeas, empty: false})
          this.listToArray();

        })//results.then
      } //newIdeaIds.length
  })
    paginator.on('value', handler);
  }

  forwardFiltring(){
    paginator.previous()
    .then()
  }


  render() {
    const ideas = this.state.ideas;
    const ideaIds = Object.keys(ideas);



      if (this.state.loading)
      return(
       <Loading/>
      )
    else if (this.props.shortList){
      return (
         <Grid style={{backgroundColor:"white"}}>
        <Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >
        {this.state.empty
        ? <div><h2 style={{color:'rgb(26,156,142)'}}>الأفكار المفضلة</h2>
          <h5> ليس لديك أفكار مفضلة </h5> </div>
        : <div>
          <Col xs={2} md={3} lg={2} style={{margin: '20px 0 0 0'}} >
          <Link to={`/favideas`}>
            <Button>المزيد</Button>
          </Link>
          </Col>
          <Col xs={10} md={9} lg={10} >
          <Link  to={`/favideas`}>
            <h2 style={{color:'rgb(26,156,142)'}}>الأفكار المفضلة</h2> 
          </Link >
          </Col>
          </div>
        }

            {ideaIds.map(id => {
              const idea = ideas[id];
              return <IdeaBrief key={id} idea={idea} />;
            })}

            </Col>
          </Row>
        </Grid>
     );
  } else {
    var newIdeas = this.state.extraIdeas.slice()
    return (
      <Grid Grid style={{backgroundColor:"white"}}>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>

       <Col xs={12}  md={12} lg={12}>
       <InfiniteScroll style={{overflow:'none'}}
          hasMore={!paginator.isLastPage}
          next={ this.forwardFiltring}
        >
        <div style={{height:'70px'}}>
        <h2 style={{color:'rgb(26,156,142)',textAlign:'center'}}> <MdWeekend className="icons" style={{color:'rgb(26,156,142)'}}/> أفكاري المفضلة</h2>
        </div>
        <hr style={{marginBottom: '30px'}}/>
        {newIdeas.length < 1
        ?<h5 > ليس لديك أفكار مفضلة </h5>
        : null}
        {newIdeas.map((idea, index) => {
          return <IdeaBrief key={idea.id} idea={idea} />;
        })}
          </InfiniteScroll>

          </Col>
        </Row>

      </Grid>
   );
  }
  }
}

export default FavIdeas;
