import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRootStore from 'app/@store';
import * as fromStore from 'app/blog/@store';
import { Language } from 'app/core/models';
import { NgUnsubscribe } from 'app/shared/helpers';

@Component({
  selector: 'blog-page',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends NgUnsubscribe implements OnInit {

  private lang$: Observable<any>;

  constructor(
    private store: Store<any>
  ) {
    super();

    this.store.dispatch(new fromStore.LoadPosts());
  }

  ngOnInit(): void {
    this.lang$ = this.store.select(fromRootStore.getCurrentLanguage);
    this.wrapWithTakeUntil(this.lang$)
      .subscribe((lang: Language) => {
        this.store.dispatch(new fromStore.ChangeLanguage(lang));
      });
  }
}
