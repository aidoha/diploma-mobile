import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import CatalogScreen from '../screens/CatalogScreen';
import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Catalog';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Catalog'
        component={CatalogScreen}
        options={{
          title: 'Каталог',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-code-working' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Links'
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-book' />
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
    case 'Links':
      return 'Links to learn more';
  }
}
