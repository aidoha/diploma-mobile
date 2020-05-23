import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CompanyInfo from './components/company-info';
import CompanyServices from './components/company-service-list';
import SheetView from './components/sheet-view';
import { width } from '../../constants/Layout';
import { GET_COMPANY_SERVICES } from '../../queries/company';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#fff' }}
    style={{ backgroundColor: '#000000' }}
  />
);

const routes = [
  { key: 'first', title: 'О компании' },
  { key: 'second', title: 'Услуги' },
];

export default function CompanyScreen({ route, navigation }) {
  const [index, setIndex] = useState(0);
  const [sheetView, setSheetView] = useState(false);
  const refRBSheet = useRef();
  const { businessCompanyID, businessCompanyName } = route.params;
  navigation.setOptions({
    headerTitle: businessCompanyName,
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  const handleSheetView = () => {
    setSheetView(!sheetView);
  };

  const renderScene = SceneMap({
    first: () => (
      <CompanyInfo
        data={route.params}
        refRBSheet={refRBSheet}
        handleSheetView={handleSheetView}
      />
    ),
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
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        sheetView && { opacity: 0.5, backgroundColor: '#000' },
      ]}
    >
      <Image
        style={styles.company_image}
        source={require('../../assets/images/company.jpg')}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width }}
        renderTabBar={renderTabBar}
      />
      <SheetView
        refRBSheet={refRBSheet}
        sheetView={sheetView}
        handleSheetView={handleSheetView}
        navigation={navigation}
        services={data?.getBusinessCompanyServices?.businessCompanyService}
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
    backgroundColor: '#f3f6fa',
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
