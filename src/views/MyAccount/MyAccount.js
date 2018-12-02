import React, { Component } from "react";
import ProductList from "components/ProductList";
import IdeaList from "components/IdeaList";
import ProfileInfo from "components/ProfileInfo";
import NormalProfileInfo from "components/NormalProfileInfo";
import FavProducts from "views/FavProducts";
import FavIdeas from "views/FavIdeas";
import _ from 'lodash'

class MyAccount extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.group === "prof" ?
          <div>
            <ProfileInfo currentUser={this.props.currentUser} />
            <ProductList
              thisUserOnly={true}
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
            <IdeaList
              thisUserOnly={true}
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
          </div>
          : <div>
            <NormalProfileInfo currentUser={this.props.currentUser} />
            <FavProducts
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
            <FavIdeas
              shortList={true}
              currentUser={this.props.currentUser}
              group={this.props.group}
            />
          </div>
        }
      </div>
    );
  }
}

export default MyAccount;
