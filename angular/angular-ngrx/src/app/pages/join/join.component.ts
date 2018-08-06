import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromStore from 'app/@store';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {

  private emailRegExp: RegExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  joinForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegExp)]),
    password_group: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirm: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, this.passwordConfirming)
  });

  constructor(private store: Store<any>) {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('password_confirm').value) {
      return { invalid: true };
    }
  }

  register(data: any): void {
    this.store.dispatch(new fromStore.Register(this.joinForm.value));
  }

}
