import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ProductService } from 'app/shared/services';
import * as productActions from '../actions/product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$: any = this.actions$.ofType(productActions.LOAD_PRODUCTS).pipe(
    switchMap(() => {
      return this.productService.get()
        .pipe(
          map((products: any) => new productActions.LoadProductsSuccess(products)),
          catchError((error: Error) => of(new productActions.LoadProductsFail(error)))
        );
    })
  );

}
