import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { width } from '../../../constants/Layout';

const AuthBtns = ({
  type,
  navigation,
  onSubmit,
  authState: { username, password },
}) => {
  const isNewUser = type === 'signUp';
  const isOldUser = type === 'signIn';
  return (
    <>
      <View style={styles.button_wrapper}>
        <TouchableOpacity
          style={
            !username || !password ? styles.button_disabled : styles.button
          }
          onPress={onSubmit}
          disabled={!username || !password}
        >
          <Text style={styles.button_text}>
            {isNewUser && 'Зарегистрироваться'}
            {isOldUser && 'Войти'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.no_account_text}>
        {isNewUser && 'У вас есть аккаунт?'}
        {isOldUser && 'У вас еще нет аккаунта?'}
      </Text>
      <Text
        style={styles.redirect_text}
        onPress={() => {
          isNewUser && navigation.navigate('SignIn');
          isOldUser && navigation.navigate('SignUp');
        }}
      >
        {isNewUser ? 'Войти' : 'Зарегистрироваться'}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  button_wrapper: {
    width: width * 0.8,
  },
  button_disabled: {
    marginBottom: 30,
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  button_text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
  },
  no_account_text: {
    fontSize: 16,
  },
  redirect_text: {
    fontSize: 16,
    color: '#0095f6',
    marginTop: 20,
  },
});

export default AuthBtns;
