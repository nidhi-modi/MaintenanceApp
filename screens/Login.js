//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = ({navigation}) => {
  const {control, handleSubmit, watch} = useForm();
  const [house, setHouse] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    const {name, email, phone} = data;

    setItem('name', name);
    setItem('email', email);
    setItem('phone', phone);

    if (house === 'GER') {
      try {
        const scriptUrl =
          'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
        const url = `${scriptUrl}?
  callback=ctrlq&action=${'doPostLoginData'}&username=${name}&email=${email}&site=${house}&phone=${phone}`;
        console.log('URL : ' + url);
        fetch(url, {mode: 'no-cors'}).then(() => {
          console.log('Data Send');
          navigation.navigate('Home');
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else if (house === 'HAR') {
      try {
        const scriptUrl =
          'https://script.google.com/macros/s/AKfycbxZJI-9yM3jBXkUhf6VQBBWHyrx6D1UbdBc_6D_iftoAAemhw8Asey31mC7sC8ulQsNkA/exec';
        const url = `${scriptUrl}?
  callback=ctrlq&action=${'doPostLoginData'}&username=${name}&email=${email}&site=${house}&phone=${phone}`;
        console.log('URL : ' + url);
        fetch(url, {mode: 'no-cors'}).then(() => {
          console.log('Data Send');
          navigation.navigate('Home');
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
        text={loading ? 'Uploading...' : 'Upload Details'}
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
