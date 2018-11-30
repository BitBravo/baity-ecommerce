import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from 'commons/Loading'
import { app } from 'config/base'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut().then((user, error) => {
      const { clearLocalUserData } = this.props;
      clearLocalUserData();
      this.setState({ redirect: true })
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <Loading />
      </div>
    )
  }
}

export default Logout
