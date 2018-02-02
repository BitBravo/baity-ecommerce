import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import IdeaBrief from "./IdeaBrief";
import Loading from './Loading'


class IdeaList extends Component{
  constructor() {
    super();
    this.state = {
      ideas: {},
      loading: true
    };
  }

  componentWillMount() {
    if (this.props.thisUserOnly){
      if(this.props.shortList){
      this.ideassRef = base.syncState(FirebaseServices.IDEAS_PATH, {
        context: this,
        state: "ideas",
        queries: {
          orderByChild: 'owner',
          limitToLast: 3,
          equalTo: this.props.currentUser.uid
        },
        then(data) {
        this.setState({loading: false})
        },
        onFailure(error) {
        this.setState({errorHandling: {showError: true, errorMsg: error}});
        }
      });
  } else {
    this.ideassRef = base.syncState(FirebaseServices.IDEAS_PATH, {
      context: this,
      state: "ideas",
      queries: {
        orderByChild: 'owner',
        equalTo: this.props.currentUser.uid
      },
      then(data) {
      this.setState({loading: false})
      },
      onFailure(error) {
      this.setState({errorHandling: {showError: true, errorMsg: error}});
      }
    });
  }
  } else {
        this.ideasRef = base.syncState(FirebaseServices.IDEAS_PATH, {
          context: this,
          state: "ideas",
          then(data) {
          this.setState({loading: false})
          },
          onFailure(error) {
          this.setState({errorHandling: {showError: true, errorMsg: error}});
          }
    });
  }

  }

  componentWillUnmount() {
    this.ideasRef && base.removeBinding(this.ideaqsRef);
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

         <div style={{paddingTop: "30px"}}>
        <Grid>
        <Row>
        <Link to={`/myideas/`}>
            <label>أفكاري</label>
          </Link>
          <Link to={`/newidea`}>
            <button>إضافة فكرة</button>
          </Link>
        </Row>
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
            {ideaIds.map(id => {
              const idea = ideas[id];
              return <IdeaBrief key={id} idea={idea} />;
            })}
          </Row>
        </Grid>
      </div>
    );
  } else {
    return (
       <div style={{paddingTop: "30px"}}>
      <Grid>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
          {ideaIds.map(id => {
            const idea = ideas[id];
            return <IdeaBrief key={id} idea={idea} />;
          })}
        </Row>
      </Grid>
    </div>
  );
  }
  }
}

export default IdeaList;
