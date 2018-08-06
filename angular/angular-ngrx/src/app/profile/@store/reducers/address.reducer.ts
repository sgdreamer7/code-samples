import * as addressActions from '../actions/address.action';

export class AddressState {
  countries: any[];
  cities: any[];
  countriesLoading: boolean;
  countriesLoaded: boolean;
  citiesLoading: boolean;
  citiesLoaded: boolean;
}

export const initialState: AddressState = {
  countries: [],
  cities: [],
  countriesLoaded: false,
  countriesLoading: false,
  citiesLoaded: false,
  citiesLoading: false
};

export function reducer(
  state: AddressState = initialState,
  action: addressActions.AddressAction
): AddressState {
  switch (action.type) {

    case addressActions.GET_CITIES: {
      return {
        ...state,
        citiesLoading: true
      };
    }

    case addressActions.GET_COUNTRIES: {
      return {
        ...state,
        countriesLoading: true
      };
    }

    case addressActions.GET_CITIES_FAIL: {
      return {
        ...state,
        citiesLoaded: true,
        citiesLoading: false,
        cities: []
      };
    }

    case addressActions.GET_COUNTRIES_FAIL: {
      return {
        ...state,
        countriesLoaded: true,
        countriesLoading: false,
        countries: []
      };
    }

    case addressActions.GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countriesLoaded: true,
        countriesLoading: false,
        countries: action.payload
      };
    }

    case addressActions.GET_CITIES_SUCCESS: {
      return {
        ...state,
        citiesLoaded: true,
        citiesLoading: false,
        cities: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getCities: any = (state: AddressState): any => state.cities;
export const getCountries: any = (state: AddressState): any => state.countries;

export const getCitiesLoading: any = (state: AddressState): boolean => state.citiesLoading;
export const getCountriesLoading: any = (state: AddressState): boolean => state.countriesLoading;

export const getCitiesLoaded: any = (state: AddressState): boolean => state.citiesLoaded;
export const getCountriesLoaded: any = (state: AddressState): boolean => state.countriesLoaded;
