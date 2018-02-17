import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import IdeaBrief from "./IdeaBrief";
import Loading from './Loading'
import {MdWeekend} from 'react-icons/lib/md';
import styled from 'styled-components'

const Button = styled.button`
width:180px;
@media only screen and (max-width: 767px) {
  height: 30px;
  width:100%;
`;

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
    this.ideasRef && base.removeBinding(this.ideasRef);
  }

  render() {
    const ideas = this.state.ideas;
    const ideaIds = Object.keys(ideas);



      if (this.state.loading)
      return(
       <Loading />
      )
    else if (this.props.shortList){
      return (

        <Grid style={{backgroundColor:"white"}}>
         {this.props.group === 'prof'
        ?<Row   style={{display: 'flex', flexWrap: 'wrap'}}>
        <Col xs={12}  lg={12} >  
        <hr/>
        <Col xs={5} md={3} lg={2} > 
        <Link to={`/newidea`}>
            <Button>إضافة فكرة<MdWeekend className="icons"/></Button>
          </Link>
          </Col>
          <Col xs={7} md={9} lg={10} > 
          <Link to={`/myideas`}>
          <h2 style={{color:'rgb(26,156,142)'}}>أفكاري</h2>
          </Link>
          </Col> 
          </Col>
      </Row>
         :<Row style={{display: 'flex', flexWrap: 'wrap'}}>
           <Link  to={`/favideas`}>
           <h2 style={{color:'rgb(26,156,142)',padding:"10px"}}>الأفكار المفضلة</h2>
           </Link >
            </Row>
          }
          <Row style={{display: 'flex', flexWrap: 'wrap'}}>
            {ideaIds.map(id => {
              const idea = ideas[id];
              return <IdeaBrief key={id} idea={idea} />;
            })}
          </Row>
        </Grid>
  
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
