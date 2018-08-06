import { createSelector } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as fromReviews from '../reducers/review.reducer';

export const getReviewsState: any = createSelector(
  fromRoot.getReviewState,
  (state: fromRoot.State) => state
);

export const getReviewsEntities: any = createSelector(
  getReviewsState,
  fromReviews.getReviewsEntities
);

export const getReviewsLoaded: any = createSelector(
  getReviewsState,
  fromReviews.getReviewsLoaded
);

export const getReviewsLoading: any = createSelector(
  getReviewsState,
  fromReviews.getReviewsLoading
);

export const getAllReviews: any = createSelector(getReviewsEntities, (entities: any) => {
  return Object.keys(entities).map((id: any) => entities[id]);
});
