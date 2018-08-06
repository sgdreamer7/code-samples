import * as fromReviews from '../actions/review.action';

export class ReviewState {
  entities: { [id: number]: any };
  loaded: boolean;
  loading: boolean;
}

export class Entity {
  [id: number]: any;
}

export const initialState: ReviewState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state: ReviewState = initialState,
  action: fromReviews.ReviewAction
): ReviewState {
  switch (action.type) {
    case fromReviews.LOAD_REVIEWS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromReviews.LOAD_REVIEWS_SUCCESS: {
      const reviews: any[] = action['payload'];
      const entities: Entity[] = reviews.reduce(
        (items: Entity, product: any) => {
          return {
            ...items,
            [product.id]: product,
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromReviews.LOAD_REVIEWS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    default:
      return state;
  }
}

export const getReviewsLoading: any = (state: ReviewState): boolean => state.loading;
export const getReviewsLoaded: any = (state: ReviewState): boolean => state.loaded;
export const getReviewsEntities: any = (state: ReviewState): Entity => state.entities;
