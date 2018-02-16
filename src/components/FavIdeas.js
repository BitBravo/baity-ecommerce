import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import IdeaBrief from "./IdeaBrief";
import Loading from './Loading'


class FavIdeas extends Component {
  constructor() {
    super();
    this.likedIdeas = this.likedIdeas.bind(this);
    this.state = {
      ideas: {},
      loading: true
    };
  }

  likedIdeas(val) {
    if(val){
      const ideaIds = Object.keys(val);
      ideaIds.map(id => {
        FirebaseServices.ideas.child(id).once("value", (snapshot) => {
          console.log(snapshot.val())
          var ideas = [...this.state.ideas, snapshot.val()]
          this.setState({ideas: ideas, loading: false})
        });

      });
    }else {
      this.setState({loading: false})
    }
  }

  componentWillMount() {
      if(this.props.shortList){
        FirebaseServices.likes.child(`${this.props.currentUser.uid}/ideas`).limitToLast(3).once("value", function (snapshot) {
          console.log(snapshot.val())
        }).then(snapshot => this.likedIdeas(snapshot.val()));


  } else {
    this.userLikesRef = FirebaseServices.readDBRecord('likes', `${this.props.currentUser.uid}/ideas`)
    .then(val => this.likedIdeas(val))
  }


  }

  componentWillUnmount() {
    this.userLikesRef && base.removeBinding(this.userLikesRef);
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
        <Col sm={12}  lg={12}>  <hr/>
          <Link  to={`/favideas`}>
          <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}>الأفكار المفضلة</h2>
          </Link >
          
            {ideaIds.map(id => {
              const idea = ideas[id];
              return <IdeaBrief key={id} idea={idea} />;
            })}
            </Col>
          </Row>
        </Grid>
     );
  } else {
    return (
       
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col sm={12}  lg={12}>
          {ideaIds.map(id => {
            const idea = ideas[id];
            return <IdeaBrief key={id} idea={idea} />;
          })}
           </Col>
        </Row>
      </Grid>
   );
  }
  }
}

export default FavIdeas;
