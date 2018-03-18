import React, { Component } from "react";
import IdeaList from "./IdeaList";
import {MdWeekend} from 'react-icons/lib/md';
import styled from 'styled-components'
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Idea from '../assets/img/Selected-idea.png';

const IconImg = styled.img`
width:40px;
 height:40px;`
const Button = styled.button`
position:absolute;
top:50px;
left: 20px;
width: 17%;
@media only screen and (max-width: 767px) {
  left: 20px;
  top:70px;
  width: 40%;
  height: 30px;
`;

function MyIdeaList(props) {
    return (
        <Grid Grid style={{backgroundColor:"white"}}>
        <Row style={{display: 'flex', flexWrap: 'wrap'}}>
       <Col sm={12}  lg={12}>
        <div style={{height:'100px'}}>
        <h1 style={{color:'rgb(26,156,142)'}}> <IconImg src={Idea} className="icons"/> أفكاري</h1>
        <Link to={`/newidea/`}>
              <Button>اضافة فكرة</Button>
            </Link>
        </div>
        <hr style={{marginBottom: '30px'}}/>
        <IdeaList thisUserOnly={true} currentUser={props.currentUser}/>
        </Col>  
        </Row>
      </Grid>);
}
export default MyIdeaList;
