import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import './assets/css/styles.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Favicon from 'react-favicon';
import siteIcon from "./assets/img/bayty_icon1.png"


ReactDOM.render(<div><App /> <Favicon url={siteIcon} /></div>, document.getElementById('root'));
registerServiceWorker();
