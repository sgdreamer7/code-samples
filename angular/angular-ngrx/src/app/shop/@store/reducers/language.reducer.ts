import * as fromLanguages from '../actions/language.action';

import { Language } from 'app/core/models';

export class CurrentLanguageState {
  current: Language;
}

export const initialState: CurrentLanguageState = {
  current: { value: 'en', name: 'EN'}
};

export function reducer(
  state: CurrentLanguageState = initialState,
  action: fromLanguages.LanguageAction
): CurrentLanguageState {
  switch (action.type) {

    case fromLanguages.SHOP_CHANGE_LANGUAGE: {
      return {
        ...state,
        current: action['payload']
      };
    }

    case fromLanguages.SHOP_CHANGE_LANGUAGE_FAIL: {
      return {
        ...state
      };
    }

    case fromLanguages.SHOP_CHANGE_LANGUAGE_SUCCESS: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
