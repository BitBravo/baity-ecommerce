import React, { Component } from "react";
import Header from "./Header"
import Sidebar from "./Sidebar";
import './style.css'


class AdminLayout extends Component {
    render() {
        console.log('Admin Layout ...')
        console.log(this.props)
        return (
            <div className="wrapper admin-layout">
                <Header />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Sidebar />
                    <div className="main-content">
                        {this.props.children}
                    </div>
                    {/* <Footer /> */}
                </div>
            </div>
        );
    }
}

export default AdminLayout;
