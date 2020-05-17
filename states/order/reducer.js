import {
  UPDATE_CLIENT_NAME,
  UPDATE_CLIENT_PHONE,
  UPDATE_DATE,
  UPDATE_AVAILABLE_HOURS,
} from './types';

export const initialState = {
  name: '',
  phone: '',
  date: '',
  availableHour: '',
  comment: '',
  availableHours: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CLIENT_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_CLIENT_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_AVAILABLE_HOURS:
      return {
        ...state,
        availableHours: action.payload,
      };
  }
};
