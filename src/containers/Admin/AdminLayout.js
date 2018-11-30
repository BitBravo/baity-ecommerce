import React, { Component } from "react";
import Header from "./Header"
import Sidebar from "./Sidebar";
import './style.css'


class AdminLayout extends Component {
    render() {
        const { children:
            {
                props: {
                    adminRoute,
                    state: {
                        authenticated: authFlag,
                    },
                },
            },
        } = this.props;
        console.log(`Layout: Admin Layout, Autenticated: ${authFlag}, RouteFlag: ${adminRoute}`);

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
