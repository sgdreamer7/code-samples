import { Action } from '@ngrx/store';

import { Language } from 'app/core/models';

export const LOAD_LANGUAGES: string = '[Languages] Load Languages';
export const LOAD_LANGUAGES_FAIL: string = '[Languages] Load Languages Fail';
export const LOAD_LANGUAGES_SUCCESS: string = '[Languages] Load Languages Success';

export class LoadLanguages implements Action {
  readonly type: string = LOAD_LANGUAGES;
}

export class LoadLanguagesFail implements Action {
  readonly type: string = LOAD_LANGUAGES_FAIL;
  constructor(public payload: any) {}
}

export class LoadLanguagesSuccess implements Action {
  readonly type: string = LOAD_LANGUAGES_SUCCESS;
  constructor(public payload: Language[]) {}
}

export const CHANGE_LANGUAGE: string = '[Languages] Change Language';
export const CHANGE_LANGUAGE_SUCCESS: string = '[Languages] Change Language Success';
export const CHANGE_LANGUAGE_FAIL: string = '[Languages] Change Language Fail';

export class ChangeLanguage implements Action {
  readonly type: string = CHANGE_LANGUAGE;
  constructor(public payload: Language) {}
}

export class ChangeLanguageSuccess implements Action {
  readonly type: string = CHANGE_LANGUAGE_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ChangeLanguageFail implements Action {
  readonly type: string = CHANGE_LANGUAGE_FAIL;
  constructor(public payload: any) {}
}

export const SET_TRANSLATIONS: string = '[Languages] Set Translations';

export class SetTranslations implements Action {
  readonly type: string = SET_TRANSLATIONS;
  constructor(public payload: any) {}
}

export type LanguageAction =
 | LoadLanguages
 | LoadLanguagesFail
 | LoadLanguagesSuccess
 | ChangeLanguage
 | ChangeLanguageSuccess
 | ChangeLanguageFail
 | SetTranslations;
