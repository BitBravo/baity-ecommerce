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
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          {/* <p>غير مزاجك واجعل منزلك أكثر جاذبية </p> */}
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
        <img  src= {traditionalkitchen}     />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          {/* <p>غير مزاجك واجعل منزلك أكثر جاذبية </p> */}
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
        <img  src= {livingroom}   />
        <Carousel.Caption className="hero">
          <h3>غير مزاجك واجعل منزلك أكثر جاذبية </h3>
          {/* <p>غير مزاجك واجعل منزلك أكثر جاذبية </p> */}
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      
    </Carousel>
   </div>
   
    <ProductList thisUserOnly={false}/>
  </div>
  
);

export default Home;
