import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, take, switchMap, catchError, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from 'app/@store';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(
    public store: Store<any>
  ) {}

  getAuthData(): Observable<any> {
    return this.store.select(fromStore.getAuthState)
      .pipe(
        tap((authState: any): void => {
          if (!authState.loading && !authState.loaded) {
            this.store.dispatch(new fromStore.CheckAuth());
          }
        }),
        filter((authData: any) => authData.loaded),
        take(1),
        switchMap((data: any) =>  {
          if (data.loggedIn) {
            this.store.dispatch(new fromStore.Go({ path: ['home'] }));
          }

          return of(!data.loggedIn);
        }),
        catchError((error: Error) => of(true))
      );
  }

  canActivate(): Observable<boolean> {
    return this.getAuthData();
  }
}
