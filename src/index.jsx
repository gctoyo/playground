import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './component/app';
import About from './component/about';
import Repos from './component/repos';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/repos" component={Repos} />
    <Route path="/about" component={About} />
  </Router>
), document.getElementById('app'));
