import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromLanguages from '../reducers/language.reducer';

export const getLanguagesState: any = createSelector(
  fromRoot.getLanguageState,
  (state: fromRoot.State) => state
);

export const getLanguagesEntities: any = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesEntities
);

export const getLanguagesLoaded: any = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesLoaded
);

export const getLanguagesLoading: any = createSelector(
  getLanguagesState,
  fromLanguages.getLanguagesLoading
);

export const getAllLanguages: any = createSelector(getLanguagesEntities, (entities: any) => {
  return Object.keys(entities).map((val: string) => entities[val]);
});

export const getCurrentLanguage: any = createSelector(
  getLanguagesState,
  fromLanguages.getCurrentLanguage
);

export const getTranslations: any = createSelector(
  getLanguagesState,
  fromLanguages.getTranslations
);
