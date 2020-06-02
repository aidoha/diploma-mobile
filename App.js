import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AppRegistry,
  YellowBox,
} from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CompanyList from './screens/company-list/CompanyListScreen';
import Company from './screens/company/CompanyScreen';
import Order from './screens/order/OrderScreen';
import OrderHistory from './screens/profile/components/order-history';
import SignUp from './screens/auth/SignUpScreen';
import SignIn from './screens/auth/SignInScreen';

YellowBox.ignoreWarnings(['Remote debugger']);
console.disableYellowBox = true;
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://46.101.138.224:9090/query',
  cache,
});
const Stack = createStackNavigator();
export const AppContext = React.createContext();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      let result = await SecureStore.getItemAsync('token');
      setToken(result);
    };
    getToken();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <AppContext.Provider value={{ token, setToken }}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
            <NavigationContainer>
              <Stack.Navigator>
                {token ? (
                  <>
                    <Stack.Screen name='Root' component={BottomTabNavigator} />
                    <Stack.Screen name='CompanyList' component={CompanyList} />
                    <Stack.Screen name='Company' component={Company} />
                    <Stack.Screen name='Order' component={Order} />
                    <Stack.Screen
                      name='OrderHistory'
                      component={OrderHistory}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name='SignIn'
                      options={{ headerLeft: null }}
                      component={SignIn}
                    />
                    <Stack.Screen
                      name='SignUp'
                      options={{ headerLeft: null }}
                      component={SignUp}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </AppContext.Provider>
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
