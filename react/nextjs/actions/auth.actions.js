import { AUTH_TYPES } from '../types';

export const login = (payload, onSuccess, onError) => ({
  type: AUTH_TYPES.LOGIN_REQUEST,
  payload,
  onSuccess,
  onError,
});
export const loginError = payload => ({
  type: AUTH_TYPES.LOGIN_ERROR,
  payload,
});
export const loginSuccess = payload => ({
  type: AUTH_TYPES.LOGIN_SUCCESS,
  payload,
});

export const signup = (payload, onSuccess, onError) => ({
  type: AUTH_TYPES.SIGNUP_REQUEST,
  payload,
  onSuccess,
  onError,
});
export const signupError = payload => ({
  type: AUTH_TYPES.SIGNUP_ERROR,
  payload,
});
export const signupSuccess = payload => ({
  type: AUTH_TYPES.SIGNUP_SUCCESS,
  payload,
});

export const resetPassword = (payload, onSuccess, onError) => ({
  type: AUTH_TYPES.RESET_PASSWORD_REQUEST,
  payload,
  onSuccess,
  onError,
});
export const resetPasswordError = payload => ({
  type: AUTH_TYPES.RESET_PASSWORD_ERROR,
  payload,
});
export const resetPasswordSuccess = payload => ({
  type: AUTH_TYPES.RESET_PASSWORD_SUCCESS,
  payload,
});

export const changePassword = (payload, onSuccess, onError) => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_REQUEST,
  payload,
  onSuccess,
  onError,
});
export const changePasswordError = payload => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_ERROR,
  payload,
});
export const changePasswordSuccess = payload => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const logout = onSuccess => ({
  type: AUTH_TYPES.LOGOUT_REQUEST,
  onSuccess,
});
