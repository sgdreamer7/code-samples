import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as languageActions from '../actions/language.action';

@Injectable()
export class BlogLanguageEffects {

  constructor(
    protected actions$: Actions,
    protected translateService: TranslateService
  ) {}

  @Effect()
  setCurrentLanguage$: any = this.actions$.ofType(languageActions.BLOG_CHANGE_LANGUAGE).pipe(
    switchMap((action: languageActions.ChangeLanguage) =>  {
      return this.translateService.use(action.payload.value)
        .pipe(
          map((translations: any) => new languageActions.ChangeLanguageSuccess(true)),
          catchError((error: Error) => of(new languageActions.ChangeLanguageFail(error)))
        );
    })
  );

}
