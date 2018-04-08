import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Col,Row,Grid } from "react-bootstrap"
import bayty_icon from '../src/assets/img/bayty_icon1.png';
import logo_placeholder from '../src/assets/img/logo-placeholder.jpg';
import styled from 'styled-components'


const Title=styled.div`
display:block;
margin-top:100px;
margin-left:auto;
margin-right:auto;
text-align: center;
background:white;
padding-top: 10%;
`
const TitleImg=styled.img`
display: block;
width: 15%;
margin-top: -18%;
margin-bottom:auto;
border-radius: 50%;
margin-left: auto;
margin-right: auto;`



class SellerMail extends Component {
    constructor() {
      super()
   
        }
    
      render() {
       
          return (
            <Grid> 
            <Title>
            <TitleImg src={bayty_icon}  />
         <h2 style={{color:'rgb(26,156,142)'}}> اشعارات </h2>
         <h6>لديك طلب منتج </h6>
            <button>
          اذهب الى الحساب
            </button>
            </Title>
         
    </Grid>
    
        )
      }
    }
    
    export default SellerMail;
    