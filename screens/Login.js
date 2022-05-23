//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Login = props => {
  const {navigation} = props;
  const {control, handleSubmit, watch} = useForm();

  const onRegisterPressed = () => {
    console.log('done');
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
        rules={{
          required: 'Name is required',
        }}
      />

      <View style={styles.marginTop}></View>

      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
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
