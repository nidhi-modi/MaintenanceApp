import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, LogBox} from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';
import MainStackNavigatorHome from './navigation/MainStackNavigatorHome';
import MainStackNavigatorLogin from './navigation/MainStackNavigatorLogin';

import AsyncStorage from '@react-native-community/async-storage';
import Home from './screens/Home';
import Login from './screens/Login';

const App = props => {
  const [house, setHouse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.getItem('house')
        .then(selectedHouse => {
          var houseSelected = JSON.parse(selectedHouse);
          setHouse(houseSelected);
        })
        .done();
    } catch (error) {}

    return () => {
      setHouse({}); // This worked for me
    };
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.getItem('phone')
        .then(phoneNumber => {
          var phoneNumberEntered = JSON.parse(phoneNumber);
          setPhoneNumber(phoneNumberEntered);
        })
        .done();
    } catch (error) {}
    return () => {
      setPhoneNumber({}); // This worked for me
    };
  }, []);

  if (house !== null && phoneNumber === null) {
    return <Login />;
  } else if (house !== null && phoneNumber !== null) {
    return <Home />;
  } else {
    return <MainStackNavigator />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
