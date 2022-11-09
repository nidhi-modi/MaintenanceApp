import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SiteSelection from '../screens/SiteSelection';
import ScreenNavigator from '../screens/ScreenNavigator';
import Home from '../screens/Home';
import Login from '../screens/Login';
import RequestForm from '../screens/RequestForm';
import AssignJobs from '../screens/AssignJobs';
import JobList from '../screens/JobList';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SiteSelection"
        screenOptions={{
          //gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#2C903D',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerMode: 'float',
        }}>
        <Stack.Screen
          name="SiteSelection"
          component={SiteSelection}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScreenNavigator"
          component={ScreenNavigator}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RequestForm"
          component={RequestForm}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AssignJobs"
          component={AssignJobs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="JobList"
          component={JobList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },

  TouchableOpacityStyle11: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  TouchableOpacityStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
  },

  FloatingButtonStyle2: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },

  TouchableOpacityStyle2: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
  },
});

export default MainStackNavigator;
