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
      <div id="home">
        成果物の確認のためのページです。
      </div>
    );
  }
}

export default App;
