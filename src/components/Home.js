import React from "react";
import ProductList from './ProductList'
import carouselImage from "../assets/img/traditional-kitchen.jpg";


const Home = () => (
  <div>
    <img src={carouselImage}  />
    <ProductList />
  </div>
);

export default Home;
