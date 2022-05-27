import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';

const CustomFooter = ({onPress1, onPress2, onPress3}) => {
  return (
    <View style={styles.header}>
      <View style={styles.marginStyle}>
        <View style={styles.columnStyle}>
          <Pressable onPress={onPress1}>
            <Image
              style={styles.resizeImage}
              source={require('../images/request.png')}
            />
            <Text style={styles.textSize}>Request</Text>
          </Pressable>
        </View>

        <Pressable onPress={onPress2}>
          <Image
            style={styles.resizeImage2}
            source={require('../images/assign.png')}
          />
          <Text style={styles.textSize}>Assign Job</Text>
        </Pressable>

        <Pressable onPress={onPress3}>
          <Image
            style={styles.resizeImage}
            source={require('../images/list.png')}
          />
          <Text style={styles.textSize}>Job List</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 66,
    backgroundColor: '#219DCD',
  },

  textSize: {
    fontSize: 17,
    color: '#ffffff',
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

export default CustomFooter;
