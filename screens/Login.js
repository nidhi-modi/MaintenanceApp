//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = props => {
  const {navigation} = props;
  const {control, handleSubmit, watch} = useForm();
  const [house, setHouse] = useState('');

  useEffect(() => {
    try {
      AsyncStorage.getItem('house')
        .then(selectedHouse => {
          var houseSelected = JSON.parse(selectedHouse);
          setHouse(houseSelected);
        })
        .done();
    } catch (error) {}
  }, []);

  /*useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton());

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton());
    };
  }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
  };
  */

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onRegisterPressed = async data => {
    const {name, email, phone} = data;

    setItem('name', name);
    setItem('email', email);
    setItem('phone', phone);

    try {
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
      const url = `${scriptUrl}?
callback=ctrlq&action=${'doPostLoginData'}&username=${name}&email=${email}&site=${house}&phone=${phone}`;
      console.log('URL : ' + url);
      fetch(url, {mode: 'no-cors'}).then(() => {
        console.log('Data Send');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setItem = async (myKey, value) => {
    try {
      return await AsyncStorage.setItem(myKey, JSON.stringify(value));
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your details</Text>

      <View style={styles.marginTop}></View>

      <CustomInput
        name="name"
        control={control}
        placeholder="Name"
        keyboardType={'default'}
        autoCapitalize="words"
        rules={{
          required: 'Name is required',
        }}
      />

      <View style={styles.marginTop}></View>

      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType={'email-address'}
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />

      <View style={styles.marginTop}></View>

      <CustomInput
        name="phone"
        control={control}
        placeholder="Phone"
        keyboardType={'phone-pad'}
        rules={{
          required: 'Contact details is required',
        }}
      />

      <View style={styles.marginTop}></View>

      <CustomButton
        text="Upload Details"
        onPress={handleSubmit(onRegisterPressed)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
  },

  marginTop: {
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    color: '#051C60',
    margin: 10,
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },
});

export default Login;
