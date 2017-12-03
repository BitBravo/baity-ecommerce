import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
import baityfooter from '../assets/img/baityfooter.png';



class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {year: new Date().getFullYear()};
  }

  render() {
    return (
      <footer className="footer" inverse>
     
              <img  src={baityfooter}/>
              <p> © {this.state.year} CoderJourney</p>
         
      </footer>
    );
  }
}

export default Footer;