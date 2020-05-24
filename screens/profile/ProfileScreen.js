import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';
import { AppContext } from '../../App';
import { GET_CUSTOMER_EMAIL, GET_CUSTOMER_INFO } from '../../queries/profile';
import { height } from '../../constants/Layout';

const ProfileScreen = ({ navigation }) => {
  const context = useContext(AppContext);
  const { data: customerEmail } = useQuery(GET_CUSTOMER_EMAIL, {
    variables: {
      accessToken: context.token,
    },
  });
  const { data: customerData, loading } = useQuery(GET_CUSTOMER_INFO, {
    variables: {
      email: customerEmail?.getCustomerTokenInfo?.email,
    },
    skip: !customerEmail,
  });

  const logoutAlertHandler = () => {
    Alert.alert('Вы действительно хотите выйти?', '', [
      {
        text: 'Отменить',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Выйти', onPress: () => logoutHandler() },
    ]);
  };

  const logoutHandler = async () => {
    await SecureStore.deleteItemAsync('token').then(() => {
      context.setToken(false);
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
      <View style={styles.helloContainer}>
        <Text style={styles.title}>
          Привет,{' '}
          {customerData?.getCustomerByEmail?.customer?.customerFirstName}!
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.title}>Учетная запись</Text>

        <TouchableOpacity style={styles.row_profile}>
          <View style={{ flexDirection: 'row' }}>
            <Feather name='shopping-bag' size={24} color='#fff' />
            <Text style={styles.text}>Мои записи</Text>
          </View>
          <Ionicons name='ios-arrow-forward' size={24} color='#fff' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row_profile}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name='person-outline' size={24} color='#fff' />
            <Text style={styles.text}>Моя информация</Text>
          </View>
          <Ionicons name='ios-arrow-forward' size={24} color='#fff' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logout_wrapper}
          onPress={logoutAlertHandler}
        >
          <AntDesign name='logout' size={24} color='#fff' />
          <Text style={styles.text}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  header: null,
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
  helloContainer: {
    padding: 30,
    height: height * 0.2,
  },
  dataContainer: {
    backgroundColor: '#303030',
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 1,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
    marginLeft: 10,
  },
  row_profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  logout_wrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
});

export default ProfileScreen;
