import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import CartBrief from "./CartBrief";
import styled from 'styled-components'
import {
    Col,
    Modal,
    Row,
    Grid,
    Glyphicon

} from "react-bootstrap";
import logo_placeholder from '../assets/img/logo-placeholder.jpg';


const ProductImg = styled.img`
height:100px;
width:100px;
`
class CartList extends Component {

    constructor() {
        super();

    }


    render() {
        return (

            <Col xs={12} lg={12} style={{ padding: '0 ' }}>

                <CartBrief />
               

            </Col>



        );
    };
}
export default CartList;