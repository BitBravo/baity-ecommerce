import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

import ProductAdder from "./ProductAdder";
import ProductDetails from "./ProductDetails";
import ProductUpdater from "./ProductUpdater";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/newproduct"
        render={props => {
          return (
            <ProductAdder setCurrentUser={this.setCurrentUser} {...props} />
          );
        }}
      />
      <Route
        exact
        path="/products/:id"
        render={props => {
          return (
            <ProductDetails setCurrentUser={this.setCurrentUser} {...props} />
          );
        }}
      />
      <Route
        exact
        path="/products/:id/updateProduct"
        render={props => {
          return (
            <ProductUpdater setCurrentUser={this.setCurrentUser} {...props} />
          );
        }}
      />
    </Switch>
  </main>
);

export default Main;
