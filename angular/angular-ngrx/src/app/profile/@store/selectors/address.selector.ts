import { createSelector } from '@ngrx/store';

import * as fromProfileRoot from '../reducers';
import * as fromAddress from '../reducers/address.reducer';

export const getAddressState: any = createSelector(
  fromProfileRoot.getProfileState,
  (state: any) => state.address
);

export const getCities: any = createSelector(
  getAddressState,
  fromAddress.getCities
);

export const getCountries: any = createSelector(
  getAddressState,
  fromAddress.getCountries
);

export const getCitiesLoading: any = createSelector(
  getAddressState,
  fromAddress.getCitiesLoading
);

export const getCountriesLoading: any = createSelector(
  getAddressState,
  fromAddress.getCountriesLoading
);

export const getCitiesLoaded: any = createSelector(
  getAddressState,
  fromAddress.getCitiesLoaded
);

export const getCountriesLoaded: any = createSelector(
  getAddressState,
  fromAddress.getCountriesLoaded
);
