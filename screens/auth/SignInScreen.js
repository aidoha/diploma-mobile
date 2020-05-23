import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { width } from '../../constants/Layout';

const SignInScreen = ({ navigation, route }) => {
  navigation.setOptions({
    headerTitle: 'Войти',
    headerStyle: { backgroundColor: '#000000' },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
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
            // onChangeText={(text) => dispatch(clientNameHandler(text))}
            // value={orderState.name}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Пароль'
            // onChangeText={(text) => dispatch(clientNameHandler(text))}
            // value={orderState.name}
          />
          <View style={styles.button_wrapper}>
            <TouchableOpacity
              style={
                // !orderState.name ||
                // !orderState.phone ||
                // !orderState.date ||
                // !orderState.availableHour ||
                // !orderState.comment
                //   ? styles.button_disabled
                //   :
                styles.button
              }
              // onPress={showConfirmAlert}
              // disabled={
              //   !orderState.name ||
              //   !orderState.phone ||
              //   !orderState.date ||
              //   !orderState.availableHour ||
              //   !orderState.comment
              // }
            >
              <Text style={styles.button_text}>Войти</Text>
            </TouchableOpacity>
          </View>
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
});

export default SignInScreen;
