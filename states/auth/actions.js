import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_PHONE,
  UPDATE_FIRST_NAME,
  UPDATE_SECOND_NAME,
} from './types';

export const usernameHandler = (username = '') => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export const passwordHandler = (password = '') => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const phoneHandler = (phone = '') => {
  return {
    type: UPDATE_PHONE,
    payload: phone,
  };
};

export const firstNameHandler = (firstName = '') => {
  return {
    type: UPDATE_FIRST_NAME,
    payload: firstName,
  };
};

export const secondNameHandler = (secondName = '') => {
  return {
    type: UPDATE_SECOND_NAME,
    payload: secondName,
  };
};
