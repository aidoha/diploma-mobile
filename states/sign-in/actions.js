import { UPDATE_USERNAME, UPDATE_PASSWORD } from './types';

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
