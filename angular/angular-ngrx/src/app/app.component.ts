import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { SvgService } from './layout/services';

import * as fromStore from './@store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loaded: boolean;
  storeSub: Subscription;

  constructor(
    private svg: SvgService,
    private store: Store<any>
  ) {
    this.store.dispatch(new fromStore.LoadLanguages);
    this.store.dispatch(new fromStore.CheckAuth());
    this.store.select(fromStore.getAuthState).subscribe((data: any) => {
      this.loaded = data.loaded;
    });
  }

  ngOnInit(): void {
    this.svg.init();
  }

}
