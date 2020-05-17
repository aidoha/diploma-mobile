import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import ServiceDetails from './components/service-details';
import { GET_COMPANY_SERVCE } from '../../queries/order';

const OrderScreen = ({ navigation, route }) => {
  const { companyServiceID } = route.params;
  const { data, loading } = useQuery(GET_COMPANY_SERVCE, {
    variables: {
      companyServiceID,
    },
  });
  navigation.setOptions({
    headerTitle: 'Запись',
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#7654ff' />
      </View>
    );
  }

  if (!data) return;

  return (
    <View style={styles.container}>
      <ServiceDetails data={data?.getCompanyService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6fa',
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
