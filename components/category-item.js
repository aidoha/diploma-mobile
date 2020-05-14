import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CategoryItem = ({ navigation, category }) => {
  console.log('==>', category);

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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    borderColor: '#7654ff',
    borderWidth: 1,
  },
  category_item_text: {
    color: '#7654ff',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  category_item_logo: {
    width: 30,
    height: 30,
  },
});
