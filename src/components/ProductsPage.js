import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownButton,MenuItem ,Col,Row,ButtonToolbar,
  NavDropdown,Button,Image,Carousel,Grid,Panel} from "react-bootstrap";
import ProductList from './ProductList';
import styled from 'styled-components'
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg';


// const Select = styled.select`
// background-color: rgb(26, 156, 142);
// color:white;
// font-size:20px;
// padding-right:10px;
// border:0;
// width:100%;
// height:60px;
// border-radius: 0;
// -webkit-appearance: none;
// @media only screen and (max-width: 767px) {
//   font-size:15px;
// }

// `

const PaddingDiv = styled.div`
  padding:10px 0 0 0;

  @media only screen and (max-width: 767px) {
    display:inline-block;
    width:19%;
   
`;

class ProductsPage extends Component {
   
    render() {

      return (
  <div>
      <Grid>
     <Row style={{display: 'flex', flexWrap: 'wrap'}}>
     
        <Col lg={2} sm={2} xs={12}  >
        
        <PaddingDiv>
        <Panel header="التصنيف" collapsible >
        <div className="form-check">
  <input  type="checkbox" value="" id="defaultCheck1"/>
  <span for="defaultCheck1">
    Default checkbox
  </span>
</div>
       </Panel> </PaddingDiv> <PaddingDiv>
       <Panel header="القسم"  collapsible>
       Some words
       </Panel> </PaddingDiv> <PaddingDiv>
       <Panel header="السعر"  collapsible>
       Some words
       </Panel> </PaddingDiv> <PaddingDiv>
       <Panel header="المصنع"  collapsible>
       Some words
       </Panel> </PaddingDiv> <PaddingDiv>
       <Panel header="الطراز"  collapsible>
       Some words
       </Panel>
          </PaddingDiv>
          
   </Col>
  
   <Col lg={10} sm={10} xs={12} >
      
      
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
    </Col> </Row>
   </Grid>
  
   
   <ProductList thisUserOnly={false}/>
 
	</div>			
    
  );}}
  
  export default ProductsPage;