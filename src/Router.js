import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Main from './components/Main';
import Answer from './components/Answer';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="main" title="StackOverFlow" component={Main} />
          <Scene key="answer" component={Answer} />
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
