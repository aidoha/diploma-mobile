import React, { useReducer, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { usernameHandler, passwordHandler } from '../../states/sign-in/actions';
import {
  initialState,
  reducer as signInReducer,
} from '../../states/sign-in/reducer';
import { width } from '../../constants/Layout';
import { CUSTOMER_SIGN_IN } from '../../queries/auth';
import { AppContext } from '../../App';

const navigationObj = {
  headerTitle: 'Войти',
  headerStyle: { backgroundColor: '#000000' },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const SignInScreen = ({ navigation, route }) => {
  navigation.setOptions(navigationObj);
  const context = useContext(AppContext);
  const [signInState, dispatch] = useReducer(signInReducer, initialState);
  const { username, password } = signInState;
  const [getCustomerToken, { loading, error }] = useMutation(CUSTOMER_SIGN_IN);

  const onSubmit = () => {
    getCustomerToken({
      variables: {
        email: username,
        password,
      },
    })
      .then(async (res) => {
        if (res.data) {
          const token = res.data.createCustomerToken.token.accessToken;
          await SecureStore.setItemAsync('token', token);
          await context.setToken(token);
        }
      })
      .catch((err) => {
        Alert.alert('Упс, произошла ошибка!', 'Попробуйте позже', [
          { text: 'Ок', onPress: () => console.log('auth err', err) },
        ]);
      });
  };

  if (loading) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size='large' color='#000000' />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Имя пользователя или email'
            onChangeText={(text) => dispatch(usernameHandler(text))}
            value={username}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Пароль'
            onChangeText={(text) => dispatch(passwordHandler(text))}
            value={password}
          />
          <View style={styles.button_wrapper}>
            <TouchableOpacity
              style={
                !username || !password ? styles.button_disabled : styles.button
              }
              onPress={onSubmit}
              disabled={!username || !password}
            >
              <Text style={styles.button_text}>Войти</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.no_account_text}>У вас еще нет аккаунта?</Text>
          <Text
            style={styles.signUp_text}
            onPress={() => navigation.navigate('CompanyList')}
          >
            Зарегистрироваться
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6fa',
  },
  horizontal: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  signUp_text: {
    fontSize: 16,
    color: '#0095f6',
    marginTop: 20,
  },
});

export default SignInScreen;
