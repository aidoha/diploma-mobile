import { UPDATE_CLIENT_NAME, UPDATE_CLIENT_PHONE, UPDATE_DATE } from './types';

export const clientNameHandler = (name = '') => {
  return {
    type: UPDATE_CLIENT_NAME,
    payload: name,
  };
};
export const clientPhoneHandler = (phone = '') => {
  return {
    type: UPDATE_CLIENT_PHONE,
    payload: phone,
  };
};
export const dateHandler = (date = '') => {
  return {
    type: UPDATE_DATE,
    payload: date,
  };
};
