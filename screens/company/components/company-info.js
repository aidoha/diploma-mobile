import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CompanyInfo = ({ data, refRBSheet }) => {
  return (
    <>
      <View style={styles.scene}>
        <View style={styles.row}>
          <Text style={[styles.text]}>Время работы: </Text>
          <Text style={[styles.text]}>Company duration time</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text]}>Адрес: </Text>
          <Text style={[styles.text]}>Company Address</Text>
        </View>
      </View>
      <View style={styles.button_wrapper}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={styles.button}>
            <Text style={styles.button_text}>Записаться</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#000',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    height: 100,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button_wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  button: {
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  button_text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CompanyInfo;
