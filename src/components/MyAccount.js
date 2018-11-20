import React, { Component } from "react";
import ProductList from "./ProductList";
import IdeaList from "./IdeaList";
import ProfileInfo from "./ProfileInfo";
import NormalProfileInfo from "./NormalProfileInfo";
import FavProducts from "./FavProducts";
import FavIdeas from "./FavIdeas";
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
