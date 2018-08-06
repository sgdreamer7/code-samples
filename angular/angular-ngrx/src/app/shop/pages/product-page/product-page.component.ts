import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { NgUnsubscribe } from 'app/shared/helpers';
import { Language } from 'app/core/models';
import * as fromRootStore from 'app/@store';
import * as fromStore from 'app/shop/@store';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends NgUnsubscribe implements OnInit {

  thumbnails: string[];

  lang$: Observable<any>;

  constructor(private store: Store<any>) {
    super();

    this.thumbnails = [
      'https://lh3.google.com/u/0/d/1JE6G9RZAvkBPgLMmzLMYZXG5u49aKt7V=w1867-h965-iv1',
      '/assets/images/1.png',
      '/assets/images/2.png',
      'https://lh3.google.com/u/0/d/1JE6G9RZAvkBPgLMmzLMYZXG5u49aKt7V=w1867-h965-iv1',
      '/assets/images/3.png'
    ];
  }

  ngOnInit(): void {
    this.setupLanguage();
  }

  setupLanguage(): void {
    this.lang$ = this.store.select(fromRootStore.getCurrentLanguage);
    this.wrapWithTakeUntil(this.lang$).subscribe((lang: Language) => {
      this.store.dispatch(new fromStore.ChangeLanguage(lang));
    });
  }

}
