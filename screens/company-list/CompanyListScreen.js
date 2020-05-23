import * as React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANIES } from '../../queries/company-list';

export default function CompanyListScreen({ route, navigation }) {
  const { businessCategoryName, businessCategoryID: categoryID } = route.params;
  const routeName =
    businessCategoryName.charAt(0).toUpperCase() +
    businessCategoryName.slice(1);
  navigation.setOptions({
    headerTitle: routeName,
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
  const { data, loading } = useQuery(GET_COMPANIES, {
    variables: { categoryID },
  });
  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {!loading &&
          data?.getBusinessCompaniesUnderCategory?.businessCompanies.map(
            (item) => {
              const { businessCompanyID, businessCompanyName } = item;
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Company', item)}
                  key={businessCompanyID}
                >
                  <View style={styles.company}>
                    <Text style={styles.company_name}>
                      {businessCompanyName}
                    </Text>
                    <Image
                      style={styles.company_image}
                      source={require('../../assets/images/company.jpg')}
                    />
                    <Text>{'address'}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
      </ScrollView>
    </View>
  );
}

CompanyListScreen.navigationOptions = {
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
  contentContainer: {
    paddingBottom: 30,
  },
  company: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    height: 200,
  },
  company_name: {
    color: '#353535',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 10,
  },
  company_image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});
