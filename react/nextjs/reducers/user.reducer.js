import { USER_TYPES as TYPES } from './../types';

const INITIAL_STATE = {
  email: '',
  given_name: '',
  family_name: '',
  picture: '',
};

export const UserReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.UPDATE_USER:
      return { ...state, ...payload };
    case TYPES.CLEAR_USER:
      return { ...INITIAL_STATE };
    default: return state;
  }
};
