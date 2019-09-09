import React from 'react';
import ReactDOM from 'react-dom';
// Router
import { Router } from 'react-router-dom';
import History from './History';
// Redux
import { Provider } from 'react-redux';
import Store from './Store';
import App from './App';
import * as serviceWorker from './serviceWorker';

import dotenv from 'dotenv';

import './Reset.css';
import './index.css';

dotenv.config();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
