//https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec

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
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import Toast from 'react-native-simple-toast';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import {Freeze} from 'react-freeze';
import Card from '../components/Card';
import moment from 'moment';

let screenHeight = Dimensions.get('window').height / 2.2;
let screenWidth = Dimensions.get('window').width / 1.1;
let scrollHeight = Dimensions.get('window').height;

var jobID = '';

const AssignJobs = props => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    watch,
  } = useForm();

  const [requestDetails, setRequestDetails] = useState([]);
  const [name, setName] = useState('');
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [isModalVisible, setModalVisible] = useState(false);
  const [jobUpdateComments, setJobUpdateComments] = useState('');

  useEffect(() => {
    try {
      AsyncStorage.getItem('name')
        .then(assignedFrom => {
          var jobAssignedFrom = JSON.parse(assignedFrom);
          setName(jobAssignedFrom);
        })
        .done();
    } catch (error) {}
  }, [name]);

  const toggleModal = (visible, id) => {
    setModalVisible(visible);

    if (id != '') {
      jobID = id;
    }

    //send comments to Google StyleSheet

    if (jobUpdateComments != '') {
      try {
        const scriptUrl5 =
          'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
        const url5 = `${scriptUrl5}?
     callback=ctrlq&action=${'doAddJobUpdateComments'}&job_uniqueId=${jobID}&update_job_comments=${jobUpdateComments}`;

        console.log('URL : ' + url5);
        fetch(url5, {mode: 'no-cors'}).then(() => {
          console.log('Data Send');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const scriptUrl1 =
      'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
    const url1 = `${scriptUrl1}?callback=ctrlq&action=${'doGetJobRequest'}`;

    console.log('URL : ' + url1);

    fetch(url1, {mode: 'no-cors', signal: signal})
      .then(response => response.json())
      .then(responseJson => {
        setRequestDetails(responseJson);
        //filterlist();
      })
      .catch(error => {
        console.log(error);
      });

    return () => controller.abort();
  }, [requestDetails]);

  const filterlist = () => {
    const jobAssignedTo = d =>
      d.assign_to === name && d.job_status !== 'Completed';

    return requestDetails.items
      .filter(jobAssignedTo)
      .sort((a, b) => a.priority - b.priority);
  };

  const onStartJob = jobID => {
    try {
      const scriptUrl2 =
        'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
      const url2 = `${scriptUrl2}?
     callback=ctrlq&action=${'doAddStartJobDetails'}&job_uniqueId=${jobID}`;

      console.log('URL : ' + url2);
      fetch(url2, {mode: 'no-cors'}).then(() => {
        Toast.showWithGravity('Job Started', Toast.LENGTH_SHORT, Toast.CENTER);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onStopJob = jobID => {
    try {
      const scriptUrl3 =
        'https://script.google.com/macros/s/AKfycbyUz-VwLOzXtf6kPgO_e-fZ4eXMnF2WnFWBo36vmCs2PLLwRVw/exec';
      const url3 = `${scriptUrl3}?
     callback=ctrlq&action=${'doAddStopJobDetails'}&job_Id=${jobID}`;

      console.log('URL : ' + url3);
      fetch(url3, {mode: 'no-cors'}).then(() => {
        Toast.showWithGravity(
          'Job Completed',
          Toast.LENGTH_SHORT,
          Toast.CENTER,
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeComments = comments => {
    setJobUpdateComments(comments);
  };

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

  const listEmptyComponent = () => {
    return (
      <View style={styles.noDataText}>
        <Text style={styles.noDataTitle}>No Data Available</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader text={'Maintenance Jobs Assigned'} />
      <View style={styles.mainCont} keyboardShouldPersistTaps="handled">
        <SafeAreaView>
          {requestDetails.length != 0 ? (
            <FlatList
              contentContainerStyle={{paddingBottom: 100}}
              data={filterlist()}
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
                      <TouchableOpacity
                        onPress={() => toggleModal(true, item.uniqueId)}
                        style={styles.iconBehav}>
                        <Image
                          style={styles.resizeImage}
                          source={require('../images/comments.png')}
                        />
                      </TouchableOpacity>
                    </View>

                    <Modal
                      animationType={'slide'}
                      transparent={false}
                      visible={isModalVisible}
                      onRequestClose={() => {
                        console.log('Modal has been closed.');
                      }}>
                      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                        <View style={styles.modal}>
                          <View style={styles.modalContainer}>
                            <Text style={styles.textRed}>
                              Update on the job
                            </Text>

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
                                onChangeText={text => onChangeComments(text)}
                              />
                            </View>

                            <View style={styles.buttonDirection}>
                              <View style={styles.buttonModalDimension}>
                                <CustomButton
                                  text={'SUBMIT'}
                                  bgColor={'#02A931'}
                                  onPress={() =>
                                    toggleModal(!isModalVisible, '')
                                  }
                                />
                              </View>

                              <View style={{marginRight: 12}}></View>

                              <View style={styles.buttonModalDimension}>
                                <CustomButton
                                  text={'CLOSE'}
                                  bgColor={'#E90A17'}
                                  onPress={() => setModalVisible(false)}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </KeyboardAwareScrollView>
                    </Modal>
                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}> Location : </Text>
                      <Text style={styles.flatListText}>{item.house}</Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}> Due Date : </Text>
                      <Text style={styles.flatListText}>{item.due_date}</Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}> Priority : </Text>
                      <Text style={styles.flatListText}>{item.priority}</Text>
                    </View>

                    <View style={styles.direction}>
                      <Text style={styles.clearHeadingText}>
                        {' '}
                        Job Description :{' '}
                      </Text>
                      <Text style={styles.flatListTextDesc}>
                        {item.job_decsription}
                      </Text>
                    </View>

                    {item.job_status == 'Job Started' ? (
                      <View style={styles.buttonDimension}>
                        <CustomButton
                          text={'JOB DONE'}
                          onPress={() => onStopJob(item.uniqueId)}
                          bgColor={'#E90A17'}
                        />
                      </View>
                    ) : (
                      <View style={styles.buttonDimension}>
                        <CustomButton
                          text={'START JOB'}
                          onPress={() => onStartJob(item.uniqueId)}
                          bgColor={'#02A931'}
                        />
                      </View>
                    )}
                  </View>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.noDataText}>
              <Text style={styles.loadingDataTitle}>Please Wait...</Text>
            </View>
          )}
        </SafeAreaView>
      </View>
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
    flexShrink: 1,
    color: 'black',
    fontSize: 16,
    fontFamily: 'TimesNewRomanPSMT',
    marginBottom: 11,
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

  buttonDirection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

  buttonModalDimension: {
    width: '40%',
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
});

export default AssignJobs;
