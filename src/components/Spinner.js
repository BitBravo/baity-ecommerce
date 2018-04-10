import React from 'react'
import '../assets/css/spinner.css'
import BaityLoading from '../assets/img/BaityLoading.gif';
import styled from 'styled-components';

const LoadImg = styled.img`
@media only screen and (max-width: 991px) {
  width:130px;}`
const Spinner = (props) => {
  return [<div className='spinner' ></div>,
  // <LoadImg src={BaityLoading} className="icons"/>
]
}

export default Spinner;