import React from "react";
import ProductList from './ProductList'
import carouselImage from "../assets/img/traditional-kitchen.jpg";


const Home = () => (
  <div>
    <img src={carouselImage} style={{ maxWidth: "100%", maxHeight: "50%" }} />
    <ProductList />
  </div>
);

export default Home;
