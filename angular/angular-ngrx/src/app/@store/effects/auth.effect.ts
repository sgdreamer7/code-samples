import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, take, tap } from 'rxjs/operators';

import { AuthService } from 'app/core/services';
import { User } from 'app/core/models';

import * as authActions from '../actions/auth.action';
import * as routerActions from '../actions/router.action';
import * as notificationActions from '../actions/notification.action';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  @Effect()
  login$: any = this.actions$.ofType(authActions.AUTH_LOGIN).pipe(
    switchMap((action: authActions.Login) => {
      return this.authService.login(action.payload)
        .pipe(
          map((token: any) => new authActions.Authenticate({token, type: action.type })),
          catchError((error: Error) => of(new authActions.LoginFail(error)))
        );
    })
  );

  @Effect()
  register$: any = this.actions$.ofType(authActions.AUTH_REGISTER).pipe(
    switchMap((action: authActions.Login) => {
      return this.authService.login(action.payload)
        .pipe(
          map((token: any) => new authActions.Authenticate({token, type: action.type })),
          catchError((error: Error) => of(new authActions.RegisterFail(error)))
        );
    })
  );

  @Effect()
  getUser$: any = this.actions$.ofType(authActions.AUTHENTICATE_BY_TOKEN)
    .pipe(
      switchMap((action: authActions.Authenticate) => {
        this.setToken(action.payload.token);

        return this.authService.getUser()
          .pipe(
            map((user: User) => {
              if (action.payload.type === authActions.AUTH_REGISTER) {
                return new authActions.RegisterSuccess(user);
              }

              return new authActions.LoginSuccess({user, type: action.payload.type });
            }),
            catchError((error: Error) => of(new authActions.LoginFail(error)))
          );
      })
    );

  @Effect()
  checkAuth$: any = this.actions$.ofType(authActions.AUTH_CHECK).pipe(
    switchMap((action: authActions.CheckAuth): any => {
      const token: string = this.authService.getToken();
      if (!token) {
        return of(new authActions.LoginFail({ error: 'No token provided', type: action.type }));
      }

      return of(new authActions.Authenticate({token, type: action.type}));
    })
  );

  @Effect()
  logout$: any = this.actions$.ofType(authActions.AUTH_LOGOUT).pipe(
    switchMap((): any => {
      localStorage.clear();
      let redirect: any;

      if (location.href.indexOf('profile') > -1) {
        redirect = new routerActions.Go({ path: ['home'] });
      } else {
        redirect = new routerActions.Back();
      }

      return of(redirect);
    })
  );

  @Effect()
  registerSuccess$: any = this.actions$.ofType(authActions.AUTH_REGISTER_SUCCESS).pipe(
    switchMap(() => of(new routerActions.Go({ path: ['home'] }))),
    switchMap((): any => {
      return of (new notificationActions.ShowMessage({message: 'Auth.Successfully registered', duration: 4000}));
    })
  );

  @Effect()
  loginSuccess$: any = this.actions$.ofType(authActions.AUTH_LOGIN_SUCCESS).pipe(
    switchMap((action: any): any => {
      let final: authActions.AuthAction[];

      if (action.payload.type === authActions.AUTH_CHECK) {
        final = [new notificationActions.ShowMessage({message: 'Auth.Welcome back', duration: 4000})];
      }

      if (action.payload.type !== authActions.AUTH_CHECK) {
        final = [
          new notificationActions.ShowMessage({message: 'Auth.Successfully signed-in', duration: 4000}),
          new routerActions.Go({path: ['home']})
        ];
      }

      return final;
    })
  );

  @Effect({dispatch: false})
  authError$: any = this.actions$.ofType(authActions.AUTH_LOGIN_FAIL || authActions.AUTH_REGISTER_FAIL).pipe(
    switchMap((action: authActions.AuthAction): any => {
      if (action['payload']['type'] === authActions.AUTH_CHECK) {
        return of(true).pipe(
          tap((): void => {
           // skip show error on initial check auth action;
          }),
          take(1)
        );
      }

      return of (new notificationActions.ShowError({message: 'Auth.Failed', duration: 4000}));
    })
  );

  private setToken(tokenData: any): void {
    for (const item in tokenData) {
      if (tokenData[item]) {
        localStorage.setItem(item, tokenData[item]);
      }
    }
  }

}
