import * as fromLanguages from '../actions/language.action';

import { Language } from 'app/core/models';

export class LanguageState {
  entities: { [id: number]: any };
  current: Language;
  translations: any;
  loaded: boolean;
  loading: boolean;
}

export class Entity {
  [id: number]: any;
}

export const initialState: LanguageState = {
  entities: {},
  current: { value: 'en', name: 'EN'},
  translations: {},
  loaded: false,
  loading: false
};

export function reducer(
  state: LanguageState = initialState,
  action: fromLanguages.LanguageAction
): LanguageState {
  switch (action.type) {
    case fromLanguages.LOAD_LANGUAGES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromLanguages.LOAD_LANGUAGES_SUCCESS: {
      const reviews: any[] = action['payload'];
      const entities: Entity[] = reviews.reduce(
        (items: Entity, product: any) => {
          return {
            ...items,
            [product.value]: product,
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromLanguages.LOAD_LANGUAGES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromLanguages.CHANGE_LANGUAGE: {
      return {
        ...state,
        current: action['payload']
      };
    }

    case fromLanguages.CHANGE_LANGUAGE_FAIL: {
      return {
        ...state
      };
    }

    case fromLanguages.CHANGE_LANGUAGE_SUCCESS: {
      return {
        ...state
      };
    }

    case fromLanguages.SET_TRANSLATIONS: {
      return {
        ...state,
        translations: action['payload']
      };
    }

    default:
      return state;
  }
}

export const getLanguagesLoading: any = (state: LanguageState): boolean => state.loading;
export const getLanguagesLoaded: any = (state: LanguageState): boolean => state.loaded;
export const getLanguagesEntities: any = (state: LanguageState): Entity => state.entities;
export const getCurrentLanguage: any = (state: LanguageState): Language => state.current;
export const getTranslations: any = (state: LanguageState): any => state.translations;
