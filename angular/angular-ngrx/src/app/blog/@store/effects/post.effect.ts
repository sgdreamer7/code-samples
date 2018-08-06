import { Injectable } from '@angular/core';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Effect, Actions } from '@ngrx/effects';

import { PostService } from 'app/blog/services';
import * as postActions from '../actions/post.action';

@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {
    // TODO;
  }

  @Effect()
  getPosts$: any = this.actions$.ofType(postActions.POST_LOAD).pipe(
    switchMap((action: postActions.PostAction) => {
      return this.postService.get().pipe(
        map((posts: any) => new postActions.LoadPostsSuccess(posts)),
        catchError((error: Error) => of(new postActions.LoadPostsFail(error)))
      );
    })
  );

  @Effect()
  getSinglePost$: any = this.actions$.ofType(postActions.POST_GET_ONE).pipe(
    switchMap((action: postActions.GetSinglePost) => {
      return this.postService.getPost(action.payload).pipe(
        map((post: any) => new postActions.GetSinglePostSuccsess(post)),
        catchError((error: Error) => of(new postActions.GetSinglePostFail(error)))
      );
    })
  );

  @Effect()
  addComment$: any = this.actions$.ofType(postActions.ADD_COMMENT).pipe(
    switchMap((action: postActions.AddComment) => {
      return this.postService.get().pipe(
        map((comment: any) => new  postActions.AddCommentSuccess(comment)),
        catchError((error: Error) => of(new  postActions.AddCommentFail(error)))
      );
    })
  );

}
