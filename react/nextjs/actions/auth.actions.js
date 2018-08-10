import { AUTH_TYPES } from '../types';

export const login = (payload, onSuccess) => ({
  type: AUTH_TYPES.LOGIN_REQUEST,
  payload,
  onSuccess,
});
export const loginError = payload => ({
  type: AUTH_TYPES.LOGIN_ERROR,
  payload,
});
export const loginSuccess = payload => ({
  type: AUTH_TYPES.LOGIN_SUCCESS,
  payload,
});

export const signup = (payload, onSuccess) => ({
  type: AUTH_TYPES.SIGNUP_REQUEST,
  payload,
  onSuccess,
});
export const signupError = payload => ({
  type: AUTH_TYPES.SIGNUP_ERROR,
  payload,
});
export const signupSuccess = payload => ({
  type: AUTH_TYPES.SIGNUP_SUCCESS,
  payload,
});

export const resetPassword = (payload, onSuccess) => ({
  type: AUTH_TYPES.RESET_PASSWORD_REQUEST,
  payload,
  onSuccess,
});
export const resetPasswordError = payload => ({
  type: AUTH_TYPES.RESET_PASSWORD_ERROR,
  payload,
});
export const resetPasswordSuccess = payload => ({
  type: AUTH_TYPES.RESET_PASSWORD_SUCCESS,
  payload,
});
export const clearResetPassword = () => ({
  type: AUTH_TYPES.CLEAR_RESET_PASSWORD,
});

export const changePassword = (payload, onSuccess) => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_REQUEST,
  payload,
  onSuccess,
});
export const changePasswordError = payload => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_ERROR,
  payload,
});
export const changePasswordSuccess = payload => ({
  type: AUTH_TYPES.CHANGE_PASSWORD_SUCCESS,
  payload,
});
export const clearChangePassword = () => ({
  type: AUTH_TYPES.CLEAR_CHANGE_PASSWORD,
});

export const clearError = () => ({
  type: AUTH_TYPES.CLEAR_ERROR,
});

export const logout = onSuccess => ({
  type: AUTH_TYPES.LOGOUT_REQUEST,
  onSuccess,
});
