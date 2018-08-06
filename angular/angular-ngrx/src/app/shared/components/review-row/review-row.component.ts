import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from 'app/@store';
import { Observable } from 'rxjs';

@Component({
  selector: 'review-row',
  templateUrl: './review-row.component.html',
  styleUrls: ['./review-row.component.scss']
})
export class ReviewRowComponent implements OnInit {

  reviews$: Observable<any>;

  constructor(private store: Store<any>) {
    // TODO:
  }

  ngOnInit(): void {
    this.reviews$ = this.store.select(fromStore.getAllReviews);
  }
}
