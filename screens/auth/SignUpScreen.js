import React, { useReducer, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import {
  initialState,
  reducer as authReducer,
} from '../../states/auth/reducer';
import SignUpInputs from './components/sign-up-inputs';
import AuthBtns from './components/auth-btns';
import { CUSTOMER_SIGN_UP } from '../../queries/auth';
import { AppContext } from '../../App';
import { parsePhone } from '../../utils';

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
  const context = useContext(AppContext);
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { username, password, firstName, secondName, phone } = authState;
  const [signUpCustomer, { loading }] = useMutation(CUSTOMER_SIGN_UP);

  const onSubmit = () => {
    signUpCustomer({
      variables: {
        customerFirstName: firstName,
        customerSecondName: secondName,
        customerEmail: username,
        customerPassword: password,
        customerPhoneNumberPrefix: '+7',
        customerPhoneNumber: parsePhone(phone),
      },
    })
      .then(async (res) => {
        if (res.data) {
          const token = res.data.createCustomer.token.accessToken;
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
          <SignUpInputs dispatch={dispatch} authState={authState} />
          <AuthBtns
            type='signUp'
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
});

export default SignUpScreen;
