import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { app, storageKey } from "./base"
import Header from "components/Header";
import Main from "components/Main";
import Footer from "components/Footer";
import FirebaseServices from "services/FirebaseServices";
import FirestoreServices from "services/FirestoreServices";
import "./App.css";

const userStorageKey = storageKey + '_USER';
const groupStorageKey = storageKey + '_GROUP';
const userNameStorageKey = storageKey + '_USERNAME';
const userImgStorageKey = storageKey + '_LOGO';
// function createElement(Component, props) {
//   var key = Math.floor(Math.random() * 1000); // some key that changes across route changes
//   return <Component key={key} {...props} />;
// }

// const createElement = (Component, props) =>
// <Component key={props.params.id} {...props}/>;

// The webapp contains Header then Main then Footer.
// Main will render Home when we choose the root '/' path.
class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
      group: null,
      userName: "",
      basket: {},
      userCart: "",
      cartCount: 0,
      userImg: "",
      owner: ""

    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.getCart = this.getCart.bind(this)
  }

  // For more info on user management in firebase see:
  // (https://firebase.google.com/docs/auth/web/manage-users)
  setCurrentUser(user) {
    if (user) {
      var owner;
      // cache user object to avoid firebase auth latency bug
      window.localStorage.setItem(userStorageKey, JSON.stringify(user));

      FirestoreServices.readDBRecord('group', user.uid).then(value => {
        console.log(value)
        console.log(value.group)

        if (value.group === "prof") {
          owner = user.uid
          var ref = FirestoreServices.businesses.where("owner", "==", owner)
            .onSnapshot(snapshot => {
              snapshot.forEach(val => {
                window.localStorage.setItem(userImgStorageKey, val.imgUrl);
                this.setState({
                  userImg: val.data().imgUrl,
                  owner: owner
                })
              })
            })
          console.log("value.group")
          FirestoreServices.readDBRecord('profUser', `${user.uid}`)
            .then(val => {
              //cache username value and group value
              window.localStorage.setItem(groupStorageKey, value.group);
              window.localStorage.setItem(userNameStorageKey, val.name);

              this.setState({
                currentUser: user,
                authenticated: true,
                group: value.group,
                userName: val.name,
              })
              return this.getCart(user)
            })


        } else if (value.group === "normal") {
          var ref = FirestoreServices.normalUsers.where("uid", "==", `${user.uid}`)
            .onSnapshot(snapshot => {
              snapshot.forEach(val => {
                window.localStorage.setItem(userImgStorageKey, val.imgUrl);
                this.setState({
                  userImg: val.data().imgUrl
                })
              })
            })
          FirestoreServices.readDBRecord('normalUser', `${user.uid}`)
            .then(val => {
              //cache username value and group value
              window.localStorage.setItem(groupStorageKey, val.group);
              window.localStorage.setItem(userNameStorageKey, val.name);

              this.setState({
                currentUser: user,
                authenticated: true,
                group: val.group,
                userName: val.name,
              })
              var b = this.getCart(user)
              return b;
            })

        }
      }
      )
    }

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



    else { //No user is logged in
      // 1- clean up auth cache
      window.localStorage.removeItem(userStorageKey);
      window.localStorage.removeItem(groupStorageKey);
      window.localStorage.removeItem(userNameStorageKey);
      window.localStorage.removeItem(userImgStorageKey);

      // 2- clean up state
      this.setState({
        currentUser: null,
        authenticated: false,
        userName: "",
        cartCount: 0,
        userCart: "",
        userImg: "",
        owner: ""
      })
    }
  }

  getCart(user) {
    // get items in basket
    //FirestoreServices.getBasket()
    FirebaseServices.basket.child(`${user.uid}/items`).once('value', snapshot => {
      // Listen for document metadata changes
      console.log("val.childCount " + snapshot.numChildren());
      this.setState({
        cartCount: snapshot.numChildren()
      })
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
      this.setState({ cartCount: newCount })
    else {
      if (add) {
        newCount = this.state.cartCount + 1
        console.log("Item added")
      } else {
        newCount = this.state.cartCount - 1
        console.log("Item removed")
      }
      this.setState({ cartCount: newCount })
    }
  }
  // method to update basket

  componentWillMount() {
    console.log(`${this.constructor.name}.componentWillMount`);
    // Due to the fact that the rendering of App component may happen before 
    // the authentication with firebase is done, and since this may cause
    // a problem when a logged in user refreshes his page, we need to cache the auth
    // data in the local browser storage to retrieve it synchronously before
    // rendering the component
    if (window.localStorage.getItem(userStorageKey)) {
      console.log('user from local storage after parse')
      console.log(JSON.parse(window.localStorage.getItem(userStorageKey)))
      this.setState(
        {
          currentUser: JSON.parse(window.localStorage.getItem(userStorageKey)),
          authenticated: true,
          group: window.localStorage.getItem(groupStorageKey),
          userImg: window.localStorage.getItem(userImgStorageKey),
        }
      )
    }
    //the current user is: firebase.auth().currentUser
    //For more info on firebase Auth object check the "user lifecycle" in:
    // (https://firebase.google.com/docs/auth/users)
    // Note that: app.auth() is short for firebase.auth(app)
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      console.log('user from firebase auth')
      console.log(user)
      this.setCurrentUser(user);
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log('nextProps')
    console.log(nextProps)
  }

  componentWillUpdate() {
    console.log(`${this.constructor.name}.componentWillUpdate`);
  }

  render() {
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
            userImg={this.state.userImg}
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
            userImg={this.state.userImg}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
