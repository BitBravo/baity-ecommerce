import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ margin: "0 auto" }}>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
