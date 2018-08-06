import { Action } from '@ngrx/store';

export const LOAD_REVIEWS: string = '[Reviews] Load Reviews';
export const LOAD_REVIEWS_FAIL: string = '[Reviews] Load Reviews Fail';
export const LOAD_REVIEWS_SUCCESS: string = '[Reviews] Load Reviews Success';

export class LoadReviews implements Action {
  readonly type: string = LOAD_REVIEWS;
}

export class LoadReviewsFail implements Action {
  readonly type: string = LOAD_REVIEWS_FAIL;
  constructor(public payload: any) {}
}

export class LoadReviewsSuccess implements Action {
  readonly type: string = LOAD_REVIEWS_SUCCESS;
  constructor(public payload: any[]) {}
}

export type ReviewAction =
 | LoadReviews
 | LoadReviewsFail
 | LoadReviewsSuccess;
