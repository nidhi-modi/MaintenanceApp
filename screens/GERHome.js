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
import CustomFooter from '../components/CustomFooter';
import RequestForm from './RequestForm';
import AssignJobs from './AssignJobs';
import JobList from './JobList';
import {Freeze} from 'react-freeze';

const GERHome = ({navigation}) => {
  const [sitePressed, setSitePressed] = useState('');
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
        <CustomHeader text={'Maintenance Request Form'} />
        <ScrollView>
          <RequestForm />
        </ScrollView>
        <Freeze>
          <View style={styles.bottomContainer}>
            <View style={styles.header}>
              <View style={styles.marginStyle}>
                <View style={styles.columnStyle}>
                  <TouchableOpacity
                    onPress={() => numberPressed('RequestForm')}>
                    <Image
                      style={styles.resizeImage}
                      source={require('../images/request.png')}
                    />

                    <Text style={styles.textSize}>Request</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => numberPressed('AssignJobs')}>
                  <Image
                    style={styles.resizeImage2}
                    source={require('../images/assign.png')}
                  />
                  <Text style={styles.textSize}>Assign Job</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => numberPressed('JobList')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/list.png')}
                  />
                  <Text style={styles.textSize}>Job List</Text>
                </TouchableOpacity>
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
                <TouchableOpacity onPress={() => numberPressed('RequestForm')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/request.png')}
                  />
                  <Text style={styles.textSize}>Request</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => numberPressed('AssignJobs')}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />

                <Text style={styles.textSize}>Assign Job</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => numberPressed('JobList')}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </TouchableOpacity>
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
                <TouchableOpacity onPress={() => numberPressed('RequestForm')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/request.png')}
                  />
                  <Text style={styles.textSize}>Request</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => numberPressed('AssignJobs')}>
                <Image
                  style={styles.resizeImage2}
                  source={require('../images/assign.png')}
                />
                <Text style={styles.textSize}>Assign Job</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => numberPressed('JobList')}>
                <Image
                  style={styles.resizeImage}
                  source={require('../images/list.png')}
                />
                <Text style={styles.textSize}>Job List</Text>
              </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => numberPressed('RequestForm')}>
                    <Image
                      style={styles.resizeImage}
                      source={require('../images/request.png')}
                    />

                    <Text style={styles.textSize}>Request</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => numberPressed('AssignJobs')}>
                  <Image
                    style={styles.resizeImage2}
                    source={require('../images/assign.png')}
                  />
                  <Text style={styles.textSize}>Assign Job</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => numberPressed('JobList')}>
                  <Image
                    style={styles.resizeImage}
                    source={require('../images/list.png')}
                  />
                  <Text style={styles.textSize}>Job List</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Freeze>
      </View>
    );
  }
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
});

export default GERHome;
