import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
  
} from 'react-navigation'; // 1.0.0-beta.27
import Home from '../../halaman/Home'
import Login from '../../halaman/Login'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Love from '../Love'
import Search from '../Search'
import Profile_Navigator from './Profile_Navigator'
import SelectImage from '../../halaman/SelectImage'

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const username = navigation.getParam('username');
  const token = navigation.getParam('token');
  let iconName;
  if (routeName === 'Home') {
    iconName = `home`;
    // We want to add badges to home tab icon
  } else if (routeName === 'Profile') {
    iconName = `user-alt`;
  }else if(routeName==='Search'){
    iconName = `search`
  }else if(routeName==='Add'){
    iconName = `plus-square`
  }else if(routeName==='Love'){
    iconName = `heart`
  }

  return <Icon name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: Home },
      Search: { screen: Search },
      Add: { screen: SelectImage },
      Love: { screen: Love },
      Profile: { screen: Profile_Navigator },
    }, {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        showLabel: false,
      },
    }
  ),createStackNavigator({
    Detail: Login,
})
);
