import React from 'react';
import { View, Text } from 'react-native';

const CategoryItem = ({ category }) => {
  return (
    <View>
      <Text>{category.businessCategoryName}</Text>
    </View>
  );
};

export default CategoryItem;
