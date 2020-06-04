import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { format } from 'date-fns';
import { useQuery } from '@apollo/react-hooks';
import withCurrentUser from '../../../hoc/withCurrentUser';
import { GET_CUSTOMER_ORDERS } from '../../../queries/profile';
import { validPrice } from '../../../utils/index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const navigationObj = {
  headerTitle: 'Ваши записи Cactus',
  headerStyle: { backgroundColor: '#000000' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const renderSeparator = () => (
  <View
    style={{
      height: 1,
      width: '100%',
      backgroundColor: '#fff',
    }}
  />
);

const OrderHistory = ({ navigation, userEmail: email }) => {
  navigation.setOptions(navigationObj);
  const { data, loading, refetch, fetchMore } = useQuery(GET_CUSTOMER_ORDERS, {
    variables: { email, limit: 5, offset: 0 },
  });
  const [refreshing, setRefreshing] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      refetch().then(() => setRefreshing(false));
    }, 2000);
  }, [refreshing]);

  const renderRefreshControl = () => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ backgroundColor: 'transparent' }}
      tintColor='#fff'
    />
  );

  const handleLoadMore = () => {
    setBottomLoader(true);

    fetchMore({
      variables: {
        offset:
          data?.getBusinessServiceOrdersByEmail?.businessServicesOrders.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult?.getBusinessServiceOrdersByEmail
            ?.businessServicesOrders
        ) {
          return prev;
        }
        setBottomLoader(false);
        return {
          ...prev,
          getBusinessServiceOrdersByEmail: {
            ...prev.getBusinessServiceOrdersByEmail,
            businessServicesOrders: [
              ...prev?.getBusinessServiceOrdersByEmail?.businessServicesOrders,
              ...fetchMoreResult?.getBusinessServiceOrdersByEmail
                ?.businessServicesOrders,
            ],
          },
        };
      },
    });
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
        refreshControl={renderRefreshControl()}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.businessServiceID}>
            <View style={styles.row}>
              <Text style={[styles.title]}>{item.businessCompanyName}</Text>
              <Text style={[styles.text, { marginTop: 5, marginBottom: 5 }]}>
                {format(new Date(item.startAt), 'HH:mm')}
              </Text>
            </View>
            <Text style={[styles.text, { fontSize: 20, marginTop: 10 }]}>
              {item.businessServiceName}
            </Text>
            <View style={styles.row}>
              <Text style={[styles.text, { marginTop: 5, marginBottom: 5 }]}>
                {format(new Date(item.startAt), 'dd.MM.yyyy')}
              </Text>
              <Text style={styles.text}>{validPrice(item.price)} ₸</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />

      {bottomLoader ? (
        <View style={styles.horizontal}>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      ) : (
        <TouchableOpacity onPress={handleLoadMore} style={styles.loadMore}>
          <Text style={styles.loadMoreText}>Еще</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 18,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  loadMore: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    margin: 20,
  },
  loadMoreText: {
    color: '#000',
    fontSize: 20,
  },
});

export default withCurrentUser(OrderHistory);
