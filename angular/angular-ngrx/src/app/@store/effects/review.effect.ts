import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ReviewService } from 'app/shared/services';
import * as reviewActions from '../actions/review.action';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions$: Actions,
    private reviewService: ReviewService
  ) {}

  @Effect()
  loadReviews$: any = this.actions$.ofType(reviewActions.LOAD_REVIEWS).pipe(
    switchMap(() => {
      return this.reviewService.get()
        .pipe(
          map((reviews: any) => new reviewActions.LoadReviewsSuccess(reviews)),
          catchError((error: Error) => of(new reviewActions.LoadReviewsFail(error)))
        );
    })
  );

}
