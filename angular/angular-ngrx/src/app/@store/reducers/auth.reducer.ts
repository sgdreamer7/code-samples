import * as fromAuth from '../actions/auth.action';

import { User } from '../../core/models';

export class AuthState {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  loaded: boolean;
  error?: string;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  loading: false,
  loaded: false
};

export function reducer(
  state: AuthState = initialState,
  action: fromAuth.AuthAction
): AuthState {

  switch (action.type) {
    case fromAuth.AUTH_LOGIN: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case fromAuth.AUTH_REGISTER: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: ''
      };
    }
    case fromAuth.AUTH_LOGIN_FAIL || fromAuth.AUTH_REGISTER_FAIL: {
      return {
        ...state,
        user: null,
        loggedIn: false,
        loaded: true,
        loading: false,
        error: action['payload']
      };
    }
    case fromAuth.AUTH_LOGIN_SUCCESS || fromAuth.AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action['payload']['user'],
        loaded: true,
        loading: false,
        error: ''
      };
    }
    case fromAuth.AUTH_GET_USER: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: ''
      };
    }
    case fromAuth.AUTH_LOGOUT: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: null,
        loggedIn: false,
        error: ''
      };
    }
    case fromAuth.AUTH_CHECK: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: ''
      };
    }
    case fromAuth.AUTHENTICATE_BY_TOKEN: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: ''
      };
    }
    default: {
      return state;
    }
  }
}

export const getUser: any = (state: AuthState): User => state.user;
export const getLoggedIn: any = (state: AuthState): boolean => state.loggedIn;
