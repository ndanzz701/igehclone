import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import SelectImage from '../../halaman/SelectImage'
import Home from '../../halaman/Home'
const RootStack = createStackNavigator(
  {
    SelectImage: {screen: SelectImage,navigationOptions:{header:null}},
    Home: {screen: Home},
  },
  {
    initialRouteName: 'SelectImage',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Profile_Detail extends React.Component {
  render() { 
    return <AppContainer />;
  }
}
