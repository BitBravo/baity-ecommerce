import React, { Component } from "react";
import { Link } from "react-router-dom";
import { app, base } from "../base";
import FirebaseServices from './FirebaseServices'
import CartList from './CartList';
import styled from 'styled-components'
import {
    Col,
    Modal,
    Row,
    Grid,
    Glyphicon
   
  } from "react-bootstrap";
  import logo_placeholder from '../assets/img/logo-placeholder.jpg';

const Button =styled.button`
display:block;
margin-left:auto;
margin-right:auto;
width:30%;
height:40px;
@media only screen and (max-width: 767px) {
    width:80%;
   height:30px;;
}
`

class MyCart extends Component {

    constructor() {
      super();

    }


    render(){
    return(
        <Grid>
            <h2 style={{ textAlign:'center',color: 'rgb(26,156,142)'}}>سلة التسوق</h2>
             <Row style={{ display: 'flex', flexWrap: 'wrap', boxShadow: '5px 5px 5px #d7d7d7' }} >
            <CartList/>
            <Col xs={12} style={{ background:'white' }}>
           <p> قيمة الطلبات:</p>
           <p> القيمة الضريبية:</p>
           <p> المجموع :</p>
           <Button>اتمام العملية</Button>
            </Col>
             </Row>
            </Grid>

    );
  };
}
export default MyCart;