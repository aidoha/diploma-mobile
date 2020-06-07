import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CompanySearchResult = ({ data, navigation }) => {
  const renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#000',
      }}
    />
  );
  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          key={item.businessCompanyID}
          onPress={() => navigation.navigate('Company', item)}
        >
          <Text style={styles.title}>{item.businessCompanyName}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
  },
  title: {
    color: '#000',
    fontSize: 24,
  },
});

export default CompanySearchResult;
