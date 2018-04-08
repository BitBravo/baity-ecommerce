import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { app } from "./base"
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import FirebaseServices from "./components/FirebaseServices";
import FirestoreServices from "./components/FirestoreServices";
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
    console.log(`${this.constructor.name}.constructor`);
    this.state = {
      authenticated: false,
      currentUser: null,
      group: null,
      userName: "",
      basket: {},
      cartCount: 0,

    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.getCart = this.getCart.bind(this)
    //this.updateCart = this.updateCart.bind(this);
  }

  // For more info on user management in firebase see:
  // (https://firebase.google.com/docs/auth/web/manage-users)
  setCurrentUser(user) {
    if (user) {
      FirestoreServices.readDBRecord('group', user.uid).then( value => {
        console.log(value.group)

        if (value.group === "prof") {
          FirestoreServices.readDBRecord('profUser', `${user.uid}`)
            .then(val => {
              this.setState({currentUser: user,
              authenticated: true,
              group: value.group,
              userName: val.name,
            })
            return this.getCart(user)
          })
        }else if (value.group === "normal"){
          FirestoreServices.readDBRecord('normalUser', `${user.uid}`)
            .then(val => {
              this.setState({currentUser: user,
              authenticated: true,
              group: value.group,
              userName: val.name,
              })
              var b = this.getCart(user)
              return b;
              })

        }
      })


      /*
        // We can get the folloiwng information. See: (https://firebase.google.com/docs/auth/web/manage-users)
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                          // this value to authenticate with your backend server, if
                          // you have one. Use User.getToken() instead.
        // This is the information for providers (email&password, facebook, google, ...etc)
        user.providerData.forEach(function (profile) {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      */


    } else {//No user is logged in
      this.setState({
        currentUser: null,
        authenticated: false,
        userName: "",
        cartCount: 0,
      })
    }
  }

getCart(user){
  console.log("val.childCount ");

  // get items in basket
  //FirestoreServices.getBasket()
  FirebaseServices.basket.child(`${user.uid}/items`).once('value', snapshot => {
    console.log("val.childCount " + snapshot.numChildren());
    this.setState({cartCount: snapshot.numChildren()})
    return snapshot.numChildren()

    // if (doc.exist){
    //   const currentCount = doc.exists ? doc.data().count : 0
    //   var count = Object.keys(doc.data().items)
    //   console.log("val.childCount " + count.length);
    //
    //   this.setState({cartCount: count.length})
    //   return docs.size
    // }
  })
}

updateCart(add, remove) {
  var newCount = 0
  if (remove)
    this.setState({cartCount: newCount})
  else {
    if(add){
      newCount = this.state.cartCount + 1
      console.log("Item added")
    }else {
      newCount = this.state.cartCount - 1
      console.log("Item removed")
    }
    this.setState({cartCount: newCount})
  }
}
  // method to update basket

  componentWillMount() {
    console.log(`${this.constructor.name}.componentWillMount`);
    //the current user is: firebase.auth().currentUser
    //For more info on firebase Auth object check the "user lifecycle" in:
    // (https://firebase.google.com/docs/auth/users)
    // Note that: app.auth() is short for firebase.auth(app)
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      this.setCurrentUser(user);
    })
  }

  componentWillUnmount() {
    console.log(`${this.constructor.name}.componentWillUnmount`);
    this.removeAuthListener();
  }

  componentDidMount(){
    console.log(`${this.constructor.name}.componentDidMount`);
  }
  componentWillReceiveProps(nextProps){
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
  }

  componentWillUpdate(){
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }

  render() {
    console.log(`${this.constructor.name}.render`);
    //console.log("current user in App")
    //console.log(this.state.currentUser)
    return (
      <BrowserRouter>
        <div style={{ margin: "0 auto" }}>
          <Header
            authenticated={this.state.authenticated}
            currentUser={this.state.currentUser}
            group={this.state.group}
            userName={this.state.userName}
            cart={this.state.cartCount}
            setCurrentUser={this.setCurrentUser}
          />
          <Main
            authenticated={this.state.authenticated}
            currentUser={this.state.currentUser}
            group={this.state.group}
            updateCart={this.updateCart.bind(this)}
            setCurrentUser={this.setCurrentUser}
          />
          <Footer
           authenticated={this.state.authenticated}
           currentUser={this.state.currentUser}
           group={this.state.group}
           userName={this.state.userName}
           />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
