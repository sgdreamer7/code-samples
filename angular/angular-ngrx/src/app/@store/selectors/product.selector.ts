import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromProducts from '../reducers/product.reducer';

export const getProductsState: any = createSelector(
  fromRoot.getProductState,
  (state: fromRoot.State) => state
);

export const getProductsEntities: any = createSelector(
  getProductsState,
  fromProducts.getProductsEntities
);

export const getProductsLoaded: any = createSelector(
  getProductsState,
  fromProducts.getProductsLoaded
);

export const getProductsLoading: any = createSelector(
  getProductsState,
  fromProducts.getProductsLoading
);

export const getAllProducts: any = createSelector(getProductsEntities, (entities: any) => {
  return Object.keys(entities).map((id: any) => entities[id]);
});
