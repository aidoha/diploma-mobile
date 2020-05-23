import React from 'react';
import { View, Text } from 'react-native';

const navigationObj = {
  headerTitle: 'Зарегистрироваться',
  headerStyle: { backgroundColor: '#000000' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const SignUpScreen = ({ navigation }) => {
  navigation.setOptions(navigationObj);
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  );
};

export default SignUpScreen;
