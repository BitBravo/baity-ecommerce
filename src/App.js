import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";


// The webapp contains Header then Main then Footer. 
// Main will render Home when we choose the root '/' path.
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
