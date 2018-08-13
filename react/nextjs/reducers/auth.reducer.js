import { AUTH_TYPES as TYPES } from '../types';

const initialState = {
  isAuth: false,
  processing: false,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SIGNUP_ERROR:
    case TYPES.LOGIN_ERROR:
    case TYPES.RESET_PASSWORD_ERROR:
    case TYPES.CHANGE_PASSWORD_ERROR:
      return { ...state, processing: false };

    case TYPES.CHANGE_USER_AUTH:
      return { ...state, isAuth: payload };

    case TYPES.LOGIN_REQUEST:
    case TYPES.SIGNUP_REQUEST:
    case TYPES.CHANGE_PASSWORD_REQUEST:
    case TYPES.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        processing: true,
      };

    case TYPES.RESET_PASSWORD_SUCCESS:
    case TYPES.LOGIN_SUCCESS:
    case TYPES.SIGNUP_SUCCESS:
    case TYPES.CHANGE_PASSWORD_SUCCESS:
      return { ...state, processing: false };

    default:
      return state;
  }
};
