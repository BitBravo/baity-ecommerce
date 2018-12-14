import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import sideBarData from "config/sidebar";
// import imagine from "assets/img/sidebar-3.jpg";
// import logo from "assets/img/reactlogo.png";
// import dashboardRoutes from "routes/dashboard.js";
import './style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    // window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image={'imagine'}
      >
        <div className="sidebar-wrapper">
          <ul className="nav">
            {/* {this.state.width <= 991 ? <HeaderLinks /> : null} */}
            {sideBarData.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.url)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.url}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
