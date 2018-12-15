import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Favicon from 'react-favicon';
import './assets/css/styles.css';
import "./assets/css/animate.min.css";
// import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import siteIcon from './assets/img/bayty_icon1.png';


ReactDOM.render(<div><App /> <Favicon url={siteIcon} /></div>, document.getElementById('root'));
registerServiceWorker();
