import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry,
  YellowBox,
  AsyncStorage,
} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import CompanyList from './screens/company-list/CompanyListScreen';
import Company from './screens/company/CompanyScreen';
import Order from './screens/order/OrderScreen';
import SignUp from './screens/auth/SignUpScreen';
import SignIn from './screens/auth/SignInScreen';

YellowBox.ignoreWarnings(['Remote debugger']);
console.disableYellowBox = true;
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://46.101.138.224:8080/query',
  cache,
});
const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  let token;
  useEffect(() => {
    const getToken = async () => {
      token = await AsyncStorage.getItem('token');
    };
    getToken();
  }, [token]);
  // console.log('token', token);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              {token ? (
                <>
                  <Stack.Screen name='Root' component={BottomTabNavigator} />
                  <Stack.Screen name='CompanyList' component={CompanyList} />
                  <Stack.Screen name='Company' component={Company} />
                  <Stack.Screen name='Order' component={Order} />
                </>
              ) : (
                <>
                  <Stack.Screen name='SignIn' component={SignIn} />
                  <Stack.Screen name='SignUp' component={SignUp} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ApolloProvider>
    );
  }
}
AppRegistry.registerComponent('MyApplication', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
