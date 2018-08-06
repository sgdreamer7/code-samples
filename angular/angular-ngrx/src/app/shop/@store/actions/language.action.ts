import { Action } from '@ngrx/store';

import { Language } from 'app/core/models';

export const SHOP_CHANGE_LANGUAGE: string = '[Languages(Shop)] Change Language';
export const SHOP_CHANGE_LANGUAGE_SUCCESS: string = '[Languages(Shop)] Change Language Success';
export const SHOP_CHANGE_LANGUAGE_FAIL: string = '[Languages(Shop)] Change Language Fail';

export class ChangeLanguage implements Action {
  readonly type: string = SHOP_CHANGE_LANGUAGE;
  constructor(public payload: Language) {}
}

export class ChangeLanguageSuccess implements Action {
  readonly type: string = SHOP_CHANGE_LANGUAGE_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ChangeLanguageFail implements Action {
  readonly type: string = SHOP_CHANGE_LANGUAGE_FAIL;
  constructor(public payload: any) {}
}

export type LanguageAction =
 | ChangeLanguage
 | ChangeLanguageSuccess
 | ChangeLanguageFail;
