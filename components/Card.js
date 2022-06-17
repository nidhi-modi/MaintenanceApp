import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#f2f2f2',
    shadowOffset: {width: 2, height: 2},
    shadoeColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderLeftWidth: 8,
    borderColor: '#4CC1A1',
    marginHorizontal: 4,
    marginVertical: 8,
  },

  cardContent: {
    padding: 10,
    marginLeft: 2,
  },
});
