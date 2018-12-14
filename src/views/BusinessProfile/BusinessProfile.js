import React, { Component } from "react";
import ProductList from "components/ProductList";
import IdeaList from "components/IdeaList";
import ProfileInfo from "components/ProfileInfo";

class BusinessProfile extends Component {

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
