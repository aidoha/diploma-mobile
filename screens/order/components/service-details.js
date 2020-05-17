import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { validPrice } from '../../../utils';

const ServiceDetails = ({ data }) => {
  const { businessServiceName, companyServiceName, companyServicePrice } = data;
  return (
    <View style={styles.details}>
      <Text style={styles.title}>Детали записи</Text>
      <View style={styles.details_view}>
        <View style={styles.row}>
          <Text style={styles.text_description}>Услуга: </Text>
          <Text style={styles.text_value}>{businessServiceName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text_description}>Название услуги: </Text>
          <Text style={styles.text_value}>{companyServiceName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text_description}>Цена услуги: </Text>
          <Text style={styles.text_value}>
            {validPrice(companyServicePrice)} ₸
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  details: {
    padding: 20,
  },
  details_view: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
  },
  text_description: {
    fontSize: 20,
    fontWeight: '600',
  },
  text_value: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default ServiceDetails;
