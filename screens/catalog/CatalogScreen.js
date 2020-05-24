import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_BUSINESS_CATEGORIES } from '../../queries/catalog';
import CategoryItem from '../../components/category-item';

export default function CatalogScreen(props) {
  const { data, loading } = useQuery(GET_BUSINESS_CATEGORIES);

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!loading &&
        data?.getBusinessCategories.map((category) => (
          <CategoryItem
            key={category.businessCategoryID}
            category={category}
            {...props}
          />
        ))}
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
    justifyContent: 'center',
    alignItems: 'center',
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
