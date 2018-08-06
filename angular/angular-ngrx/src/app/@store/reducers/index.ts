import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromProducts from './product.reducer';
import * as fromReviews from './review.reducer';
import * as fromLanguages from './language.reducer';
import * as fromAuth from './auth.reducer';
import * as fromNotifications from './notification.reducer';

export class RouterStateUrl {
  url: string;
  queryParams: Params;
  params: any;
}

export interface State {
  languages: fromLanguages.LanguageState;
  auth: fromAuth.AuthState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  products: fromProducts.ProductState;
  reviews: fromReviews.ReviewState;
  notifications: fromNotifications.NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  languages: fromLanguages.reducer,
  auth: fromAuth.reducer,
  routerReducer: fromRouter.routerReducer,
  products: fromProducts.reducer,
  reviews: fromReviews.reducer,
  notifications: fromNotifications.reducer
};

export const getRouterState: any = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export const getProductState: any = createFeatureSelector<fromProducts.ProductState>('products');

export const getReviewState: any = createFeatureSelector<fromReviews.ReviewState>('reviews');

export const getLanguageState: any = createFeatureSelector<fromLanguages.LanguageState>('languages');

export const getAuthState: any = createFeatureSelector<fromAuth.AuthState>('auth');

export const getNotificationState: any = createFeatureSelector<fromNotifications.NotificationState>('notifications');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
