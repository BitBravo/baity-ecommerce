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
    const { currentUser, group } = this.props.state;
    return (
      <div>
        {group === "prof" ?
          <div>
            <ProfileInfo currentUser={currentUser} />
            <ProductList
              thisUserOnly={true}
              shortList={true}
              currentUser={currentUser}
              group={group}
            />
            <IdeaList
              thisUserOnly={true}
              shortList={true}
              currentUser={currentUser}
              group={group}
            />
          </div>
          : <div>
            <NormalProfileInfo currentUser={currentUser} />
            <FavProducts
              shortList={true}
              currentUser={currentUser}
              group={group}
            />
            <FavIdeas
              shortList={true}
              currentUser={currentUser}
              group={group}
            />
          </div>
        }
      </div>
    );
  }
}

export default MyAccount;
