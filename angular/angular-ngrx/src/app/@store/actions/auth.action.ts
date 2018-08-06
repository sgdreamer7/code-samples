import { Action } from '@ngrx/store';

export const AUTH_LOGIN: string = '[Auth] Login';
export const AUTH_LOGIN_SUCCESS: string = '[Auth] Login Success';
export const AUTH_LOGIN_FAIL: string = '[Auth] Login Fail';

export class Login implements Action {
  readonly type: string = AUTH_LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type: string = AUTH_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type: string = AUTH_LOGIN_FAIL;
  constructor(public payload: any) {}
}

export const AUTH_REGISTER: string = '[Auth] Register';
export const AUTH_REGISTER_SUCCESS: string = '[Auth] Register Success';
export const AUTH_REGISTER_FAIL: string = '[Auth] Register Fail';

export class Register implements Action {
  readonly type: string = AUTH_REGISTER;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type: string = AUTH_REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterFail implements Action {
  readonly type: string = AUTH_REGISTER_FAIL;
  constructor(public payload: any) {}
}

export const AUTH_GET_USER: string = '[Auth] Get User';

export class GetUser implements Action {
  readonly type: string = AUTH_GET_USER;
  constructor(public payload: any) {}
}

export const AUTH_LOGOUT: string = '[Auth] Logout';

export class Logout implements Action {
  readonly type: string = AUTH_LOGOUT;
}

export const AUTHENTICATE_BY_TOKEN: string = '[Auth] Authenticate by token';

export class Authenticate implements Action {
  readonly type: string = AUTHENTICATE_BY_TOKEN;
  constructor(public payload: {token: string, type: string}) {}
}

export const AUTH_CHECK: string = '[Auth] Check for token';

export class CheckAuth implements Action {
  readonly type: string = AUTH_CHECK;
}

export type AuthAction = Login
  | LoginFail
  | LoginSuccess
  | Register
  | RegisterFail
  | RegisterSuccess
  | GetUser
  | Logout
  | Authenticate
  | CheckAuth;
