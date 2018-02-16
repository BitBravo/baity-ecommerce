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

  <h3  > {this.state.year} جميع الحقوق محفوظة <span> <img  src={baityfooter}/></span></h3>
</footer>
    );
  }
}

export default Footer;