import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'mobx-react';
import store from './src/store/_index';
import Router from './src/router';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider {...store}>
        <StatusBar hidden />
        <Router />
      </Provider>
    );
  }
}
