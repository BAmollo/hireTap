import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './components/App';
import Callback from './components/Callback';
import store from './store';
import createHistory from 'history/createBrowserHistory';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import './Styles/Styles.css';

let history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    < BrowserRouter history={history}>
      <Route path="/" component={App} />
    </ BrowserRouter>
  </Provider>, document.getElementById('root')
  )
  


