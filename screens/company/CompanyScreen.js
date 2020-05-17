import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import CompanyInfo from './components/company-info';
import CompanyServices from './components/company-service-list';
import { width, height } from '../../constants/Layout';
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
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.open();
          setSheetView(true);
        }}
      >
        <View style={styles.button}>
          <Text style={styles.button_text}>Записаться</Text>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        onClose={() => setSheetView(false)}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height * 0.5}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <Text>sheet view</Text>
      </RBSheet>
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
  button: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#7654ff',
    alignItems: 'center',
  },
  button_text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
  },
});
