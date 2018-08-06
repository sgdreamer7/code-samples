import { Action } from '@ngrx/store';

import { Language } from 'app/core/models';

export const BLOG_CHANGE_LANGUAGE: string = '[Languages(Blog)] Change Language';
export const BLOG_CHANGE_LANGUAGE_SUCCESS: string = '[Languages(Blog)] Change Language Success';
export const BLOG_CHANGE_LANGUAGE_FAIL: string = '[Languages(Blog)] Change Language Fail';

export class ChangeLanguage implements Action {
  readonly type: string = BLOG_CHANGE_LANGUAGE;
  constructor(public payload: Language) {}
}

export class ChangeLanguageSuccess implements Action {
  readonly type: string = BLOG_CHANGE_LANGUAGE_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ChangeLanguageFail implements Action {
  readonly type: string = BLOG_CHANGE_LANGUAGE_FAIL;
  constructor(public payload: any) {}
}

export type LanguageAction =
 | ChangeLanguage
 | ChangeLanguageSuccess
 | ChangeLanguageFail;
