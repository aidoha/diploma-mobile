import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CompanyServices = ({ data }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {data &&
        data.map((item) => {
          const {
            companyServiceID,
            companyServiceName,
            companyServicePrice,
            companyServiceDuration,
          } = item;
          return (
            <TouchableOpacity key={companyServiceID}>
              <View style={styles.company}>
                <View style={styles.row}>
                  <Text
                    style={[styles.text, { fontSize: 20, fontWeight: '600' }]}
                  >
                    Название компании:
                  </Text>
                  <Text style={[styles.text, { fontSize: 20 }]}>
                    {' '}
                    {companyServiceName}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={[styles.text, { fontSize: 16, fontWeight: '600' }]}
                  >
                    Цена:
                  </Text>
                  <Text style={[styles.text, { fontSize: 16 }]}>
                    {' '}
                    {companyServicePrice}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={[styles.text, { fontSize: 16, fontWeight: '600' }]}
                  >
                    Время работы:
                  </Text>
                  <Text style={[styles.text, { fontSize: 16 }]}>
                    {' '}
                    {companyServiceDuration} мин
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  company: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: '#353535',
    marginBottom: 10,
  },
  company_image: {
    resizeMode: 'cover',
  },
});

export default CompanyServices;
