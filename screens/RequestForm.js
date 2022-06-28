//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import RNDropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import {Freeze} from 'react-freeze';
import SendSMS from 'react-native-sms';
import moment from 'moment';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 25 : null;

const RequestForm = ({navigation}) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    watch,
  } = useForm();

  const [house, setHouse] = useState('');
  const [assignedName, setAssignedName] = useState('');
  const [date, setDate] = useState('SELECT');
  const [open, setOpen] = useState(false);
  const [loginDetail, setLoginDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      AsyncStorage.getItem('house')
        .then(selectedHouse => {
          var houseSelected = JSON.parse(selectedHouse);
          setHouse(houseSelected);
        })
        .done();
    } catch (error) {}

    try {
      AsyncStorage.getItem('name')
        .then(assignedFrom => {
          var jobAssignedFrom = JSON.parse(assignedFrom);
          setAssignedName(jobAssignedFrom);
        })
        .done();
    } catch (error) {}
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      AsyncStorage.getItem('loginDetails')
        .then(loginDetail => {
          if (loginDetail !== null) {
            var details = JSON.parse(loginDetail);
            setLoginDetails(details);
          }
        })
        .done();
    } catch (error) {}

    return () => controller.abort();
  }, [loginDetail]);

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

  const onSubmitPressed = async data => {
    Keyboard.dismiss();
    setLoading(true);

    const {siteLocation, description, assignTaskTo, priority, idealDueDate} =
      data;

    const filteredNumber = d => d.username === assignTaskTo;

    const filteredData = loginDetail.items.filter(filteredNumber);

    const dateFormat = moment(idealDueDate).format('dddd, MMMM Do YYYY');

    setLoading(true);

    if (filteredData.length != 0) {
      //First send data to sheet and then send an sms

      try {
        const scriptUrl =
          'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
        const url = `${scriptUrl}?
  callback=ctrlq&action=${'doPostRequestForm'}&site_name=${house}&house_number=${siteLocation}&assigned_from=${assignedName}&description=${description}&assigned_to=${assignTaskTo}&priority=${priority}&ideal_due_date=${dateFormat}`;
        console.log('URL : ' + url);
        fetch(url, {mode: 'no-cors'}).then(() => {
          console.log('Data Send');
          setDate('SELECT');
          reset();
          setLoading(true);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      //End

      const lastEntryFromList = filteredData[filteredData.length - 1];

      const filteredPhoneNumber = lastEntryFromList.phone_number;

      const filteredUserName = lastEntryFromList.username;

      const appendZero = '0' + filteredPhoneNumber;

      smsSendFunction(appendZero, filteredUserName);

      setLoading(false);
    }
  };

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  function dateSelection(value) {
    if (value >= new Date()) {
      return true;
    } else {
      return false;
    }
  }

  const smsSendFunction = (updatedPhoneNumber, filteredName) => {
    SendSMS.send(
      {
        body:
          'Hi ' +
          filteredName +
          ',' +
          '\t There is a new job assigned to you. Please open your maintenance application for more details.',
        recipients: [updatedPhoneNumber],
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          setLoading(false);

          Alert.alert('SMS Sent Successfully.');
        } else if (cancelled) {
          setLoading(false);

          console.log('SMS Sent Cancelled.');
        } else if (error) {
          setLoading(false);

          console.log('Some error occured.');
        }
      },
    );
  };

  if (isLoading) {
    return (
      <View style={styles.activity}>
        <Text style={styles.fetchingText}>Loading{'\n'}Please wait...</Text>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={{backgroundColor: '#219DCD'}}>
            <View style={{marginTop: STATUSBAR_HEIGHT}}>
              <CustomHeader text={'Maintenance Request Form'} />
            </View>
          </View>
          <KeyboardAwareScrollView
            style={styles.mainCont}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>
              Complete this form for each maintenance task required
            </Text>
            <View style={styles.marginTop}></View>

            <Text style={styles.titleHeadingText}>Select Your Name </Text>

            <View style={[styles.dropdownContainer]}>
              <TextInput
                style={
                  Platform.OS === 'ios'
                    ? styles.nameInputIos
                    : styles.nameInputAndroid
                }
                autoCapitalize="characters"
                multiline={true}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                autoGrow={false}
                returnKeyType={'done'}
                keyboardType={'default'}
                editable={false}
                selectTextOnFocus={false}
                value={assignedName}
              />
            </View>

            <Text style={styles.titleHeadingText}>Site Location </Text>

            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <View style={[styles.dropdownContainer]}>
                    <RNDropDownPicker
                      items={[
                        {label: 'GER 1', value: 'GER 1'},
                        {label: 'GER 2', value: 'GER 2'},
                        {label: 'GER 3', value: 'GER 3'},
                        {label: 'GER 4', value: 'GER 4'},
                        {label: 'GER 5', value: 'GER 5'},
                      ]}
                      placeholder="SELECT"
                      containerStyle={{height: 55}}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      labelStyle={{
                        fontSize: 15,
                        textAlign: 'left',
                        color: '#000000',
                        fontFamily: 'TimesNewRomanPSMT',
                      }}
                      onChangeItem={item => onChange(item.value)}
                      //value={value}
                    />
                    {error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          paddingLeft: 5,
                        }}>
                        {error.message || 'Error'}
                      </Text>
                    )}
                  </View>
                </>
              )}
              name="siteLocation"
              rules={{
                required: 'House is required',
              }}
            />

            <Text style={styles.titleHeadingText}>Job Description </Text>

            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <View style={[styles.dropdownContainer]}>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="sentences"
                      multiline={true}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      autoGrow={false}
                      returnKeyType={'done'}
                      keyboardType={'default'}
                      onChangeText={item => onChange(item)}
                      //value={value}
                    />
                    {error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          paddingLeft: 5,
                        }}>
                        {error.message || 'Error'}
                      </Text>
                    )}
                  </View>
                </>
              )}
              name="description"
              rules={{
                required: 'Job description is required',
              }}
            />

            <Text style={styles.titleHeadingText}>Assign Task </Text>

            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <View style={[styles.dropdownContainer]}>
                    {loginDetail.length != 0 ? (
                      <RNDropDownPicker
                        items={getUniqueListBy(
                          loginDetail.items,
                          'username',
                        ).map(item => ({
                          label: item.username,
                          value: item.username,
                        }))}
                        placeholder="SELECT"
                        containerStyle={{height: 55}}
                        itemStyle={{
                          justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        labelStyle={{
                          fontSize: 15,
                          textAlign: 'left',
                          color: '#000000',
                          fontFamily: 'TimesNewRomanPSMT',
                        }}
                        onChangeItem={item => onChange(item.value)}
                        //value={value}
                      />
                    ) : (
                      <RNDropDownPicker
                        items={[
                          {label: 'Loading Names..', value: 'Loading Names..'},
                        ]}
                        placeholder="SELECT"
                        containerStyle={{height: 55}}
                        itemStyle={{
                          justifyContent: 'flex-start',
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        labelStyle={{
                          fontSize: 15,
                          textAlign: 'left',
                          color: '#000000',
                          fontFamily: 'TimesNewRomanPSMT',
                        }}
                        onChangeItem={item => onChange(item.value)}
                        //value={value}
                      />
                    )}

                    {error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          paddingLeft: 5,
                        }}>
                        {error.message || 'Error'}
                      </Text>
                    )}
                  </View>
                </>
              )}
              name="assignTaskTo"
              rules={{
                required: 'Assign task is required',
              }}
            />

            <Text style={styles.titleHeadingText}>Priority </Text>

            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <View style={[styles.dropdownContainer]}>
                    <RNDropDownPicker
                      items={[
                        {label: '1', value: '1'},
                        {label: '2', value: '2'},
                        {label: '3', value: '3'},
                        {label: '4', value: '4'},
                        {label: '5', value: '5'},
                      ]}
                      placeholder="SELECT"
                      containerStyle={{height: 55}}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      labelStyle={{
                        fontSize: 15,
                        textAlign: 'left',
                        color: '#000000',
                        fontFamily: 'TimesNewRomanPSMT',
                      }}
                      onChangeItem={item => onChange(item.value)}
                      //value={value}
                    />
                    {error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          paddingLeft: 5,
                        }}>
                        {error.message || 'Error'}
                      </Text>
                    )}
                  </View>
                </>
              )}
              name="priority"
              rules={{
                required: 'Priority is required',
              }}
            />

            <View style={styles.direction}>
              <Text style={styles.titleHeadingText}>Ideal Due Date </Text>
              <Text
                style={styles.clearHeadingText}
                onPress={() => setOpen(true)}>
                Change
              </Text>
            </View>

            <Controller
              control={control}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <View style={[styles.dropdownContainer]}>
                    <TextInput
                      style={styles.borderDate}
                      autoCapitalize="none"
                      multiline={false}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onPress={() => setOpen(true)}
                      showSoftInputOnFocus={false}
                      value={date !== 'SELECT' ? date.toDateString() : date}
                      onFocus={() => setOpen(true)}
                      contextMenuHidden={true}
                      selectTextOnFocus={false}
                    />

                    <DatePicker
                      modal
                      mode="date"
                      theme="auto"
                      open={open}
                      date={new Date()}
                      onConfirm={date => {
                        onChange(date);
                        setOpen(false);
                        setDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                    {error && (
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'stretch',
                          paddingLeft: 5,
                        }}>
                        {error.message || 'Error'}
                      </Text>
                    )}
                  </View>
                </>
              )}
              name="idealDueDate"
              rules={{
                required: 'Ideal due date is required',
                validate: value => {
                  let valid = dateSelection(value);
                  return valid ? null : 'Invalid date';
                },
              }}
            />

            <CustomButton
              text={'SUBMIT'}
              onPress={handleSubmit(onSubmitPressed)}
            />

            <View style={{marginBottom: 60}} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },

  mainCont: {
    padding: 20,
  },

  marginTop: {
    marginTop: 10,
  },

  activity: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },

  fetchingText: {
    fontSize: 23,
    color: '#000000',
    fontFamily: 'TimesNewRomanPS-BoldItalicMT',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  title: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'TimesNewRomanPSMT',
    flexShrink: 1,
    textAlign: 'center',
  },

  titleHeadingText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  clearHeadingText: {
    color: 'red',
    fontSize: 15,
    marginRight: 15,
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  inBtnmarginDimension: {
    marginTop: 50,
  },

  dropdownContainer: {
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 28,
  },

  borderDate: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'TimesNewRomanPSMT',
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'TimesNewRomanPSMT',
    backgroundColor: 'white',
    width: '100%',
    height: 140,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlignVertical: 'top',
  },

  nameInputIos: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'TimesNewRomanPSMT',
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingTop: 17,
    paddingBottom: 17,
  },

  nameInputAndroid: {
    fontSize: 15,
    color: '#000000',
    fontFamily: 'TimesNewRomanPSMT',
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  StatusBar: {
    backgroundColor: '#219DCD',
  },
});

export default RequestForm;
