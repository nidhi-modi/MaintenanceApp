import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

//Declare Global Variables
var houseSelected;

var screenWidth = Dimensions.get('window').width / 1.6;

const SiteSelection = props => {
  const {navigation} = props;
  const [selected, setSelected] = useState('');

  //Component Did Mount
  useEffect(() => {
    try {
      AsyncStorage.getItem('house')
        .then(selectedHouse => {
          houseSelected = JSON.parse(selectedHouse);
          setSelected(selectedHouse);

          if (houseSelected === 'HAR') {
            navigation.navigate('GERHome');
          } else if (houseSelected === 'GER') {
            navigation.navigate('Login');
          } else if (houseSelected === 'OHA') {
            navigation.navigate('GERHome');
          } else if (houseSelected === 'REP') {
            navigation.navigate('GERHome');
          } else {
          }
        })
        .done();
    } catch (error) {}
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.text}>What site are you from ? </Text>
      </View>

      <View style={styles.marginDimensionTop}></View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            Alert.alert(
              'Are you sure ?',
              'It cannot be changed',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    navigation.navigate('ScreenNavigator', {site1: 'HAR'}),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No button clicked'),
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            )
          }>
          <Text style={styles.buttonText}>HAR</Text>
        </TouchableOpacity>

        <View style={styles.marginSmallDimensionTop}></View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            Alert.alert(
              'Are you sure ?',
              'It cannot be changed',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    navigation.navigate('ScreenNavigator', {site1: 'GER'}),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No button clicked'),
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            )
          }>
          <Text style={styles.buttonText}>GER</Text>
        </TouchableOpacity>

        <View style={styles.marginSmallDimensionTop}></View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            Alert.alert(
              'Are you sure ?',
              'It cannot be changed',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    navigation.navigate('ScreenNavigator', {site1: 'OHA'}),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No button clicked'),
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            )
          }>
          <Text style={styles.buttonText}>OHA</Text>
        </TouchableOpacity>

        <View style={styles.marginSmallDimensionTop}></View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            Alert.alert(
              'Are you sure ?',
              'It cannot be changed',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    navigation.navigate('ScreenNavigator', {site1: 'REP'}),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No button clicked'),
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            )
          }>
          <Text style={styles.buttonText}>REP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  containerButtons: {
    marginLeft: 95,
    marginRight: 95,
  },

  buttonContainer: {
    backgroundColor: '#219DCD',
    borderRadius: 12,
    padding: 10,
    margin: 20,
    height: 50,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },

  marginDimensionTop: {
    marginTop: 20,
  },

  marginSmallDimensionTop: {
    marginTop: 12,
  },

  buttonText: {
    fontSize: 17,
    color: '#ffffff',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  text: {
    margin: 6,
    margin: 20,
    fontSize: 21,
    color: 'black',
    fontFamily: 'TimesNewRomanPSMT',
  },
});
export default SiteSelection;
