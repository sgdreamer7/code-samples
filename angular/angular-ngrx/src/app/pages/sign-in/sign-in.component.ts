import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as fromStore from 'app/@store';
import { NotificationsService } from 'app/shared/services';
import { handleError, NgUnsubscribe } from 'app/shared/helpers';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends NgUnsubscribe implements OnInit {

  private emailRegExp: RegExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegExp)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    remember_me: new FormControl()
  });
  successLogin: string;
  successReestablish: string;
  needTranslation: any = {
    successLogin: 'Successfully signed-in',
    successReestablish: 'To reset your password check your email'
  };

  constructor(
    private translate: TranslateService,
    private store: Store<any>,
    private notifications: NotificationsService,
    public dialog: MatDialog
  ) {
    super();

    this['TS_PATH'] = 'Auth';
  }

  ngOnInit(): void {
    this.getTranslations();
    this.setSubscriptions();
  }

  signIn(event: Event): void {
    this.store.dispatch(new fromStore.Login(this.signInForm.value));
  }

  openDialog(data: any): void {
    const dialogRef: any = this.dialog.open(ForgotPasswordComponent, {
      width: '45vw'
    });

    this.wrapWithTakeUntil(dialogRef.afterClosed())
      .subscribe((result: any) => {
        this.notifications.show(this.successReestablish, 4000, 'OK');
      });
  }

  setSubscriptions(): void {
    this.wrapWithTakeUntil(
        this.translate.onLangChange.asObservable()
      )
      .subscribe(
        (event: LangChangeEvent) => {
          this.successLogin = event.translations[this['TS_PATH']][this.needTranslation.successLogin];
          this.successReestablish = event.translations[this['TS_PATH']][this.needTranslation.successReestablish];
        },
        (error: Error) => handleError(error)
      );
  }

  async getTranslations(): Promise<void> {

    try {
      this.successLogin = await this.translate
        .get(`${this['TS_PATH']}.${this.needTranslation.successLogin}`)
        .toPromise();
      this.successReestablish = await this.translate
        .get(`${this['TS_PATH']}.${this.needTranslation.successReestablish}`)
        .toPromise();
    } catch (err) {
      handleError(err);
    }
  }
}
