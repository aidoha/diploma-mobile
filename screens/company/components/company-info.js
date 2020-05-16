import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompanyInfo = ({ data }) => {
  return (
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
});

export default CompanyInfo;
