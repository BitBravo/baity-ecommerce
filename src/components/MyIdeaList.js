import React, { Component } from "react";
import IdeaList from "./IdeaList";


function MyIdeaList(props) {
    return (<IdeaList thisUserOnly={true} currentUser={props.currentUser}/>);
}
export default MyIdeaList;
