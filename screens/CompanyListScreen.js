import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CategoryItem from '../components/category-item';

export default function CompanyListScreen(props) {
  console.log(props);
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
        <Text>CompanyListScreen</Text>
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
    backgroundColor: '#fff',
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
    paddingTop: 30,
  },
});
