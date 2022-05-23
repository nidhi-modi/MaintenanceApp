import React, {Component, Fragment} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';

const App = () => {
  return <MainStackNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;