import * as React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screens from './screens/_index';
import {Root, Icon, Text} from 'native-base';
import config from './config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: config.ThemeColor.card,
    border: config.ThemeColor.border,
    text: config.ThemeColor.text,
  },
};

export default class Router extends React.Component {
  render() {
    return (
      <Root>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator headerMode="none" initialRouteName="Loading">
            <Stack.Screen name="Loading" component={screens.Loading} />
            <Stack.Screen name="AuthScreen" component={AuthNavigator} />
            <Stack.Screen name="HomeScreen" component={HomeNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}

function AuthNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let icon;
          size = focused ? size : 20;
          if (route.name === 'SignIn') {
            icon = 'ios-log-in';
            iconName = 'Giriş Yap';
          } else if (route.name === 'SignUp') {
            icon = 'ios-person-add';
            iconName = 'Kayıt Ol';
          }
          return (
            <>
              <Icon name={icon} style={{fontSize: size, color: color}} />
              <Text style={{fontSize: 10, color: color}}>{iconName}</Text>
            </>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: config.ThemeColor.activeTintColor,
        inactiveTintColor: config.ThemeColor.inactiveTintColor,
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          bottom: 0,
        },
        safeAreaInsets: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      }}>
      <Tab.Screen name="SignIn">
        {() => (
          <Stack.Navigator headerMode="none" initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={screens.SignIn} />
            <Stack.Screen name="ChangePass" component={screens.ChangePass} />
            <Stack.Screen
              name="VerifiedMail"
              component={screens.VerifiedMail}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="SignUp" component={screens.SignUp} />
    </Tab.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let icon;
          size = focused ? size : 20;
          if (route.name === 'Home') {
            icon = 'ios-home';
            iconName = 'Ana Sayfa';
          } else if (route.name === 'Search') {
            icon = 'ios-search';
            iconName = 'Ara';
          } else if (route.name === 'Profile') {
            icon = 'ios-contacts';
            iconName = 'Profil';
          }
          return (
            <>
              <Icon name={icon} style={{fontSize: size, color: color}} />
              <Text style={{fontSize: 10, color: color}}>{iconName}</Text>
            </>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: config.ThemeColor.activeTintColor,
        inactiveTintColor: config.ThemeColor.inactiveTintColor,
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          bottom: 0,
        },
        safeAreaInsets: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      }}>
      <Tab.Screen name="Home" component={screens.Home} />
      <Tab.Screen name="Search" component={screens.Search} />
      <Tab.Screen name="Profile" component={screens.Profile} />
    </Tab.Navigator>
  );
}
