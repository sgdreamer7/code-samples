import { spawn, all, take, call, put } from 'redux-saga/effects';

import { COOKIE_TOKEN_KEY } from '../config';
import { ApiService, CookieService } from '../utils';
import { AUTH_TYPES } from '../types';
import { authActions, userActions } from '../actions';

function* login() {
  while (true) {
    const { payload, onSuccess, onError } = yield take(
      AUTH_TYPES.LOGIN_REQUEST,
    );
    try {
      const { caller } = ApiService.instance;

      yield put(authActions.loginSuccess());
      if (onSuccess && onSuccess instanceof Function) onSuccess();

      // const { data } = yield call(caller.post, 'api/omniauth_callbacks', { code: payload.code });

      // const { id_token } = payload.tokenObj;
      // const profile = payload.getBasicProfile();
      // const authResponse = payload.getAuthResponse();

      // const user = {
      //   email: profile.getEmail(),
      //   family_name: profile.getFamilyName(),
      //   given_name: profile.getGivenName(),
      //   google_id: profile.getId(),
      //   picture: profile.getImageUrl(),
      // };
      // yield put(authActions.loginSuccess());
      // yield put(userActions.updateUser(user));
      // yield call(CookieService.setCookie, COOKIE_TOKEN_KEY, authResponse.id_token);

      // if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (e) {
      yield put(authActions.loginError(e));
      if (onError && onError instanceof Function) onError('Cannot find user');
    }
  }
}

function* signup() {
  while (true) {
    const { payload, onSuccess, onError } = yield take(
      AUTH_TYPES.SIGNUP_REQUEST,
    );
    try {
      const { caller } = ApiService.instance;

      yield put(authActions.signupSuccess());
      if (onSuccess && onSuccess instanceof Function)
        onSuccess('Cannot find user');
    } catch (e) {
      yield put(authActions.signupError(e));
      if (onError && onError instanceof Function)
        onError('User already exists');
    }
  }
}

function* resetPassword() {
  while (true) {
    const { payload, onSuccess, onError } = yield take(
      AUTH_TYPES.RESET_PASSWORD_REQUEST,
    );
    try {
      const { caller } = ApiService.instance;

      yield put(authActions.resetPasswordSuccess());
      if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (e) {
      yield put(authActions.resetPasswordError(e));
      if (onError && onError instanceof Function) onError('Cannot find email');
    }
  }
}

function* changePassword() {
  while (true) {
    const { payload, onSuccess, onError } = yield take(
      AUTH_TYPES.CHANGE_PASSWORD_REQUEST,
    );
    try {
      const { caller } = ApiService.instance;

      yield put(authActions.changePasswordSuccess());
      if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (e) {
      yield put(authActions.changePasswordError(e));
      if (onError && onError instanceof Function) onError('Cannot find user');
    }
  }
}

function* logout() {
  while (true) {
    try {
      const { onSuccess } = yield take(AUTH_TYPES.LOGOUT_REQUEST);
      const token = yield call(
        CookieService.getFromLocalCookie,
        COOKIE_TOKEN_KEY,
      );
      yield call(CookieService.clear, COOKIE_TOKEN_KEY);
      yield put(userActions.clearUser());
      if (onSuccess && onSuccess instanceof Function) onSuccess();
    } catch (error) {
      console.error('Logout error ->> ', error);
    }
  }
}

export const AuthSaga = function*() {
  yield all([
    spawn(login),
    spawn(signup),
    spawn(resetPassword),
    spawn(changePassword),
    spawn(logout),
  ]);
};
