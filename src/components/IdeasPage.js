import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,MenuItem ,Col,Row,ButtonToolbar,Nav,NavDropdown,Button,Image,Carousel,Grid} from "react-bootstrap";
import IdeaList from './IdeaList';
import styled from 'styled-components'
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg';
import plus from '../assets/img/plus.png';


const Select = styled.select`
background-color: rgb(26, 156, 142);
color:white;
font-size:20px;
padding-right:10px;
border:0;
width:100%;
height:60px;
border-radius: 0;
-webkit-appearance: none;
@media only screen and (max-width: 767px) {
  font-size:15px;
}

`

const PaddingDiv = styled.div`
  padding-right: 0px;
  padding-top: 20px;
  padding-left: 0;
  padding-bottom: 0;
  @media only screen and (max-width: 767px) {
    display:inline-block;
    width:20%;
    font-size:10px;
    padding-left: 5px;
    padding-bottom: 10px;}
`;

class IdeasPage extends Component {

    render() {

      return (
  <div>
      <Grid>
     <Row style={{display: 'flex', flexWrap: 'wrap'}}>
   <Col sm={12} xs={12} lg={12} >

      <div>
  <Carousel >
      <Carousel.Item>
        <div>
        <img  src={bedroom}     />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
        </Carousel.Caption>

        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <img  src= {traditionalkitchen}     />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img  src= {livingroom}   />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
        </Carousel.Caption>
        </div>
      </Carousel.Item>

    </Carousel>
   </div>
</Col>
   </Row>
   </Grid>
   <IdeaList thisUserOnly={false}/>
	</div>

  );}}

  export default IdeasPage;
