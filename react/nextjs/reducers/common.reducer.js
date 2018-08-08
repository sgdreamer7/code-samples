import { COMMON_TYPES } from './../types';

const INITIAL_STATE = {
  currentUrl: '',
};

export const CommonReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMON_TYPES.CURRENT_URL:
      return { ...state, currentUrl: payload };
    default:
      return state;
  }
};
