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
          <Text style={styles.item}>
            {format(new Date(item.startAt), 'HH:mm')}
          </Text>
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
    fontSize: 18,
    color: '#fff',
  },
});

export default withCurrentUser(OrderHistory);
