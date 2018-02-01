import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import ProductsPage from"./ProductsPage";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import ProductDetails from "./ProductDetails";
import ProductUpdater from "./ProductUpdater";
import MyProductList from './MyProductList';
import ProfProfileUpdater from './ProfProfileUpdater'
import Registration from "./Registration";

function AuthenticatedRoute({ component: Component, authenticated, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component currentUser={currentUser} {...props} {...rest} />
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
    console.log(`${this.constructor.name}.constructor`);
  }

  componentWillMount(){
    console.log(`${this.constructor.name}.componentWillMount`);
  }
  componentDidMount(){
    console.log(`${this.constructor.name}.componentDidMount`);
  }
  componentWillReceiveProps(nextProps){
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
  }
  componentWillUnmount(){
    console.log(`${this.constructor.name}.componentWillUnmount`);
  }
  componentWillUpdate(){
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }

  render() {
    console.log(`${this.constructor.name}.render`);
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
            component={ProductUpdater}     
            currentUser={this.props.currentUser}   
          />
          {/* <AuthenticatedRoute
            exact
            path="/myprofprofile"
            authenticated={this.props.authenticated}    
            component={ProfProfileUpdater}     
            currentUser={this.props.currentUser}   
            
          /> */}

          <Route
            exact
            path="/myprofprofile"
            render={props => {
              return (
                this.props.authenticated === true ? (
                  <ProfProfileUpdater currentUser={this.props.currentUser} {...props}  />
                ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
                )
              )}
            }
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
           <Route
            exact
            path="/productspage"
            render={props => {
              return (
                <ProductsPage
                  currentUser={this.props.currentUser}
                  {...props}
                />
               
              );
            }}
          />
           <Route
            exact
            path="/registration"
            render={props => {
              return (
                <Registration
                  currentUser={this.props.currentUser}
                  {...props}
                />
              );
            }}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
