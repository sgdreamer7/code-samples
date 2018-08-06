import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getUser: any = createSelector(
  fromRoot.getAuthState,
  fromAuth.getUser
);

export const getLoggedIn: any = createSelector(
  fromRoot.getAuthState,
  fromAuth.getLoggedIn
);
