//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import RNDropDownPicker from '@nectr-rn/react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import {Freeze} from 'react-freeze';

const JobList = ({navigation}) => {
  const {control, handleSubmit, watch} = useForm();
  const [house, setHouse] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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

  const onSubmitPressed = async data => {};

  const setItem = async (myKey, value) => {
    try {
      return await AsyncStorage.setItem(myKey, JSON.stringify(value));
    } catch (error) {}
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Text style={styles.title}>
          Complete this form for each maintenance task required
        </Text>
        <View style={styles.marginTop}></View>

        <Text style={styles.titleHeadingText}>Select Your Name </Text>

        <View style={[styles.dropdownContainer]}>
          <RNDropDownPicker
            items={[
              {label: 'A', value: 'A'},
              {label: 'B', value: 'B'},
              {label: 'C', value: 'C'},
              {label: 'D', value: 'D'},
              {label: 'E', value: 'E'},
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
            //onChangeItem={item => this.updateDropdown(item.value, 'houseNumber')}
          />
        </View>

        <Text style={styles.titleHeadingText}>Site Location </Text>

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
            //onChangeItem={item => this.updateDropdown(item.value, 'houseNumber')}
          />
        </View>

        <Text style={styles.titleHeadingText}>Job Description </Text>

        <View style={[styles.dropdownContainer]}>
          <TextInput
            style={styles.input}
            autoCapitalize="sentences"
            multiline={true}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            autoGrow={false}
            //onChangeText={(text) => this.updateTextInput(text, 'optionComment1')}
            returnKeyType={'done'}
            keyboardType={'default'}
          />
        </View>

        <Text style={styles.titleHeadingText}>Assign Task </Text>

        <View style={[styles.dropdownContainer]}>
          <RNDropDownPicker
            items={[
              {label: 'A', value: 'A'},
              {label: 'B', value: 'B'},
              {label: 'C', value: 'C'},
              {label: 'D', value: 'D'},
              {label: 'E', value: 'E'},
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
            //onChangeItem={item => this.updateDropdown(item.value, 'houseNumber')}
          />
        </View>

        <Text style={styles.titleHeadingText}>Priority </Text>

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
            //onChangeItem={item => this.updateDropdown(item.value, 'houseNumber')}
          />
        </View>
        <View style={styles.direction}>
          <Text style={styles.titleHeadingText}>Ideal Due Date </Text>
          <Text style={styles.clearHeadingText} onPress={() => setOpen(true)}>
            Change
          </Text>
        </View>
        <View style={[styles.dropdownContainer]}>
          <TextInput
            style={styles.borderDate}
            autoCapitalize="none"
            multiline={false}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={() => setOpen(true)}
            onPress={() => setOpen(true)}
            showSoftInputOnFocus={false}
            value={date.toDateString()}
            onFocus={() => setOpen(true)}
            //onSubmitEditing={() => { this.refsamp.focus(); }}
          />

          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>

        <CustomButton text={'Submit'} onPress={handleSubmit(onSubmitPressed)} />

        <View style={{marginBottom: 60}} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  marginTop: {
    marginTop: 10,
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

  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default JobList;
