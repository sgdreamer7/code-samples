import { Action } from '@ngrx/store';

export const POST_LOAD: string = '[Post] Load Posts';
export const POST_LOAD_SUCCESS: string = '[Post] Load Posts Success';
export const POST_LOAD_FAIL: string = '[Post] Load Posts Fail';

export class LoadPosts implements Action {
  readonly type: string = POST_LOAD;
}

export class LoadPostsSuccess implements Action {
  readonly type: string = POST_LOAD_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPostsFail implements Action {
  readonly type: string = POST_LOAD_FAIL;
  constructor(public payload: any) {}
}

export const POST_GET_ONE: string = '[Post] Get Single Post';
export const POST_GET_ONE_SUCCESS: string = '[Post] Get Single Post Success';
export const POST_GET_ONE_FAIL: string = '[Post] Get Single Post Fail';
export const POST_REMOVE_CURRENT: string = '[Post] Remove Current Post';

export class GetSinglePost implements Action {
  readonly type: string = POST_GET_ONE;
  constructor(public payload: any) {}
}

export class GetSinglePostSuccsess implements Action {
  readonly type: string = POST_GET_ONE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetSinglePostFail implements Action {
  readonly type: string = POST_GET_ONE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveCurrentPost implements Action {
  readonly type: string = POST_REMOVE_CURRENT;
}

export const ADD_COMMENT: string = '[Comment] Add Comment to Post';
export const ADD_COMMENT_SUCCESS: string = '[Comment] Add Comment to Success';
export const ADD_COMMENT_FAIL: string = '[Comment] Add Comment to Fail';

export class AddComment implements Action {
  readonly type: string = ADD_COMMENT;
  constructor(public payload: any) {}
}

export class AddCommentSuccess implements Action {
  readonly type: string = ADD_COMMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class AddCommentFail implements Action {
  readonly type: string = ADD_COMMENT_FAIL;
  constructor(public payload: any) {}
}

export type PostAction = LoadPosts
  | LoadPostsFail
  | LoadPostsSuccess
  | GetSinglePost
  | RemoveCurrentPost
  | AddComment
  | AddCommentSuccess
  | AddCommentFail;
