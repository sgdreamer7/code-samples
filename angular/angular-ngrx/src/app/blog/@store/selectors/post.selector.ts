import { createSelector } from '@ngrx/store';

import * as fromBlogRoot from '../reducers';
import * as fromPost from '../reducers/post.reducer';

export const getPostState: any = createSelector(
  fromBlogRoot.getBlogState,
  (state: fromBlogRoot.BlogState) => state.posts
);

export const getPostEntities: any = createSelector(
  getPostState,
  fromPost.getPostEntities
);

export const getPostLoaded: any = createSelector(
  getPostState,
  fromPost.getPostLoaded
);

export const getPostLoading: any = createSelector(
  getPostState,
  fromPost.getPostLoading
);

export const getAllPosts: any = createSelector(
  getPostEntities,
  (entities: any) => Object.keys(entities).map((id: any) => entities[id])
);

export const getCurrentPost: any = createSelector(
  getPostState,
  fromPost.getCurrentPost
);

export const getCurrentPostLoading: any = createSelector(
  getPostState,
  fromPost.getCurrentPostLoading
);

export const getCurrentPostLoaded: any = createSelector(
  getPostState,
  fromPost.getCurrentPostLoaded
);
