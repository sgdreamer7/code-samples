import * as fromProducts from '../actions/product.action';

export class ProductState {
  entities: { [id: number]: any };
  loaded: boolean;
  loading: boolean;
}

export class Entity {
  [id: number]: any;
}

export const initialState: ProductState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state: ProductState = initialState,
  action: fromProducts.ProductAction
): ProductState {
  switch (action.type) {
    case fromProducts.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromProducts.LOAD_PRODUCTS_SUCCESS: {
      const products: any[] = action['payload'];
      const entities: Entity[] = products.reduce(
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

    case fromProducts.LOAD_PRODUCTS_FAIL: {
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

export const getProductsLoading: any = (state: ProductState): boolean => state.loading;
export const getProductsLoaded: any = (state: ProductState): boolean => state.loaded;
export const getProductsEntities: any = (state: ProductState): Entity => state.entities;
