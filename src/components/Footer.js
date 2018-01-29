import React, { Component } from 'react';
import baityfooter from '../assets/img/baityfooter.png';



class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {year: new Date().getFullYear()};
  }

  render() {
    return (
     

<footer className="myfooter">
{/* <img  src={baityfooter}/> */}
  <h3  >{this.state.year}  Baity جميع الحقوق محفوظة  </h3>
</footer>
    );
  }
}

export default Footer;