import { Action } from '@ngrx/store';

export const LOAD_PRODUCTS: string = '[Products] Load Products';
export const LOAD_PRODUCTS_FAIL: string = '[Products] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS: string = '[Products] Load Products Success';

export class LoadProducts implements Action {
  readonly type: string = LOAD_PRODUCTS;
}

export class LoadProductsFail implements Action {
  readonly type: string = LOAD_PRODUCTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductsSuccess implements Action {
  readonly type: string = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: any[]) {}
}

export type ProductAction =
 | LoadProducts
 | LoadProductsFail
 | LoadProductsSuccess;
