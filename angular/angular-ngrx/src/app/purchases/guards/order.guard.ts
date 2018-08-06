import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from 'app/@store';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  loggedIn: any;

  constructor(
    private store: Store<any>
  ) {
    this.store.select(fromStore.getAuthState).subscribe(
      (authState: any): void => {
        this.loggedIn = authState.loggedIn;
      }
    );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.loggedIn) {

      const orderId: number = +next.params.id;
      this.store.dispatch(new fromStore.Go({ path: ['/purchases', orderId] }));

      return false;
    }

    return true;
  }
}
