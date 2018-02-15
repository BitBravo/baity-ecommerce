import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,MenuItem ,Col,Row,ButtonToolbar,
  NavDropdown,Button,Image,Carousel,Grid} from "react-bootstrap";
import ProductList from './ProductList';
import styled from 'styled-components'
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg';

const PreviewImg = styled.img`
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
  font-size:11px;
  height:30px;
  padding-right:5px;
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
    padding-left:3px;
    padding-bottom: 10px;}
`;

class ProductsPage extends Component {
   
    render() {

      return (
  <div>
      <Grid>
     <Row style={{display: 'flex', flexWrap: 'wrap'}}>
     
        <Col sm={4} xs={12} >
      
 <PaddingDiv>
 <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">التصنيف</option>
                    <option value=".option1">طاولة طعام</option>
                    <option value=".option2">طقم كنب</option>
                    <option value=".option3">ورق جدران</option>
                    <option value=".option4">طاولة شاي</option>
                    <option value=".option4">أدوات صحية</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">القسم</option>
                    <option value=".option1">دورات مياه</option>
                    <option value=".option2">مجلس</option>
                    <option value=".option3">مطابخ</option>
                    <option value=".option4">غرف نوم</option>
                    <option value=".option4">صالة</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus"></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">السعر</option>
                    <option value=".option1">100-500</option>
                    <option value=".option2">500-1000</option>
                    <option value=".option3">1000-5000</option>
                    <option value=".option4">5000-10000</option>
                    <option value=".option4">أعلى من 10000</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus"  ></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">الشركة</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon ">
          <i className="glyphicon glyphicon-plus white plus" ></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">الطراز</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv> 
          
   </Col>
  
   <Col sm={8} xs={12} >
      
      <div>
  <Carousel >
      <Carousel.Item>
        <div>
        <ImageContainer>
            <ImageDiv>
              <PreviewImg  src= {traditionalkitchen} />
        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>
        
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <ImageContainer>
            <ImageDiv>
              <PreviewImg  src= {livingroom}/>
        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
      <ImageContainer>
            <ImageDiv>
              <PreviewImg src={bedroom}/>
     
        </ImageDiv>
        </ImageContainer>
        <Carousel.Caption className="hero">
          <h2>غير مزاجك واجعل منزلك أكثر جاذبية </h2>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      
    </Carousel>
   </div>
   </Col>
   </Row>
   </Grid>
   <ProductList thisUserOnly={false}/>
   
	</div>			
    
  );}}
  
  export default ProductsPage;