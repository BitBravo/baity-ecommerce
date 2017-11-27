import React, { Component } from "react";
import ProductList from "./ProductList";


function MyProdutList(props) {
    return (<ProductList thisUserOnly={true} currentUser={props.currentUser}/>);
}
export default MyProdutList;