import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from 'app/@store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch(new fromStore.LoadProducts);
    this.store.dispatch(new fromStore.LoadReviews);
  }
  ngOnInit(): void {
    // TODO
  }

}
