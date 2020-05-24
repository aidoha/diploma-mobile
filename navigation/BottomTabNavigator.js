import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import CatalogScreen from '../screens/catalog/CatalogScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Catalog';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: 'grey',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: '#fff',
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name='Catalog'
        component={CatalogScreen}
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color }) => (
            <Entypo color={color} name='shop' size={24} />
          ),
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} name='person' size={24} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Catalog':
      return 'Каталог';
    case 'Profile':
      return 'Профиль';
  }
}
