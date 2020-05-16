import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { width } from '../constants/Layout';

const CategoryItem = ({ navigation, category }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CompanyList', category)}
    >
      <View style={styles.category_item}>
        <Text style={styles.category_item_text}>
          {category.businessCategoryName}
        </Text>
        <View>
          {category.businessCategoryID === 1 && (
            <Image
              style={styles.category_item_logo}
              source={require('../assets/images/entertainment.png')}
            />
          )}
          {category.businessCategoryID === 2 && (
            <Image
              style={styles.category_item_logo}
              source={require('../assets/images/sport.png')}
            />
          )}
          {category.businessCategoryID === 3 && (
            <Image
              style={styles.category_item_logo}
              source={require('../assets/images/food.png')}
            />
          )}
          {category.businessCategoryID === 4 && (
            <Image
              style={styles.category_item_logo}
              source={require('../assets/images/beauty.png')}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category_item: {
    width: width * 0.4,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: (width * 0.4) / 2,
    borderColor: '#333',
    borderWidth: 1,
  },
  category_item_text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  category_item_logo: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});
