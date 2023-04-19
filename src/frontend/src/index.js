import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import Sales from './manager-pages/Sales';
import Combos from './server-pages/Combos';

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });


ReactDOM.render(
  <Auth0Provider
    domain='dev-hpujtihtibtq5fuw.us.auth0.com'
    clientId='4seGja9Q3Ca5qnuk8joiIjHrpFStoHWO'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
