import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRootStore from 'app/@store';
import * as fromStore from 'app/shop/@store';

import { Language } from 'app/core/models';
import { NgUnsubscribe } from 'app/shared/helpers';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent extends NgUnsubscribe implements OnInit {

  private lang$: Observable<any>;
  products$: Observable<any[]>;
  productsLoaded$: Observable<boolean>;
  currentMode: string;

  constructor(private store: Store<any>) {
    super();

    this.currentMode = 'list';
  }

  checkStore(): void {
    this.productsLoaded$.pipe(
        filter((loaded: boolean) => !loaded),
        take(1)
      )
      .subscribe((loaded: boolean) => {
        this.store.dispatch(new fromRootStore.LoadProducts);
      });
  }

  ngOnInit(): void {
    this.getProducts();
    this.setupLanguage();
  }

  getProducts(): void {
    this.productsLoaded$ = this.store.select(fromRootStore.getProductsLoaded);
    this.products$ = this.store.select(fromRootStore.getAllProducts);

    this.checkStore();
  }

  setupLanguage(): void {
    this.lang$ = this.store.select(fromRootStore.getCurrentLanguage);
    this.wrapWithTakeUntil(this.lang$).subscribe((lang: Language) => {
      this.store.dispatch(new fromStore.ChangeLanguage(lang));
    });
  }

  setCurrentMode(mode: string): void {
    this.currentMode = mode;
  }
}
