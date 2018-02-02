import React from "react";
import { Image,Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ProductList from './ProductList';
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg'; 
import styled from 'styled-components'


const Button = styled.button`
 width:30%;
 height:60px;
margin-top:30px;
font-size: 30px;
@media only screen and (max-width: 767px) {
  width:45%;
  height:40px;
  font-size: 25px;
  margin-top:20px;
}
 `
const Home = () => (
  <div>
    <div>
  <Carousel >
      <Carousel.Item>
        <div>
        <img  src={bedroom}     />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          <LinkContainer to="/registration" activeClassName="active">
          <Button>
            ابدأ معنا
            </Button>
            </LinkContainer>
        </Carousel.Caption>
        
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <img  src= {traditionalkitchen}     />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          <LinkContainer to="/registration" activeClassName="active">
          <Button>
            ابدأ معنا
            </Button>
            </LinkContainer>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img  src= {livingroom}   />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          <LinkContainer to="/registration" activeClassName="active">
          <Button>
            ابدأ معنا
            </Button>
            </LinkContainer>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      
    </Carousel>
   </div>
   
    <ProductList thisUserOnly={false}/>
  </div>
  
);

export default Home;
