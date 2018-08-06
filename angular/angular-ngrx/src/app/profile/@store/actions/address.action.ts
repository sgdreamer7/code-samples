import { Action } from '@ngrx/store';

export const GET_COUNTRIES: string = '[Profile] Get Countries';
export const GET_COUNTRIES_SUCCESS: string = '[Profile] Get Countries Success';
export const GET_COUNTRIES_FAIL: string = '[Profile] Get Countries Fail';

export const GET_CITIES: string = '[Profile] Get Cities';
export const GET_CITIES_SUCCESS: string = '[Profile] Get Cities Success';
export const GET_CITIES_FAIL: string = '[Profile] Get Cities Fail';

export class GetCountries implements Action {
  readonly type: string = GET_COUNTRIES;
  constructor(public payload: any) {}
}

export class GetCountriesSuccess implements Action {
  readonly type: string = GET_COUNTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCountriesFail implements Action {
  readonly type: string = GET_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export class GetCities implements Action {
  readonly type: string = GET_CITIES;
  constructor(public payload: any) {}
}

export class GetCitiesSuccess implements Action {
  readonly type: string = GET_CITIES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCitiesFail implements Action {
  readonly type: string = GET_CITIES_FAIL;
  constructor(public payload: any) {}
}

export type AddressAction = GetCountries
  | GetCountriesSuccess
  | GetCountriesFail
  | GetCities
  | GetCitiesSuccess
  | GetCitiesFail;
