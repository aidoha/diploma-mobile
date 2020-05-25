import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_FIRST_NAME,
  UPDATE_SECOND_NAME,
  UPDATE_PHONE,
} from './types';

export const initialState = {
  username: '',
  password: '',
  firstName: '',
  secondName: '',
  phone: '',
};

export const reducer = (state = intitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: payload,
      };
    case UPDATE_SECOND_NAME:
      return {
        ...state,
        secondName: payload,
      };
    case UPDATE_PHONE:
      return {
        ...state,
        phone: payload,
      };
    default:
      return initialState;
  }
};
