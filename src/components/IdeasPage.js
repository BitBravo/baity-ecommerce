import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,MenuItem ,Col,Row,ButtonToolbar,Nav,NavDropdown,Button,Image,Carousel,Grid} from "react-bootstrap";
import IdeaList from './IdeaList';
import styled from 'styled-components'
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg';
import CaroselImg from '../assets/img/CaroselImg.jpg'; 

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;
const DPreviewImg = styled.img`
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 375px) {
display:none;}
`;
const MPreviewImg = styled.img`
display:none;
@media only screen and (max-width: 375px) {
  display:block;
  width: 100%;
  height: 100%;
  
`;
const SMPreviewImg = styled.img`
display:none;
@media only screen and (max-width: 320px) {
  display:block;
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
height: 100%;
`;

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
const CarouselDiv = styled(Col)`
padding-left:15px;
padding-right:15px;
@media only screen and (max-width: 767px) {
  padding-left:0;
  padding-right:0;
`

class IdeasPage extends Component {

    render() {

      return (
  <div>
      <Grid>
     <Row style={{display: 'flex', flexWrap: 'wrap'}}>
     <CarouselDiv sm={12} xs={12} lg={12} >

  
   <Carousel indicators={false}>
       <Carousel.Item>
         <div>
         <ImageContainer>
             <ImageDiv>
             <PreviewImg  src= {CaroselImg}/>
         </ImageDiv>
         </ImageContainer>
         </div>
       </Carousel.Item>
       <Carousel.Item>
         <div>
         <ImageContainer>
             <ImageDiv>
               <PreviewImg  src= {livingroom}/>
         </ImageDiv>
         </ImageContainer>
         </div>
       </Carousel.Item>
       <Carousel.Item>
       <div>
       <ImageContainer>
             <ImageDiv>
               <PreviewImg src={bedroom}/>
         </ImageDiv>
         </ImageContainer>
         </div>
       </Carousel.Item>
       
     </Carousel>

</CarouselDiv>
   </Row>
   </Grid>
   <IdeaList thisUserOnly={false}/>
	</div>

  );}}

  export default IdeasPage;
