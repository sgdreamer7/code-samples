import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'app/core/models';
import * as fromStore from 'app/@store';
import { NgUnsubscribe } from 'app/shared/helpers';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent extends NgUnsubscribe implements OnInit {

  user$: Observable<User>;
  products$: Observable<any[]>;
  suggestions$: Observable<any[]>;
  loaded$: Observable<boolean>;
  currentMode: string = 'grid';

  constructor(
    private store: Store<fromStore.State>
  ) {
    super();

    this.store.dispatch(new fromStore.LoadProducts);
  }

  ngOnInit(): void {
    this.user$ = this.store.select(fromStore.getUser);
    this.products$ = this.store.select(fromStore.getAllProducts);
    this.suggestions$ = this.store.select(fromStore.getAllProducts).pipe(
      map((products: any[]) => products.slice(0, 4))
    );
    this.loaded$ = this.store.select(fromStore.getProductsLoaded);
  }

  setCurrentMode(mode: string): void {
    this.currentMode = mode;
  }

}
