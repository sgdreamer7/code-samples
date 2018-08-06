import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromLanguage from './language.reducer';
import * as fromPost from './post.reducer';

export class BlogState {
  blogLanguages: fromLanguage.CurrentLanguageState;
  posts: fromPost.PostState;
}

export const reducers: ActionReducerMap<BlogState> = {
  blogLanguages: fromLanguage.reducer,
  posts: fromPost.reducer
};

export const getBlogState: any = createFeatureSelector<any>('blog');

export const getLanguageState: any = createFeatureSelector<any>('blogLanguages');
