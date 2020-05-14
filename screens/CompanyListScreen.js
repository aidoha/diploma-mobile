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
import gql from 'graphql-tag';

const companies = [
  {
    id: 1,
    name: 'Company one',
    address: 'Gabdullina 72',
  },
  {
    id: 2,
    name: 'Company two',
    address: 'Buhar Jyrau 9',
  },
  {
    id: 3,
    name: 'Company three',
    address: 'Baizakova 116',
  },
  {
    id: 4,
    name: 'Company four',
    address: 'Baizakova 220',
  },
];

export default function CompanyListScreen({ route, navigation }) {
  const routeName =
    route.params.businessCategoryName.charAt(0).toUpperCase() +
    route.params.businessCategoryName.slice(1);
  navigation.setOptions({ headerTitle: routeName });
  // if (loading)
  //   return (
  //     <View style={styles.horizontal}>
  //       <ActivityIndicator size='large' color='#7654ff' />
  //     </View>
  //   );
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {companies.map((item) => {
          const { id, name, address } = item;
          return (
            <TouchableOpacity key={id}>
              <View style={styles.company}>
                <Text style={styles.company_name}>{name}</Text>
                <Image
                  style={styles.company_image}
                  source={require('../assets/images/company.jpg')}
                />
                <Text>{address}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    padding: 10,
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 10,
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
