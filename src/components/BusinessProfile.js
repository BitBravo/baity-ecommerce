import React, { Component } from "react";
import ProductList from "./ProductList";
import IdeaList from "./IdeaList";
import ProfileInfo from "./ProfileInfo";

class BusinessProfile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <ProfileInfo user={true} currentUser={this.props.match.params.id} />
        <ProductList
          user={true}
          thisUserOnly={true}
          shortList={true}
          currentUser={this.props.match.params.id}
          group={this.props.group}
        />
        <IdeaList
          user={true}
          thisUserOnly={true}
          shortList={true}
          currentUser={this.props.match.params.id}
          group={this.props.group}
        />
      </div>

    );
  }
}
export default BusinessProfile;
