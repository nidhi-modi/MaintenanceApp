import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#219DCD',
  },

  container_SECONDARY: {
    borderColor: '#219DCD',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontFamily: 'TimesNewRomanPS-BoldMT',
    color: 'white',
    fontSize: 15,
  },

  text_SECONDARY: {
    color: '#219DCD',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
