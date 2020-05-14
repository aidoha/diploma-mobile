import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryItem = (props) => {
  console.log('props', props);
  const { navigation, category } = props;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CompanyList')}>
      <View style={styles.category_item}>
        <Text style={styles.category_item_text}>
          {category.businessCategoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category_item: {
    marginTop: 30,
    backgroundColor: '#7654ff',
    padding: 20,
    borderRadius: 20,
  },
  category_item_text: {
    color: '#fff',
    textTransform: 'uppercase',
  },
});
