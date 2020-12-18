/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Home from './components/Home';
import Video from './components/Video';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <Router>
  //     <Scene>
  //       <Scene
  //         key="login"
  //         component={Login}
  //         title="Login"
  //         initial
  //         hideNavBar={true}
  //         type={ActionConst.RESET}
  //       />
  //       <Scene
  //         key="register"
  //         component={Register}
  //         title="Register"
  //         hideNavBar={true}
  //         type={ActionConst.RESET}
  //       />
  //       <Scene
  //         key="forgot"
  //         component={ForgotPassword}
  //         title="Forgot Password"
  //         hideNavBar={true}
  //         type={ActionConst.RESET}
  //       />
  //       <Scene
  //         key="home"
  //         component={Home}
  //         title="MP"
  //         type={ActionConst.RESET}
  //       />
  //       <Scene
  //         key="video"
  //         component={Video}
  //         title="Video Feed"
  //         type={ActionConst.RESET}
  //         hideNavBar={true}
  //       />
  //     </Scene>
  //   </Router>
  // );
};

export default App;
