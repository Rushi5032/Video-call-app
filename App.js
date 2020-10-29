/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {Router, Scene, ActionConst} from 'react-native-router-flux';
import React from 'react';
import Home from './Home';
import Video from './Video';

const App = () => {
  return (
    <Router>
      <Scene>
        <Scene
          key="home"
          component={Home}
          title="MP"
          initial
          type={ActionConst.RESET}
        />
        <Scene
          key="video"
          component={Video}
          title="Video Feed"
          type={ActionConst.RESET}
          hideNavBar={true}
        />
      </Scene>
    </Router>
  );
};

export default App;
