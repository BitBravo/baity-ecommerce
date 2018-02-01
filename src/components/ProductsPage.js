import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,MenuItem ,Col,Row,ButtonToolbar,Nav,NavDropdown,Button,Image,Carousel,Grid} from "react-bootstrap";
import ProductList from './ProductList';
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
`

const PaddingDiv = styled.div`
  padding-right: 0px;
  padding-top: 20px;
  padding-left: 0;
  padding-bottom: 0;
`;

class ProductsPage extends Component {
   
    render() {

      return (
  <div>
      <Grid>
     <Row style={{display: 'flex', flexWrap: 'wrap'}}>

        <Col lg={4}  >
        {/* <ButtonToolbar >
    <DropdownButton

      bsStyle='background:rgb(26, 156, 142)'
      bsSize='width:1000px'
      title="التصنيف"
      id="dropdown-size-large"
    >  <span className="glyphicon glyphicon-search"></span>
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
  </ButtonToolbar>
  */}
 <PaddingDiv>
 <div className="inner-addon left-addon">
          <i className="glyphicon glyphicon-plus white" style={{padding:'20px'}} ></i>
  <Select name="selectThis" id="selectThis">
                    <option value="">التصنيف</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon">
          <i className="glyphicon glyphicon-plus white" style={{padding:'20px'}} ></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">القسم</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon">
          <i className="glyphicon glyphicon-plus white" style={{padding:'20px'}} ></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">السعر</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon">
          <i className="glyphicon glyphicon-plus white" style={{padding:'20px'}} ></i>
                <Select name="selectThis" id="selectThis">
                    <option value="">العلامة التجارية</option>
                    <option value=".option1">Option 1</option>
                    <option value=".option2">Option 2</option>
                    <option value=".option3">Option 3</option>
                    <option value=".option4">Option 4</option>
                </Select>
                </div>
                </PaddingDiv>
                <PaddingDiv>
                <div className="inner-addon left-addon">
          <i className="glyphicon glyphicon-plus white" style={{padding:'20px'}} ></i>
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
   <Col lg={8}>
      
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
   <ProductList thisUserOnly={false}/>
	</div>			
    
  );}}
  
  export default ProductsPage;