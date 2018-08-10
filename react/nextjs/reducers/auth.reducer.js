import { AUTH_TYPES as TYPES } from '../types';

const initialState = {
  isPasswordReset: false,
  isPasswordChanged: false,
  error: null,
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
      return { ...state, error: payload, processing: false };

    case TYPES.CHANGE_USER_AUTH:
      return { ...state, isAuth: payload };

    case TYPES.LOGIN_REQUEST:
    case TYPES.SIGNUP_REQUEST:
      return { ...state, processing: true, error: null };

    case TYPES.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        processing: true,
        error: null,
        isPasswordChanged: false,
      };

    case TYPES.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        processing: true,
        isPasswordReset: false,
        error: null,
      };

    case TYPES.RESET_PASSWORD_SUCCESS:
      return { ...state, processing: false, isPasswordReset: true };

    case TYPES.LOGIN_SUCCESS:
    case TYPES.SIGNUP_SUCCESS:
      return { ...state, processing: false };

    case TYPES.CHANGE_PASSWORD_SUCCESS:
      return { ...state, processing: false, isPasswordChanged: true };

    case TYPES.CLEAR_ERROR:
      return { ...state, error: null };

    case TYPES.CLEAR_CHANGE_PASSWORD:
      return { ...state, isPasswordChanged: false };

    case TYPES.CLEAR_RESET_PASSWORD:
      return { ...state, isPasswordReset: false };

    default:
      return state;
  }
};
