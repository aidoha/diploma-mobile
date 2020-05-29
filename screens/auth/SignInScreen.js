import React, { useReducer, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import AuthBtns from './components/auth-btns';
import { usernameHandler, passwordHandler } from '../../states/auth/actions';
import {
  initialState,
  reducer as authReducer,
} from '../../states/auth/reducer';
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

const SignInScreen = ({ navigation }) => {
  navigation.setOptions(navigationObj);
  const context = useContext(AppContext);
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { username, password } = authState;
  const [getCustomerToken, { loading }] = useMutation(CUSTOMER_SIGN_IN);

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
          <AuthBtns
            type='signIn'
            navigation={navigation}
            onSubmit={onSubmit}
            authState={authState}
          />
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
});

export default SignInScreen;
