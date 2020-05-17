import React, { useReducer, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import { formatISO } from 'date-fns';
import {
  reducer as orderStateReducer,
  initialState,
} from '../../../states/order/reducer';
import {
  clientNameHandler,
  clientPhoneHandler,
  dateHandler,
  getAvailableHoursHandler,
} from '../../../states/order/actions';
import { width } from '../../../constants/Layout';
import {
  GET_ORDER_AVAILABLE_HOURS,
  CREATE_BUSINESS_SERVICE_ORDER,
} from '../../../queries/order';
import { parseDate } from '../../../utils';

const OrderForm = ({ companyServiceID }) => {
  const [isDateChanged, setIsDateChanged] = useState(false);
  const [orderState, dispatch] = useReducer(orderStateReducer, initialState);

  const { data, loading, error } = useQuery(GET_ORDER_AVAILABLE_HOURS, {
    variables: {
      businessServiceID: companyServiceID,
      date: parseDate(orderState.date),
    },
    skip: !isDateChanged,
  });

  useEffect(() => {
    if (data) {
      dispatch(
        getAvailableHoursHandler(
          data?.getCompanyAvailableHoursByDate?.availableHour
        )
      );
    }
  }, [isDateChanged, data]);

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
        onDateChange={(date) => {
          dispatch(dateHandler(date));
          setIsDateChanged(true);
        }}
      />
      {!error &&
        orderState.availableHours &&
        orderState.availableHours.length !== 0 &&
        orderState.availableHours.map((item) => (
          <View>
            <Text>{item}</Text>
          </View>
        ))}
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
