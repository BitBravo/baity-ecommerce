import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import carouselImage from "./assets/img/traditional-kitchen.jpg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header />
            <div><img src={carouselImage} style={{ maxWidth: "100%"}} /></div>
            <div className="workspace" />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
