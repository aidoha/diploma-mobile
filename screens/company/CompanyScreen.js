import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CompanyInfo from './components/company-info';
import CompanyServices from './components/company-service-list';
import { width } from '../../constants/Layout';
import { GET_COMPANY_SERVICES } from '../../queries/company';

const initialLayout = { width };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#fff' }}
    style={{ backgroundColor: '#000000' }}
  />
);

export default function CompanyScreen({ route, navigation }) {
  const { businessCompanyID, businessCompanyName } = route.params;
  navigation.setOptions({
    headerTitle: businessCompanyName,
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'О компании' },
    { key: 'second', title: 'Услуги' },
  ]);

  const renderScene = SceneMap({
    first: () => <CompanyInfo data={route.params} />,
    second: () => (
      <CompanyServices
        data={data?.getBusinessCompanyServices?.businessCompanyService}
      />
    ),
  });

  const { data, loading } = useQuery(GET_COMPANY_SERVICES, {
    variables: { businessCompanyID },
  });

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#7654ff' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.company_image}
        source={require('../../assets/images/company.jpg')}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

CompanyScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
