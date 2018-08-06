import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from 'app/@store';

import { Language, User } from 'app/core/models';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;
  languages$: Observable<Language[]>;
  currentLang$: Observable<Language>;

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.languages$ = this.store.select(fromStore.getAllLanguages);
    this.currentLang$ = this.store.select(fromStore.getCurrentLanguage);
    this.user$ = this.store.select(fromStore.getUser);
  }

  logout(): void {
    this.store.dispatch(new fromStore.Logout());
  }

  switchLanguage(lang: Language): void {
    this.store.dispatch(new fromStore.ChangeLanguage(lang));
  }
}
