import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from 'app/@store';
import * as fromProfileStore from 'app/profile/@store';

import { User } from 'app/core/models';
import { Country, City } from 'app/profile/models';

import { EditEmailModalComponent } from './edit-email-modal/edit-email-modal.component';
import { EditPasswordModalComponent } from './edit-password-modal/edit-password-modal.component';
import { DeleteProfileModalComponent } from './delete-profile-modal/delete-profile-modal.component';

import { NgUnsubscribe } from 'app/shared/helpers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends NgUnsubscribe implements OnInit {

  user$: Observable<User>;
  user: User;

  countries$: Observable<any[]>;
  cities$: Observable<any[]>;

  profileForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store<any>
  ) {
    super();

    this.store.dispatch(new fromProfileStore.GetCountries(''));
    this.store.dispatch(new fromProfileStore.GetCities(''));
  }

  ngOnInit(): void {
    this.user$ = this.store.select(fromStore.getUser);
    this.user$.subscribe((user: User) => {
      this.user = user;
      if (!!this.user) {
        this.initProfileForm(this.user);
      }
    });
    this.cities$ = this.store.select(fromProfileStore.getCities);
    this.countries$ = this.store.select(fromProfileStore.getCountries);
  }

  initProfileForm(user: User): void {
    this.profileForm = this.fb.group({
      username: [user.username, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]],
      phones: this.fb.array([
        new FormControl(user.phone_number, [Validators.pattern('[0-9]+')])
      ]),
      about: [user.about],

      address: this.fb.group({
        country: this.fb.group({
          name: user.country.name,
          code: user.country.code
        }),
        city: this.fb.group({
          name: user.city.name,
          id: user.city.id
        }),
        street: [user.street],
        state: [user.state],
        postal_code: [user.postal_code, [Validators.pattern('[0-9]+')]],
      }),
    });

    this.addressControl.get('country')
      .valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.store.dispatch(new fromProfileStore.GetCountries(value));
      });
  }

  selectCountry(country: Country): void {
    this.addressControl.controls['country'].setValue(country);
    this.addressControl.controls['city'].setValue({ name: null, id: null });
    this.store.dispatch(new fromProfileStore.GetCities(country.code));
  }

  selectCity(city: City): void {
    this.addressControl.controls['city'].setValue(city);
  }

  get addressControl(): FormArray {
    return this.profileForm.get('address') as FormArray;
  }

  get phonesControl(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phonesControl.push(new FormControl('', [Validators.pattern('[0-9]+')]));
  }

  deletePhone(index: number): void {
    this.phonesControl.removeAt(index);
  }

  openEmailModal(): void {
    const dialogRef: any = this.dialog.open(EditEmailModalComponent, {
      width: '45vw'
    });

    this.wrapWithTakeUntil(dialogRef.afterClosed())
      .subscribe((result: any) => {
        // TODO
      });
  }

  openPasswordModal(): void {
    const dialogRef: any = this.dialog.open(EditPasswordModalComponent, {
      width: '45vw'
    });

    this.wrapWithTakeUntil(dialogRef.afterClosed())
      .subscribe((result: any) => {
        // TODO
      });
  }

  openDeleteProfileModal(): void {
    const dialogRef: any = this.dialog.open(DeleteProfileModalComponent, {
      width: '45vw'
    });

    this.wrapWithTakeUntil(dialogRef.afterClosed())
      .subscribe((result: any) => {
        // TODO
      });
  }

  saveProfile(): void {
    if (this.formSubmitted) {
      return;
    }

    if (!this.profileForm.valid) {
      this.profileForm.markAsTouched();

      return;
    }

    this.formSubmitted = true;

    // const userUpdates = this.profileForm.value;
    // // TODO: update user
    // this.auth.updateUser(this.user.id, userUpdates).subscribe(data => {
    //   this.user = data;
    //   this.initProfileForm(data);
    //   this.formSubmitted = false;
    //   // TODO: show alert message
    // }, err => {
    //   this.formSubmitted = false;
    //   // TODO: show alert message
    // });
  }

}
