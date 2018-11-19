const GET_COUNTRY_REGION = 'assets/GET_COUNTRY_REGION';
const GET_COUNTRY_REGION_SUCCESS = 'assets/GET_COUNTRY_REGION_SUCCESS';
const GET_COUNTRY_REGION_FAIL = 'assets/GET_COUNTRY_REGION_FAIL';

const GET_COUNTRY = 'assets/GET_COUNTRY';
const GET_COUNTRY_SUCCESS = 'assets/GET_COUNTRY_SUCCESS';
const GET_COUNTRY_FAIL = 'assets/GET_COUNTRY_FAIL';

const GET_EVENT_CATEGORY = 'assets/GET_EVENT_CATEGORY';
const GET_EVENT_CATEGORY_SUCCESS = 'assets/GET_EVENT_CATEGORY_SUCCESS';
const GET_EVENT_CATEGORY_FAIL = 'assets/GET_EVENT_CATEGORY_FAIL';
const UPDATE_EVENT_CATEGORY = 'assets/UPDATE_EVENT_CATEGORY';
const UPDATE_LOADED_COUNTRY_ID = 'assets/UPDATE_LOADED_COUNTRY_ID';


import { getData } from 'global/vuex/api';

const defaultState = () => ({
  loading: false,
  loadedEvents: false,
  loadedCountry: false,
  loadedRegion: 0,
  eventCategories: [],
  loadedCountryId: undefined,
  regionsList: {},
  currentRegionsList: [],
  country: [],
});

const mutations = {
  [GET_EVENT_CATEGORY] () {
  },
  [GET_EVENT_CATEGORY_SUCCESS] ({assets}, payload) {
    assets.eventCategories = payload.result;
  },
  [GET_EVENT_CATEGORY_FAIL] ({assets}, payload) {
    assets.error = payload;
  },
  [UPDATE_EVENT_CATEGORY] ({assets}, categories) {
    assets.eventCategories = categories;
  },
  [UPDATE_LOADED_COUNTRY_ID] ({assets}, countryId) {
    assets.loadedCountryId = countryId;
  },


  /* GET COUNTRY*/
  [GET_COUNTRY] ({assets}) {
    assets.loading = true;
  },
  [GET_COUNTRY_SUCCESS] ({assets}, payload) {
    assets.loading = false;
    assets.loadedCountry = true;
    if (payload.result.length) {
      payload.result.sort(function (a, b) {
        return window.oldAppUtils.naturalSorter(a.name, b.name);
      });
    }
    assets.country = payload.result;
  },
  [GET_COUNTRY_FAIL] ({assets}) {
    assets.loading = false;
    assets.loadedCountry = false;
  },

  /* GET COUNTRY REGION*/
  [GET_COUNTRY_REGION] ({assets}) {
    assets.loading = true;
  },
  [GET_COUNTRY_REGION_SUCCESS] ({assets}, payload) {
    assets.loading = false;
    assets.loadedRegion++;
    assets.regionsList[assets.loadedCountryId] = payload.result;
    assets.currentRegionsList = Array.isArray(payload.result) ? payload.result : [];
  },
  [GET_COUNTRY_REGION_FAIL] ({assets}) {
    assets.loading = false;
    assets.loadedRegion = false;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};

export const getCountry = ({ dispatch, state }) => {
  if (!state.storeSection.assets.loadedCountry) {
    dispatch(
      GET_COUNTRY,
      {
        types: [GET_COUNTRY_SUCCESS, GET_COUNTRY_FAIL],
        data: getData('store', 'countries', 'GET'),
      }
    );
  }
};


export const getCountryRegionAction = ({ dispatch, state }, countryId) => {
  dispatch(UPDATE_LOADED_COUNTRY_ID, countryId);
  if (!(countryId in state.storeSection.assets.regionsList)) {
    dispatch(
      GET_COUNTRY_REGION,
      {
        types: [GET_COUNTRY_REGION_SUCCESS, GET_COUNTRY_REGION_FAIL],
        data: getData('store', `country/${countryId}/regions`, 'GET'),
      }
    );
  } else {
    dispatch(
      GET_COUNTRY_REGION_SUCCESS,
      {result: state.storeSection.assets.regionsList[countryId]}
    );
  }
};

export const getCategoryAction = ({ dispatch }) => {
  dispatch(
    GET_EVENT_CATEGORY,
    {
      types: [GET_EVENT_CATEGORY_SUCCESS, GET_EVENT_CATEGORY_FAIL],
      data: EventCategories.list(),
    }
  );
};

export const updateCategoryAction = ({ dispatch }, categories) => {
  dispatch(
    UPDATE_EVENT_CATEGORY,
    categories
  );
};
