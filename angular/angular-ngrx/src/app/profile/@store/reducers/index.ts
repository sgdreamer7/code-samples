import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromAddress from './address.reducer';

export class ProfileState {
  address: fromAddress.AddressState;
}

export const reducers: ActionReducerMap<ProfileState> = {
  address: fromAddress.reducer
};

export const getProfileState: any = createFeatureSelector<ProfileState>('profile');
