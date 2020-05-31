import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import withCurrentUser from '../../../hoc/withCurrentUser';
import { GET_CUSTOMER_ORDERS } from '../../../queries/profile';
import {
  convertUTCDateToLocalDate,
  jsCoreDateCreator,
} from '../../../utils/index';
import { format } from 'date-fns';

const navigationObj = {
  headerTitle: 'Ваши записи Cactus',
  headerStyle: { backgroundColor: '#000000' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const OrderHistory = ({ navigation, userEmail: email }) => {
  navigation.setOptions(navigationObj);
  const { data, loading } = useQuery(GET_CUSTOMER_ORDERS, {
    variables: { email, limit: 10, offset: 0 },
  });
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#fff',
        }}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.getBusinessServiceOrdersByEmail?.businessServicesOrders}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.businessServiceID}>
            <Text style={[styles.title]}>{'Company name'}</Text>
            <Text style={[styles.text, { fontSize: 18, marginTop: 5 }]}>
              {item.businessServiceName}
            </Text>
            <View style={styles.row}>
              <View>
                <Text style={[styles.text, { marginTop: 5, marginBottom: 5 }]}>
                  {format(new Date(item.startAt), 'HH:mm')}
                </Text>
                <Text style={[styles.text, { marginTop: 5, marginBottom: 5 }]}>
                  {format(new Date(item.startAt), 'dd.MM.yyyy')}
                </Text>
              </View>
              <Text style={styles.text}>{'price'}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  text: {
    color: '#b3b3b3',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default withCurrentUser(OrderHistory);
