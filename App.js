import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry,
} from 'react-native';
// import { ApolloClient } from 'apollo-client';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import CompanyList from './screens/company-list/CompanyListScreen';
import Company from './screens/company/CompanyScreen';
import Order from './screens/order/OrderScreen';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://46.101.138.224:8080/query',
  cache,
});
const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name='Root' component={BottomTabNavigator} />
              <Stack.Screen name='CompanyList' component={CompanyList} />
              <Stack.Screen name='Company' component={Company} />
              <Stack.Screen name='Order' component={Order} />
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
