import { USER_TYPES } from './../types';

export const updateUser = payload => ({ type: USER_TYPES.UPDATE_USER, payload });
export const clearUser = () => ({ type: USER_TYPES.CLEAR_USER });
