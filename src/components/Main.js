import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import ProductAdder from "./ProductAdder";
import ProductDetails from "./ProductDetails";
import ProductUpdater from "./ProductUpdater";
import MyProductList from './MyProductList';
import ProfProfileUpdater from './ProfProfileUpdater'

function AuthenticatedRoute({ component: Component, authenticated, ...rest }) {
  console.log(authenticated)
  console.log(rest)
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
    />
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log("current user in Main")
    //console.log(this.props.currentUser)
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} currentUser={this.props.currentUser}/>
          <Route
            exact
            path="/login"
            render={props => {
              return (
                <Login  currentUser={this.props.currentUser} {...props} />
              );
            }}
          />
          <Route
            exact
            path="/register"
            render={props => {
              return (
                <Register
                  currentUser={this.props.currentUser}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/logout"
            render={props => {
              return <Logout  {...props} />;
            }}
          />
          <AuthenticatedRoute
            exact
            path="/newproduct"
            authenticated={this.props.authenticated}    
            component={ProductAdder}     
            currentUser={this.props.currentUser}   
          />
          <Route
            exact
            path="/myprofprofile"
            render={props => {
              return <ProfProfileUpdater  {...props} />;
            }}
          />
          {/* <AuthenticatedRoute
            exact
            path="/myprofile"
            authenticated={this.props.authenticated}    
            component={ProfForm}     
            currentUser={this.props.currentUser}   
          /> */}
          <AuthenticatedRoute
            exact
            path="/products/:id"
            authenticated={this.props.authenticated}
            component={ProductDetails}
            currentUser={this.props.currentUser}
          />
          <AuthenticatedRoute
            exact
            path="/products/:id/updateProduct"
            authenticated={this.props.authenticated}
            component={ProductUpdater}
            currentUser={this.props.currentUser}
          />
          <AuthenticatedRoute
            exact
            path="/myproducts"
            authenticated={this.props.authenticated}
            component={MyProductList}
            currentUser={this.props.currentUser}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
