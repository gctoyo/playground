import React from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import Repos from './repos';

class App extends React.Component {

  hoge() {
    console.error('hoge');
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/repos/hoge">Hoge</Link></li>
        </ul>
      </div>
    );
  }
}

export default App;
