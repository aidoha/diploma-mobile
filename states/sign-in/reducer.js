import { UPDATE_USERNAME, UPDATE_PASSWORD } from './types';

export const initialState = {
  username: '',
  password: '',
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
    default:
      return initialState;
  }
};
