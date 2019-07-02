import React, { Component } from 'react';
 import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './halaman/Login'
import Footer from './navigasi/parrent/Footer'
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {header: null}
  },
  Home: {
    screen: Footer,
    navigationOptions: {header: null}
  },

});

const ShowScreen = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <ShowScreen/>;
  }
}