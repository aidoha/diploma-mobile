import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANIES, SEARCH } from '../../queries/company-list';
import CompanySearchResult from './components/companySearchResult';

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
  const [searchText, setSearchText] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { data: searchData } = useQuery(SEARCH, {
    variables: {
      businessCompanyName: searchText,
    },
    skip: !searchText || !searchEnabled,
  });
  const { data, loading } = useQuery(GET_COMPANIES, {
    variables: { categoryID },
  });
  const companies = data?.getBusinessCompaniesUnderCategory?.businessCompanies;

  const onSearchHandler = (value) => {
    setSearchText(value);
    setSearchEnabled(true);
  };

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <EvilIcons name='search' size={24} color='black' />
          <TextInput
            style={styles.searchInput}
            placeholder='Поиск'
            value={searchText}
            onChangeText={(value) => onSearchHandler(value)}
          />
        </View>
        {searchEnabled && (
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setSearchEnabled(false);
            }}
          >
            <FontAwesome name='remove' size={20} color='black' />
          </TouchableOpacity>
        )}
      </View>
      {searchEnabled ? (
        <CompanySearchResult
          data={searchData?.searchBusinessCompany?.businessCompanies}
          navigation={navigation}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {companies?.length === 0 && (
            <View style={styles.no_company_block}>
              <Text>В этой категории, компании еще не зарегистрированы</Text>
            </View>
          )}
          {!loading &&
            companies &&
            companies.map((item) => {
              const {
                businessCompanyID,
                businessCompanyName,
                businessCompanyAddress,
                businessCompanyImages,
              } = item;
              const image =
                businessCompanyImages?.length > 0
                  ? {
                      uri: businessCompanyImages?.[0]?.imagePath,
                    }
                  : require('../../assets/images/company.jpg');

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Company', item)}
                  key={businessCompanyID}
                >
                  <View style={styles.company}>
                    <Text style={styles.company_name}>
                      {businessCompanyName}
                    </Text>
                    <Image style={styles.company_image} source={image} />
                    <Text>{businessCompanyAddress}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}
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
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchInput: {
    padding: 20,
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
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  company_image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  no_company_block: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
});
