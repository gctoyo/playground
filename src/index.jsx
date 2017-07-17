import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import App from './component/app';
import About from './component/about';
import Repos from './component/repos';
import './stylesheets/index.scss';

const BasicExample = () => (
  <div>
    <Router>
      <div>
        <div
          id="menu"
        >
          <div><Link to="/">Home</Link></div>
          <div><Link to="/about">About</Link></div>
          <div><Link to="/topics">Topics</Link></div>
        </div>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Repos} />
      </div>
    </Router>
  </div>
);

render(<BasicExample />, document.getElementById('app'));

export default BasicExample;
