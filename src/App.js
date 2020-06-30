import React, {Component} from 'react';
import {StatusBar} from 'react-native';

import Home from './pages/home/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Home />
      </>
    );
  }
}

export default App;
