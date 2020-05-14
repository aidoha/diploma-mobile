import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryItem from '../components/category-item';

const GET_BUSINESS_CATEGORIES = gql`
  query getCategories {
    getBusinessCategories {
      businessCategoryID
      businessCategoryName
    }
  }
`;

export default function CatalogScreen(props) {
  const { data, loading } = useQuery(GET_BUSINESS_CATEGORIES);

  if (loading)
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#7654ff' />
      </View>
    );
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {!loading &&
          data?.getBusinessCategories.map((category) => (
            <CategoryItem
              key={category.businessCategoryID}
              category={category}
              {...props}
            />
          ))}
      </ScrollView>
    </View>
  );
}

CatalogScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
