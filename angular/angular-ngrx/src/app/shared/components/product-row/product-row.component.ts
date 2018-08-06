import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from 'app/@store';

import { handleError, NgUnsubscribe } from 'app/shared/helpers';

@Component({
  selector: 'product-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent extends NgUnsubscribe implements OnInit {

  @Input() type: string;

  products$: Observable<any>;
  title: string;

  constructor(
    private translate: TranslateService,
    private store: Store<fromStore.State>
  ) {
    super();

    this['TS_PATH'] = 'ProductRow';
  }

  ngOnInit(): void {
    this.setSubscriptions();
    this.getProducts();
  }

  setSubscriptions(): void {
    let term: string;

    switch (this.type) {
      case 'new':
        term = 'New';
        break;
      case 'popular':
        term = 'Popular';
        break;
      default:
        handleError(new Error('Unrecognized value for argument type passed to ProductRowComponent'));

        return;
    }

    this.getTranslations(term);

    this.wrapWithTakeUntil(this.translate.onLangChange.asObservable())
      .subscribe(
        (e: LangChangeEvent) => {
            this.title = e.translations[this['TS_PATH']][term];
        },
        (error: Error) => handleError(error)
      );
  }

  getProducts(): void {
    this.products$ = this.store.select(fromStore.getAllProducts);
  }

  async getTranslations(term: string): Promise<void> {

    try {
      this.title = await this.translate
        .get(`${this['TS_PATH']}.${term}`)
        .toPromise();
    } catch (error) {
      handleError(error);
    }
  }

}
