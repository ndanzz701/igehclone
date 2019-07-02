import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import Profile from '../../halaman/Profile'
import EditBio from '../../halaman/EditBio'
const RootStack = createStackNavigator(
  {
    Profile: {screen: Profile,navigationOptions:{header:null}},
    EditBio: {screen:EditBio,navigationOptions:{tabBarVisible: false,}}
  },
  {
    initialRouteName: 'Profile',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Profile_Detail extends React.Component {
  render() { 
    return <AppContainer />;
  }
}
