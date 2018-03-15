import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import ProductsPage from"./ProductsPage";
import IdeasPage from"./IdeasPage";
import Login from "./Login";
import Register from "./Register";
import RegisterNormal from "./RegisterNormal";
import UserTypeSelector from "./UserTypeSelector";
import Logout from "./Logout";
import ProductDetails from "./ProductDetails";
import ProductUpdater from "./ProductUpdater";
import MyProductList from './MyProductList';
import IdeaDetails from "./IdeaDetails";
import IdeaUpdater from "./IdeaUpdater";
import MyIdeaList from './MyIdeaList';
import MyAccount from "./MyAccount";
import ProfProfileUpdater from './ProfProfileUpdater'
import NorProfileUpdater from './NorProfileUpdater'
import Registration from "./Registration";
import FavProducts from "./FavProducts";
import FavIdeas from "./FavIdeas";
import BusinessProfile from "./BusinessProfile"
import PasswordResetter from "./PasswordResetter"
import BusinessIdeas from "./BusinessIdeas"
import BusinessProducts from "./BusinessProducts"
import MyCart from "./MyCart"


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
          <Route exact
          path="/"
          render={props => {
            return (
            <Home
          currentUser={this.props.currentUser}
          authenticated={this.props.authenticated}
          />);}}
          />
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
            path="/registration"
            render={props => {
              return (
                <Registration
                />
              );
            }}
          />
          <Route
            exact
            path="/registerProf"
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
            path="/registerNormal"
            render={props => {
              return (
                <RegisterNormal
                  currentUser={this.props.currentUser}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/resetpassword"
            render={props => {
              return (
                <PasswordResetter
                />
              );
            }}
          />
          <Route
            exact
            path="/:owner/products/:id"
            render={props => {
              return (
                <ProductDetails
                authenticated={this.props.authenticated}
                  currentUser={this.props.currentUser}
                  updateCart={this.props.updateCart}
                  {...props}
                />
              );
            }}
          />
          <Route
            exact
            path="/:owner/ideas/:id"
            render={props => {
              return (
                <IdeaDetails
                authenticated={this.props.authenticated}
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

          <AuthenticatedRoute
            exact
            path="/newidea"
            authenticated={this.props.authenticated}
            component={IdeaUpdater}
            currentUser={this.props.currentUser}
          />
        <AuthenticatedRoute
            exact
            path="/mybasket"
            authenticated={this.props.authenticated}
            component={Basket}
            currentUser={this.props.currentUser}
            updateCart={this.updateCart}
          />

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
            path="/mycart"
            render={props => {
              return (
                <MyCart
                />
              );
            }}
          />

          <Route
           exact
           path="/productspage"
           render={props => {
             return (
               <ProductsPage
               />

             );
           }}
          />

          <Route
           exact
           path="/ideaspage"
           render={props => {
             return (
               <IdeasPage
               />

             );
           }}
          />

          <Route
           exact
           path="/businessprofile/:id"
           render={props => {
             return (
               <BusinessProfile {...props}
               />

             );
           }}
          />

          <Route
           exact
           path="/:id/products"
           render={props => {
             return (
               <BusinessProducts {...props}
               />

             );
           }}
          />

          <Route
           exact
           path="/:id/ideas"
           render={props => {
             return (
               <BusinessIdeas {...props}
               />

             );
           }}
          />

          <AuthenticatedRoute
           exact
            path="/ideas/:id/updateIdea"
            authenticated={this.props.authenticated}
            component={IdeaUpdater}
             currentUser={this.props.currentUser}
          />
          <AuthenticatedRoute
            exact
             path="/myideas"
             authenticated={this.props.authenticated}
             component={MyIdeaList}
              currentUser={this.props.currentUser}
           />
           <AuthenticatedRoute
             exact
              path="/myprofile"
              authenticated={this.props.authenticated}
              component={MyAccount}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
            <AuthenticatedRoute
              exact
               path="/updateprofile"
               authenticated={this.props.authenticated}
               component={NorProfileUpdater}
               currentUser={this.props.currentUser}
            />
            <AuthenticatedRoute
              exact
               path="/favproducts"
               authenticated={this.props.authenticated}
               component={FavProducts}
               currentUser={this.props.currentUser}
               group={this.props.group}
               shortList={false}
            />
            <AuthenticatedRoute
              exact
               path="/favideas"
               authenticated={this.props.authenticated}
               component={FavIdeas}
               currentUser={this.props.currentUser}
               group={this.props.group}
               shortList={false}
            />

        </Switch>
      </main>
    );
  }
}

export default Main;
