import {
  UPDATE_CLIENT_NAME,
  UPDATE_CLIENT_PHONE,
  UPDATE_CLIENT_COMMENT,
  UPDATE_DATE,
  UPDATE_AVAILABLE_HOURS,
  CHOOSE_AVAILABLE_HOUR,
} from './types';

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
export const clientCommentHandler = (comment = '') => {
  return {
    type: UPDATE_CLIENT_COMMENT,
    payload: comment,
  };
};
export const dateHandler = (date = '') => {
  return {
    type: UPDATE_DATE,
    payload: date,
  };
};
export const getAvailableHoursHandler = (hours = []) => {
  return {
    type: UPDATE_AVAILABLE_HOURS,
    payload: hours,
  };
};
export const selectAvailableHour = (hour = '') => {
  return {
    type: CHOOSE_AVAILABLE_HOUR,
    payload: hour,
  };
};
