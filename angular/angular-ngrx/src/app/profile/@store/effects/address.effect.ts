import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as addressActions from '../actions/address.action';
import { AddressService } from 'app/profile/services';

@Injectable()
export class AddressEffects {

  constructor(
    private actions$: Actions,
    private addressService: AddressService
  ) {}

  @Effect()
  getCities$: any = this.actions$.ofType(addressActions.GET_CITIES).pipe(
    switchMap((action: addressActions.GetCities) => {
      return this.addressService.searchCitiesByCountry(action.payload).pipe(
        map((cities: any) => new addressActions.GetCitiesSuccess(cities)),
        catchError((error: Error) => of(new addressActions.GetCitiesFail(error)))
      );
    })
  );

  @Effect()
  getCountries$: any = this.actions$.ofType(addressActions.GET_COUNTRIES).pipe(
    switchMap((action: addressActions.GetCountries) => {
      return this.addressService.searchCountries(action.payload).pipe(
        map((countries: any) => new addressActions.GetCountriesSuccess(countries)),
        catchError((error: Error) => of(new addressActions.GetCountriesFail(error)))
      );
    })
  );
}
