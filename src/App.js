import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { app, storageKey } from 'config/base';
import FirebaseServices from 'services/FirebaseServices';
import FirestoreServices from 'services/FirestoreServices';
import { routes } from './route';

const userStorageKey = `${storageKey}_USER`;
const groupStorageKey = `${storageKey}_GROUP`;
const userNameStorageKey = `${storageKey}_USERNAME`;
const userImgStorageKey = `${storageKey}_LOGO`;
const userRoleStorageKey = `${storageKey}_Role`;

const AppRoute = ({ component: Component, layout: Layout, parent: _Parent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props}  {..._Parent} adminRoute={false} />
        </Layout>
      )} />
  )
}


const AuthRoute = ({ component: Component, layout: Layout, parent: _Parent, adminRoute, ...rest }) => {
  console.log(_Parent)
  const {
    state: {
      authenticated: authFlag,
      admin,
    },
  } = _Parent;

  console.log(`User Role => auth: ${authFlag}, admin: ${admin}, AdminRoute: ${adminRoute}`)
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          {authFlag && (admin || !adminRoute) ?
            <Component {...props} {..._Parent} adminRoute={adminRoute} />
            :
            <Redirect
              to={{ pathname: '/login', state: { from: props.location, adminRoute } }}
              state = {_Parent.state}
            />
          }
        </Layout>
      )
      }
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      admin: false,
      userName: '',
      userImg: '',
      currentUser: null,
      group: null,
      cartCount: 0,
      owner: '',
    };
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.getCart = this.getCart.bind(this);
    this.clearLocalUserData = this.clearLocalUserData.bind(this);
  }


  componentWillMount() {
    console.log('Route Running... (app)');

    if (window.localStorage.getItem(userStorageKey)) {
      console.log('Parse user data from Storage ...');
      console.log(JSON.parse(window.localStorage.getItem(userStorageKey)));
      const user = JSON.parse(window.localStorage.getItem(userStorageKey));
      const admin = window.localStorage.getItem(userRoleStorageKey);
      this.setState(
        {
          currentUser: user,
          authenticated: true,
          group: window.localStorage.getItem(groupStorageKey),
          admin: window.localStorage.getItem(userRoleStorageKey),
          userImg: window.localStorage.getItem(userImgStorageKey),
        },
      );
    }

    // the current user is: firebase.auth().currentUser
    // For more info on firebase Auth object check the "user lifecycle" in:
    // (https://firebase.google.com/docs/auth/users)
    // Note that: app.auth() is short for firebase.auth(app)
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      console.log('user from firebase auth');
      console.log(user);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(`${this.constructor.name}.componentWillReceiveProps`);
    console.log(nextProps);
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  // For more info on user management in firebase see:
  // (https://firebase.google.com/docs/auth/web/manage-users)
  setCurrentUser(user, admin) {
    console.log('set current user function')
    if (user) {
      this.setState({ authenticated: true, admin })
      console.log('param updated')
      let owner;
      // cache user object to avoid firebase auth latency bug
      window.localStorage.setItem(userStorageKey, JSON.stringify(user));
      window.localStorage.setItem(userRoleStorageKey, admin);


      FirestoreServices.readDBRecord('group', user.uid).then((value) => {
        console.log(`User Group Data=> ${JSON.stringify(value)}`);

        if (value.group === 'prof') {
          owner = user.uid;
          FirestoreServices.businesses.where('owner', '==', owner)
            .onSnapshot((snapshot) => {
              snapshot.forEach((val) => {
                window.localStorage.setItem(userImgStorageKey, val.imgUrl);
                this.setState({
                  userImg: val.data().imgUrl,
                  owner,
                });
              });
            });

          FirestoreServices.readDBRecord('profUser', `${user.uid}`)
            .then((val) => {
              const name = typeof val === 'object' ? val.name : ''
              // cache username value and group value
              window.localStorage.setItem(groupStorageKey, value.group);
              window.localStorage.setItem(userNameStorageKey, name);

              this.setState({
                currentUser: user,
                authenticated: true,
                group: value.group,
                userName: val.name,
              });
              return this.getCart(user);
            });
        } else if (value.group === 'normal') {
          FirestoreServices.normalUsers.where('uid', '==', `${user.uid}`)
            .onSnapshot((snapshot) => {
              snapshot.forEach((val) => {
                window.localStorage.setItem(userImgStorageKey, val.imgUrl);
                this.setState({
                  userImg: val.data().imgUrl,
                });
              });
            });

          FirestoreServices.readDBRecord('normalUser', `${user.uid}`)
            .then((val) => {
              window.localStorage.setItem(groupStorageKey, val.group);
              window.localStorage.setItem(userNameStorageKey, val.name);
              this.setState({
                currentUser: user,
                authenticated: true,
                group: value.group,
                userName: val.name,
              });
              console.log(val.group)
              const b = this.getCart(user);
              return b;
            });
        }
        return true;
      }).catch((err) => {
        console.log('Get User Group ERROR')
        console.log(err)
      });
    } else {
      // No user is logged in
      this.clearLocalUserData();
    }
  }

  clearLocalUserData() {
    console.log('Local auth cache clearn up...')
    // 1- clean up auth cache
    window.localStorage.removeItem(userStorageKey);
    window.localStorage.removeItem(groupStorageKey);
    window.localStorage.removeItem(userNameStorageKey);
    window.localStorage.removeItem(userImgStorageKey);
    window.localStorage.removeItem(userRoleStorageKey);

    // 2- clean up state
    this.setState({
      currentUser: null,
      authenticated: false,
      admin: false,
      userName: '',
      cartCount: 0,
      userCart: '',
      userImg: '',
      owner: '',
    });
    return true;
  }

  getCart(user) {
    // get items in basket
    // FirestoreServices.getBasket()
    FirebaseServices.basket.child(`${user.uid}/items`).once('value', (snapshot) => {
      // Listen for document metadata changes
      console.log(`val.childCount ${snapshot.numChildren()}`);
      this.setState({
        cartCount: snapshot.numChildren(),
      });
      return snapshot.numChildren();

      // if (doc.exist){
      //   const currentCount = doc.exists ? doc.data().count : 0
      //   var count = Object.keys(doc.data().items)
      //   console.log("val.childCount " + count.length);
      //
      //   this.setState({cartCount: count.length})
      //   return docs.size
      // }
    });
  }

  updateCart(add, remove) {
    let newCount = 0;
    if (remove) {
      this.setState({ cartCount: newCount });
    } else {
      if (add) {
        newCount = this.state.cartCount + 1;
        console.log('Item added');
      } else {
        newCount = this.state.cartCount - 1;
        console.log('Item removed');
      }
      this.setState({ cartCount: newCount });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
            routes ?
              Object.keys(routes).map((routeName) => {
                switch (routeName) {
                  case 'publicRoutes': {
                    return routes[routeName].map((routeProps) => (
                      <AppRoute exact path={routeProps.path} {...routeProps} parent={this} />
                    ))
                  }
                  case 'authRoutes': {
                    return routes[routeName].map((routeProps) => (
                      <AuthRoute exact path={routeProps.path} {...routeProps} parent={this} adminRoute={false} />
                    ))
                  }
                  case 'adminRoute': {
                    return routes[routeName].map((routeProps) => (
                      <AuthRoute exact path={routeProps.path} {...routeProps} parent={this} adminRoute={true} />
                    ))
                  }
                }
              })
              :
              null
          }
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
