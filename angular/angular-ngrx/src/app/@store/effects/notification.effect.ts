import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NotificationsService } from 'app/shared/services';
import * as notificationActions from '../actions/notification.action';
import * as languageSelectors from '../selectors/language.selector';

@Injectable()
export class NotificationEffects {

  private translations: any;

  constructor(
    private actions$: Actions,
    private notificationService: NotificationsService,
    private store: Store<any>
  ) {
    this.store.select(languageSelectors.getTranslations).subscribe((data: any) => {
      this.translations = data;
    });
  }

  @Effect()
  showMessage$: any = this.actions$.ofType(notificationActions.NOTIFICATION_SHOW_MESSAGE).pipe(
    switchMap((action: notificationActions.ShowMessage) => {
      const path: string[] = action.payload.message.split('.');
      const message: string = this.translations[path[0]][path[1]];

      this.notificationService.show(message, action.payload.duration);

      return of(new notificationActions.ShowMessageComplete(Date.now()));
    })
  );

  @Effect()
  showError$: any = this.actions$.ofType(notificationActions.NOTIFICATION_SHOW_ERROR).pipe(
    switchMap((action: notificationActions.ShowError) => {
      this.notificationService.error(action.payload.message, action.payload.duration);

      return of(new notificationActions.ShowErrorComplete(Date.now()));
    })
  );
}
