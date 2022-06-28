import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import RequestForm from './RequestForm';
import AssignJobs from './AssignJobs';
import JobList from './JobList';
import {Freeze} from 'react-freeze';
import AsyncStorage from '@react-native-community/async-storage';

const GERHome = ({navigation}) => {
  const [getLogin, setLogin] = useState([]);
  const [sitePressed, setSitePressed] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const scriptUrl1 =
      'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
    const url1 = `${scriptUrl1}?callback=ctrlq&action=${'doGetLoginData'}`;
    fetch(url1, {mode: 'no-cors', signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        setLogin(responseJson);
        AsyncStorage.setItem('loginDetails', JSON.stringify(getLogin), err => {
          if (err) {
            console.log('an error');
            throw err;
          }
        }).catch(err => {
          console.log('error is: ' + err);
        });
      })
      .catch(error => {
        console.log(error);
      });
    return () => controller.abort();
  }, [getLogin]);

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

  const numberPressed = nameOfTheSite => {
    setSitePressed(nameOfTheSite);
  };

  if (sitePressed == 'RequestForm') {
    return (
      <View style={styles.container}>
        <RequestForm />
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('RequestForm')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/request.png')}
                />
                <Text style={styles.textSize}>Request</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('AssignJobs')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('JobList')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (sitePressed == 'AssignJobs') {
    return (
      <View style={styles.container}>
        <AssignJobs />
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('RequestForm')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/request.png')}
                />
                <Text style={styles.textSize}>Request</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('AssignJobs')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('JobList')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (sitePressed == 'JobList') {
    return (
      <View style={styles.container}>
        <JobList />
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('RequestForm')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/request.png')}
                />
                <Text style={styles.textSize}>Request</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('AssignJobs')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('JobList')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <RequestForm />
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('RequestForm')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/request.png')}
                />
                <Text style={styles.textSize}>Request</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('AssignJobs')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>
            </View>

            <View style={styles.columnStyle}>
              <Pressable
                onPress={() => numberPressed('JobList')}
                style={styles.iconBehav}
                android_ripple={{borderless: true, radius: 50}}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /*if (sitePressed == 'RequestForm') {
    return (
      <View style={styles.container}>
        <CustomHeader text={'Maintenance Request Form'} />
        <ScrollView>
          <RequestForm />
        </ScrollView>
        <Freeze>
          <View style={styles.bottomContainer}>
            <View style={styles.header}>
              <View style={styles.marginStyle}>
                <View style={styles.columnStyle}>
                  <Pressable onPress={() => numberPressed('RequestForm')}>
                    <Image
                      style={styles.resizeImage}
                      source={require('../images/request.png')}
                    />

                    <Text style={styles.textSize}>Request</Text>
                  </Pressable>
                </View>

                <Pressable onPress={() => numberPressed('AssignJobs')}>
                  <Image
                    style={styles.resizeImage2}
                    source={require('../images/assign.png')}
                  />
                  <Text style={styles.textSize}>Assign Job</Text>
                </Pressable>

                <Pressable onPress={() => numberPressed('JobList')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/list.png')}
                  />
                  <Text style={styles.textSize}>Job List</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Freeze>
      </View>
    );
  } else if (sitePressed == 'AssignJobs') {
    return (
      <View style={styles.container}>
        <CustomHeader text={'Maintenance Job Assigned'} />

        <ScrollView>
          <AssignJobs />
        </ScrollView>

        <View style={styles.bottomContainer}>
          <View style={styles.header}>
            <View style={styles.marginStyle}>
              <View style={styles.columnStyle}>
                <Pressable onPress={() => numberPressed('RequestForm')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/request.png')}
                  />
                  <Text style={styles.textSize}>Request</Text>
                </Pressable>
              </View>

              <Pressable onPress={() => numberPressed('AssignJobs')}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />

                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>

              <Pressable onPress={() => numberPressed('JobList')}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (sitePressed == 'JobList') {
    return (
      <View style={styles.container}>
        <CustomHeader text={'Maintenance Job List'} />

        <ScrollView>
          <JobList />
        </ScrollView>

        <View style={styles.bottomContainer}>
          <View style={styles.header}>
            <View style={styles.marginStyle}>
              <View style={styles.columnStyle}>
                <Pressable onPress={() => numberPressed('RequestForm')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/request.png')}
                  />
                  <Text style={styles.textSize}>Request</Text>
                </Pressable>
              </View>

              <Pressable onPress={() => numberPressed('AssignJobs')}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </Pressable>

              <Pressable onPress={() => numberPressed('JobList')}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <CustomHeader text={'Maintenance Request Form'} />
        <ScrollView>
          <RequestForm />
        </ScrollView>
        <Freeze>
          <View style={styles.bottomContainer}>
            <View style={styles.header}>
              <View style={styles.marginStyle}>
                <View style={styles.columnStyle}>
                  <Pressable onPress={() => numberPressed('RequestForm')}>
                    <Image
                      style={styles.resizeImage}
                      source={require('../images/request.png')}
                    />

                    <Text style={styles.textSize}>Request</Text>
                  </Pressable>
                </View>

                <Pressable onPress={() => numberPressed('AssignJobs')}>
                  <Image
                    style={styles.resizeImage2}
                    source={require('../images/assign.png')}
                  />
                  <Text style={styles.textSize}>Assign Job</Text>
                </Pressable>

                <Pressable onPress={() => numberPressed('JobList')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/list.png')}
                  />
                  <Text style={styles.textSize}>Job List</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Freeze>
      </View>
    );
  }*/
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 65,
    backgroundColor: '#219DCD',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    height: 66,
    backgroundColor: '#219DCD',
  },

  textSize: {
    fontSize: 17,
    color: '#ffffff',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  textRedSize: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  marginStyle: {
    marginTop: 5,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 10,
    marginLeft: 10,
  },

  resizeImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginLeft: 12,
  },

  resizeImage2: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginLeft: 26,
  },

  columnStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // EXAMPLES
  navContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
  },

  navBar: {
    flexDirection: 'row',
    backgroundColor: '#219DCD',
    width: '100%',
    justifyContent: 'space-evenly',
  },

  iconBehav: {
    padding: 10,
  },
});

export default GERHome;
