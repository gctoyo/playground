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

const BasicExample = () => (
  <div>
    <Router>
      <div
        style={{
          float: 'left'
        }}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Repos} />


      </div>
    </Router>
    <Router>
      <div
        style={{
          float: 'left'
        }}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={App} />
        <Route path="/hoge" component={About} />
        <Route path="/huga" component={Repos} />


      </div>
    </Router>
  </div>
);

render(<BasicExample />, document.getElementById('app'));

export default BasicExample;
