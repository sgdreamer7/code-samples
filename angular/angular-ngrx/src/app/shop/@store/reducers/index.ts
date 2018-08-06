import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromLanguage from './language.reducer';

export class ShopState {
  shopLanguages: fromLanguage.CurrentLanguageState;
}

export const reducers: ActionReducerMap<ShopState> = {
  shopLanguages: fromLanguage.reducer
};

export const getLanguageState: any = createFeatureSelector<any>('shopLanguages');
