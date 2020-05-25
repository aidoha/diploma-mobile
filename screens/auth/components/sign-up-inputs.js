import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import {
  usernameHandler,
  passwordHandler,
  firstNameHandler,
  secondNameHandler,
  phoneHandler,
} from '../../../states/auth/actions';
import { width } from '../../../constants/Layout';

const SignUpInputs = ({ authState, dispatch }) => {
  const { username, password, firstName, secondName, phone } = authState;
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder='Имя'
        onChangeText={(text) => dispatch(firstNameHandler(text))}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder='Фамилия'
        onChangeText={(text) => dispatch(secondNameHandler(text))}
        value={secondName}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={(text) => dispatch(usernameHandler(text))}
        value={username}
      />
      <TextInputMask
        style={styles.input}
        type='custom'
        keyboardType='phone-pad'
        options={{
          mask: '+7 999 999 99 99',
        }}
        value={phone}
        onChangeText={(text) => dispatch(phoneHandler(text))}
        placeholder='Ваш номер телефона'
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='Пароль'
        onChangeText={(text) => dispatch(passwordHandler(text))}
        value={password}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    width: width * 0.8,
  },
});

export default SignUpInputs;
