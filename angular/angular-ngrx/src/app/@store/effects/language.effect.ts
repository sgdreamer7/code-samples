import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Language } from 'app/core/models';
import * as languageActions from '../actions/language.action';

@Injectable()
export class LanguageEffects {

  protected languages: Language[] = [
   { name: 'EN', value: 'en' },
   { name: 'RU', value: 'ru' },
   { name: 'UA', value: 'ua' }
  ];

  constructor(
    private actions$: Actions,
    private translateService: TranslateService
  ) {}

  @Effect()
  loadLanguages$: any = this.actions$.ofType(languageActions.LOAD_LANGUAGES).pipe(
    switchMap(() => {
      return of(this.languages)
        .pipe(
          map((languages: Language[]) => new languageActions.LoadLanguagesSuccess(languages)),
          catchError((error: Error) => of(new languageActions.LoadLanguagesFail(error)))
        );
    })
  );

  @Effect()
  setCurrentAfterLoad$: any = this.actions$.ofType(languageActions.LOAD_LANGUAGES_SUCCESS).pipe(
    map((action: languageActions.LoadLanguagesSuccess) => new languageActions.ChangeLanguage(action.payload[0]))
  );

  @Effect()
  setCurrentLanguage$: any = this.actions$.ofType(languageActions.CHANGE_LANGUAGE).pipe(
    switchMap((action: languageActions.ChangeLanguage) =>  {
      return this.translateService.use(action.payload.value)
        .pipe(
          map((translations: any) => new languageActions.SetTranslations(translations)),
          catchError((error: Error) => of(new languageActions.ChangeLanguageFail(error)))
        );
    })
  );

}
