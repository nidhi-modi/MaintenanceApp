//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec
//'https://script.google.com/macros/s/AKfycbxZJI-9yM3jBXkUhf6VQBBWHyrx6D1UbdBc_6D_iftoAAemhw8Asey31mC7sC8ulQsNkA/exec';

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  BackHandler,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import CustomStatusBar from '../components/CustomStatusBar';
import Card from '../components/Card';
import moment from 'moment-timezone';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

let screenHeight = Dimensions.get('window').height / 2.2;
let screenWidth = Dimensions.get('window').width / 1.1;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 25 : null;

var jobID = '';

const JobList = props => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    watch,
  } = useForm();

  const [jobDetails, setJobDetails] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [userName, setUserName] = useState('');
  const [isReadMore, setReadMore] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [house, setHouse] = useState('');

  useEffect(() => {
    try {
      AsyncStorage.getItem('name')
        .then(assignedFrom => {
          var jobAssignedFrom = JSON.parse(assignedFrom);
          setUserName(jobAssignedFrom);
        })
        .done();
    } catch (error) {}
  }, [userName]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      AsyncStorage.getItem('house')
        .then(selectedHouse => {
          var houseSelected = JSON.parse(selectedHouse);
          setHouse(houseSelected);

          if (houseSelected === 'GER') {
            const scriptUrl1 =
              'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
            const url1 = `${scriptUrl1}?callback=ctrlq&action=${'doGetJobRequest'}`;

            fetch(url1, {mode: 'no-cors', signal: signal})
              .then(response => response.json())
              .then(responseJson => {
                setJobDetails(responseJson);
                //filterlist();
              })
              .catch(error => {
                console.log(error);
              });
          } else if (houseSelected === 'HAR') {
            const scriptUrl1 =
              'https://script.google.com/macros/s/AKfycbxZJI-9yM3jBXkUhf6VQBBWHyrx6D1UbdBc_6D_iftoAAemhw8Asey31mC7sC8ulQsNkA/exec';
            const url1 = `${scriptUrl1}?callback=ctrlq&action=${'doGetJobRequest'}`;

            fetch(url1, {mode: 'no-cors', signal: signal})
              .then(response => response.json())
              .then(responseJson => {
                setJobDetails(responseJson);
                //filterlist();
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .done();
    } catch (error) {}

    return () => controller.abort();
  }, [jobDetails]);

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

  const handleSearch = text => {
    setSearchQuery(text);
    filterSearchData();
  };

  const filterSearchData = () => {
    const text = searchQuery;

    if (text) {
      const newData = jobDetails.items.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.assign_to;
        //   ? item.assign_to.toUpperCase()
        // : ''.toUpperCase();
        const itemData2 = item.job_status;

        const textData = text; //.toUpperCase();
        const textData2 = 'Completed';
        return (
          itemData.indexOf(textData) > -1 && itemData2.indexOf(textData2) > -1
        );
      });

      return newData;
    } else {
      const jobAssignedTo = d =>
        //d.assign_to === name &&
        d.job_status === 'Completed';

      const returnFilter = jobDetails.items
        .filter(jobAssignedTo)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return returnFilter;
    }
  };

  const listEmptyComponent = () => {
    return (
      <View style={styles.noDataText}>
        <Text style={styles.noDataTitle}>No Data Available</Text>
      </View>
    );
  };

  const onChangeLayout = jobId => {
    setReadMore(jobId);
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <CustomStatusBar backgroundColor="#219DCD" />
        <View style={styles.header}>
          <Text style={{color: '#219DCD'}}>Hi JHi</Text>
          <Text style={styles.textSize}>Maintenance Job List</Text>
          <Pressable
            onPress={() => setSearchText(true)}
            android_ripple={{borderless: true, radius: 50}}>
            <Image
              style={styles.resizeImage}
              source={require('../images/search.png')}
            />
          </Pressable>
        </View>

        <View style={styles.mainCont} keyboardShouldPersistTaps="handled">
          {searchText ? (
            <View style={styles.searchContainer}>
              <View style={styles.seachTextinput}>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={text => handleSearch(text)}
                  status="info"
                  placeholder="Search here using name..."
                  style={
                    Platform.OS === 'ios'
                      ? styles.serachTextinputStyleIos
                      : styles.serachTextinputStyleAndroid
                  }
                  placeholderTextColor={'#808080'}
                />
              </View>

              <View style={styles.searchClose}>
                <SimpleLineIcons
                  onPress={() => {
                    setSearchText(false), setSearchQuery('');
                  }}
                  name="close"
                  size={35}
                  color="black"
                />
              </View>
            </View>
          ) : null}

          {jobDetails.length != 0 ? (
            <FlatList
              contentContainerStyle={{paddingBottom: 200}}
              data={filterSearchData()}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={listEmptyComponent}
              renderItem={({item}) => (
                <Card>
                  <View style={styles.directionCol}>
                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}>
                        {' '}
                        Who Assigned :{' '}
                      </Text>
                      <Text style={styles.flatListText}>
                        {item.who_assigned}
                      </Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}> Location : </Text>
                      <Text style={styles.flatListText}>{item.house}</Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}> Due Date : </Text>
                      <Text style={styles.flatListText}>
                        {' '}
                        {moment
                          .utc(item.due_date, 'dddd, MMMM Do YYYY')
                          .format('MMMM Do, YYYY')}
                      </Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}>
                        {' '}
                        Assigned To :{' '}
                      </Text>
                      <Text style={styles.flatListText}>{item.assign_to}</Text>
                    </View>

                    <View
                      style={{
                        height: isReadMore === item.uniqueId ? null : 0,
                      }}>
                      <View style={styles.direction}>
                        <Text style={styles.clearHeadingText}>
                          {' '}
                          Started On :{' '}
                        </Text>
                        <Text style={styles.flatListText}>
                          {moment
                            .tz(item.jobstart_timestamp)
                            .format('MMMM Do, YYYY')}
                        </Text>
                      </View>

                      <View style={styles.direction}>
                        <Text style={styles.clearHeadingText}>
                          {' '}
                          Completed On :{' '}
                        </Text>
                        <Text style={styles.flatListText}>
                          {moment
                            .tz(item.jobdone_timestamp)
                            .format('MMMM Do, YYYY')}
                        </Text>
                      </View>

                      <View style={styles.direction}>
                        <Text style={styles.clearHeadingText}>
                          {' '}
                          Comments :{' '}
                        </Text>
                        {item.comments != '' ? (
                          <Text style={styles.flatListText}>
                            {item.comments}
                          </Text>
                        ) : (
                          <Text style={styles.flatListText}>No Comments</Text>
                        )}
                      </View>

                      <View style={styles.directionJobDescription}>
                        <Text style={styles.clearHeadingText}>
                          {' '}
                          Job Description :{' '}
                        </Text>
                      </View>
                      <Text style={styles.flatListTextDesc}>
                        {item.job_decsription}
                      </Text>

                      <View style={styles.direction}>
                        <Text style={styles.clearHeadingText}> Job ID : </Text>
                        <Text style={styles.flatListTextID}>
                          {item.uniqueId}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {isReadMore === item.uniqueId ? (
                    <View style={styles.readMoreButton}>
                      <Pressable
                        onPress={() => onChangeLayout('')}
                        android_ripple={{borderless: true, radius: 40}}>
                        <Text style={styles.textRightGreen}>Read Less...</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <View style={styles.readMoreButton}>
                      <Pressable
                        onPress={() => onChangeLayout(item.uniqueId)}
                        android_ripple={{borderless: true, radius: 40}}>
                        <Text style={styles.textRightRed}>Read More...</Text>
                      </Pressable>
                    </View>
                  )}
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.noDataText}>
              <Text style={styles.loadingDataTitle}>Please Wait...</Text>
            </View>
          )}
        </View>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatListText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'TimesNewRomanPSMT',
    marginBottom: 11,
    flexShrink: 1,
  },

  flatListTextID: {
    color: '#00203fff',
    fontSize: 18,
    fontFamily: 'TimesNewRomanPS-BoldMT',
    marginBottom: 11,
  },

  mainCont: {
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

  noDataTitle: {
    fontSize: 22,
    color: '#ff0000',
    marginBottom: 20,
    fontFamily: 'TimesNewRomanPSMT',
    textAlign: 'center',
  },

  loadingDataTitle: {
    fontSize: 22,
    color: '#02A931',
    marginBottom: 20,
    fontFamily: 'TimesNewRomanPSMT',
    textAlign: 'center',
  },

  titleHeadingText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  flatListTextDesc: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'TimesNewRomanPSMT',
    marginBottom: 11,
    flexShrink: 1,
  },

  clearHeadingText: {
    color: 'black',
    fontSize: 16,
    marginRight: 15,
    fontFamily: 'TimesNewRomanPS-BoldMT',
    marginBottom: 11,
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
  },

  directionJobDescription: {
    flexDirection: 'row',
  },

  directionBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginBottom: 5,
  },

  directionCol: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  buttonDimension: {
    width: '80%',
    alignSelf: 'center',
  },

  iconBehav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  resizeImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 15,
  },

  noDataText: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E0F2F9',
    padding: 20,
    paddingTop: 220,
    paddingBottom: 220,
  },
  textRed: {
    color: '#ff0000',
    fontSize: 21,
    fontFamily: 'TimesNewRomanPS-BoldMT',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    width: screenWidth,
  },

  dropdownContainer: {
    borderRadius: 12,
    marginBottom: 25,
    marginTop: 20,
  },
  input: {
    width: 300,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'TimesNewRomanPSMT',
    backgroundColor: 'white',
    height: 185,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlignVertical: 'top',
    padding: 10,
  },

  textRightRed: {
    fontFamily: 'TimesNewRomanPS-BoldMT',
    color: '#ff0000',
    fontSize: 15,
  },

  textRightGreen: {
    fontFamily: 'TimesNewRomanPS-BoldMT',
    color: '#12AA18',
    fontSize: 15,
  },

  readMoreButton: {
    alignSelf: 'flex-end',
  },

  header: {
    height: 63,
    backgroundColor: '#219DCD',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textSize: {
    fontSize: 19,
    color: '#ffffff',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingLeft: 50,
    marginBottom: 12,
  },

  seachTextinput: {
    borderRadius: 25,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'black',
    backgroundColor: '#fff',
    marginVertical: 5,
    width: '100%',
  },

  searchClose: {marginLeft: 10, alignSelf: 'center'},

  serachTextinputStyleIos: {
    color: '#000',
    fontFamily: 'TimesNewRomanPSMT',
    fontSize: 16,
    height: 45,
    paddingLeft: 10,
  },

  serachTextinputStyleAndroid: {
    color: '#000',
    fontFamily: 'TimesNewRomanPSMT',
    fontSize: 16,
  },
});

export default JobList;
