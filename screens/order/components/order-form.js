import React, { useReducer, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import AvailableHour from './available-hour';
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
  const [activeHour, setActiveHour] = useState(null);
  const [isDateChanged, setIsDateChanged] = useState(false);
  const [orderState, dispatch] = useReducer(orderStateReducer, initialState);

  const {
    data: dataAvailableHours,
    loading: loadingAvailableHours,
    error: errorAvailableHours,
  } = useQuery(GET_ORDER_AVAILABLE_HOURS, {
    variables: {
      businessServiceID: companyServiceID,
      date: parseDate(orderState.date),
    },
    skip: !isDateChanged,
  });

  useEffect(() => {
    if (dataAvailableHours) {
      dispatch(
        getAvailableHoursHandler(
          dataAvailableHours?.getCompanyAvailableHoursByDate?.availableHour
        )
      );
    }
  }, [isDateChanged, dataAvailableHours]);

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
        onDateChange={(date) => {
          dispatch(dateHandler(date));
          setIsDateChanged(true);
        }}
      />
      <View style={styles.availableHours_container}>
        {!errorAvailableHours &&
          orderState.availableHours &&
          orderState.availableHours.length !== 0 &&
          orderState.availableHours.map((item, index) => (
            <AvailableHour
              key={index}
              index={index}
              hour={{ activeHour, setActiveHour }}
              data={item}
              dispatch={dispatch}
            />
          ))}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => dispatch(clientNameHandler(text))}
        value={orderState.name}
        placeholder='Комментарий'
        multiline
      />
    </View>
    // </KeyboardAvoidingView>
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
  availableHours_container: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrderForm;
