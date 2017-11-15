import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { app } from "./base"
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

// function createElement(Component, props) {
//   var key = Math.floor(Math.random() * 1000); // some key that changes across route changes
//   return <Component key={key} {...props} />;
// }

// const createElement = (Component, props) =>
// <Component key={props.params.id} {...props}/>;

// The webapp contains Header then Main then Footer. 
// Main will render Home when we choose the root '/' path.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
          authenticated: true
        })
      } else {
        this.setState({
          currentUser: null,
          authenticated: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    console.log("current user in App")
    console.log(this.state.currentUser)
    return (
      <BrowserRouter>
        <div style={{ margin: "0 auto" }}>
          <Header authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
          <Main setCurrentUser={this.setCurrentUser} authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
          <Footer authenticated={this.state.authenticated} currentUser={this.state.currentUser}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
