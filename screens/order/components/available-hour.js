import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { jsCoreDateCreator } from '../../../utils';

const AvailableHour = ({ data }) => {
  const time = format(new Date(jsCoreDateCreator(data)), 'HH:mm');
  return (
    <View style={styles.container}>
      <Text style={styles.time_text}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    backgroundColor: '#000',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  time_text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AvailableHour;
