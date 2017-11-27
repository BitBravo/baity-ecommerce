import React from "react";
import { Image,Carousel } from "react-bootstrap";
import ProductList from './ProductList';
import traditionalkitchen from '../assets/img/traditionalkitchen.jpg';
import bedroom from '../assets/img/bedroom.jpg';
import livingroom from '../assets/img/livingroom.jpg'; 


const Home = () => (
  <div>
    <div>
  <Carousel >
      <Carousel.Item>
        <div>
        <img  src={bedroom}     />
        <Carousel.Caption className="hero">
          <h3>First slide </h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <img  src= {traditionalkitchen}     />
        <Carousel.Caption className="hero">
          <h3>Second slide </h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img  src= {livingroom}   />
        <Carousel.Caption className="hero">
          <h3>Third slide </h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      
    </Carousel>
   </div>
   <h1> غير مزاجك واجعل منزلك أكثر جاذبية </h1>
    <ProductList thisUserOnly={false}/>
  </div>
  
);

export default Home;
