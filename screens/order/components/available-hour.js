import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { selectAvailableHour } from '../../../states/order/actions';
import { jsCoreDateCreator, convertUTCDateToLocalDate } from '../../../utils';

const AvailableHour = ({ data, index, dispatch, hour }) => {
  const time = format(new Date(jsCoreDateCreator(data)), 'HH:mm');
  const convertedTime = convertUTCDateToLocalDate(
    new Date(jsCoreDateCreator(data))
  );
  const isIndexEqual = hour.activeHour === index;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isIndexEqual ? '#fff' : '#000' },
      ]}
      onPress={() => {
        dispatch(selectAvailableHour(convertedTime));
        hour.setActiveHour(index);
      }}
    >
      <Text
        style={[styles.time_text, { color: isIndexEqual ? '#000' : '#fff' }]}
      >
        {time}
      </Text>
    </TouchableOpacity>
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
    borderColor: '#000',
    borderWidth: 1,
  },
  time_text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AvailableHour;
