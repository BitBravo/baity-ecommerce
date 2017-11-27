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
      <Navbar className="footer" inverse>
      <NavItem >
              <img  src={baityfooter}/>
              <h6> © {this.state.year} CoderJourney</h6>
          </NavItem>
      </Navbar>
    );
  }
}

export default Footer;