import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from './components/ProductList'
import ProductAdder from './components/ProductAdder'
import carouselImage from "./assets/img/traditional-kitchen.jpg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
class App extends Component {
  render() {
    return (
      <div style={{ margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/newproduct" render={(props) => {
                  return <ProductAdder setCurrentUser={this.setCurrentUser} {...props} />
                }} />
            <div><img src={carouselImage} style={{ maxWidth: "100%", maxHeight: "50%"}} /></div>
            <ProductList/>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
