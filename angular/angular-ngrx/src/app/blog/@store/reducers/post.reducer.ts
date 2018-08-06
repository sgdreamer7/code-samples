import * as fromPost from '../actions/post.action';

export class PostState {
  loading: boolean;
  loaded: boolean;
  entities: any;
  current: any;
  currentLoading: boolean;
  currentLoaded: boolean;
  commentAdding: boolean;
  error: any;
}

export const initialState: PostState = {
  loading: false,
  loaded: false,
  entities: null,
  current: null,
  currentLoading: false,
  currentLoaded: false,
  commentAdding: false,
  error: null
};

export function reducer(
  state: PostState = initialState,
  action: fromPost.PostAction
): PostState {
  switch (action.type) {

    case fromPost.POST_LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }

    case fromPost.POST_LOAD_SUCCESS: {
      const posts: any[] = action['payload'];
      const entities: any = posts.reduce(
        (items: any, post: any) => {
          return {
            ...items,
            [post.id]: post
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entities,
        error: null
      };
    }

    case fromPost.POST_LOAD_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: action['payload']
      };
    }

    case fromPost.POST_GET_ONE: {
      return {
        ...state,
        currentLoading: true,
        error: null
      };
    }

    case fromPost.POST_GET_ONE_SUCCESS: {
      return {
        ...state,
        currentLoading: false,
        currentLoaded: true,
        current: action['payload'],
        error: null
      };
    }

    case fromPost.POST_GET_ONE_FAIL: {
      return {
        ...state,
        currentLoading: false,
        currentLoaded: true,
        current: null,
        error: action['payload']
      };
    }

    case fromPost.POST_REMOVE_CURRENT: {
      return {
        ...state,
        currentLoaded: false,
        currentLoading: false,
        current: null,
        error: null
      };
    }

    case fromPost.ADD_COMMENT: {
      return {
        ...state,
        commentAdding: true,
        error: null
      };
    }

    case fromPost.ADD_COMMENT_FAIL: {
      return {
        ...state,
        commentAdding: false,
        error: action['payload']
      };
    }

    case fromPost.ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        commentAdding: false,
        error: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getPostEntities: any = (state: PostState): any => state.entities;
export const getPostLoaded: any = (state: PostState): boolean => state.loaded;
export const getPostLoading: any = (state: PostState): boolean => state.loading;

export const getCurrentPost: any = (state: PostState): any => state.current;
export const getCurrentPostLoading: any = (state: PostState): boolean => state.currentLoading;
export const getCurrentPostLoaded: any = (state: PostState): boolean => state.currentLoaded;
