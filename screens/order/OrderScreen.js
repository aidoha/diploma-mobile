import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import ServiceDetails from './components/service-details';
import OrderForm from './components/order-form';
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
      keyboardVerticalOffset={64}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        <ServiceDetails data={data?.getCompanyService} />
        <OrderForm
          companyServiceID={companyServiceID}
          navigation={navigation}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f6fa',
  },
  contentContainer: {},
  horizontal: {
    flex: 1,
    backgroundColor: '#f3f6fa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
