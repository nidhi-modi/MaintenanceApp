import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomHeader = ({text}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.textSize}> {text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 63,
    backgroundColor: '#219DCD',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  textSize: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'TimesNewRomanPS-BoldMT',
  },
});

export default CustomHeader;
