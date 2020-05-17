import React, { useReducer } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import {
  reducer as orderStateReducer,
  initialState,
} from '../../../states/order/reducer';
import {
  clientNameHandler,
  clientPhoneHandler,
  dateHandler,
} from '../../../states/order/actions';
import { width } from '../../../constants/Layout';

const OrderForm = () => {
  const [orderState, dispatch] = useReducer(orderStateReducer, initialState);
  console.log(orderState);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch(clientNameHandler(text))}
        value={orderState.name}
        placeholder='Ваше имя'
      />
      <TextInputMask
        style={styles.input}
        type='custom'
        keyboardType='phone-pad'
        options={{
          mask: '+7 999 999 99 99',
        }}
        value={orderState.phone}
        onChangeText={(text) => dispatch(clientPhoneHandler(text))}
        placeholder='Ваш номер телефона'
      />
      <DatePicker
        style={styles.input}
        date={orderState.date}
        mode='date'
        placeholder='Выбрать дату'
        format='DD.MM.YYYY'
        confirmBtnText='Выбрать'
        cancelBtnText='Отмена'
        showIcon={false}
        customStyles={{
          dateText: {
            fontSize: 20,
          },
          placeholderText: {
            fontSize: 20,
          },
          dateInput: {
            borderWidth: 0,
          },
          btnTextConfirm: {
            color: '#000',
          },
        }}
        onDateChange={(date) => dispatch(dateHandler(date))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
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

export default OrderForm;
