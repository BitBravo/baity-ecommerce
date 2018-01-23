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
  <h6 className="text-muted">© {this.state.year} Baity بيتي</h6>
</footer>
    );
  }
}

export default Footer;