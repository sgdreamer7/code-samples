const GET_TAXES = 'taxes/GET_TAXES';
const GET_TAXES_SUCCESS = 'taxes/GET_TAXES_SUCCESS';
const GET_TAXES_FAIL = 'taxes/GET_TAXES_FAIL';

const SWICH_TAXES_LIST = 'taxes/SWICH_TAXES_LIST';

const ADD_TAXES = 'taxes/ADD_TAXES';
const ADD_TAXES_SUCCESS = 'taxes/ADD_TAXES_SUCCESS';
const ADD_TAXES_FAIL = 'taxes/ADD_TAXES_FAIL';

const ADD_REGION = 'taxes/ADD_REGION';
const ADD_REGION_SUCCESS = 'taxes/ADD_REGION_SUCCESS';
const ADD_REGION_FAIL = 'taxes/ADD_REGION_FAIL';

const DELETE_REGION = 'taxes/DELETE_REGION';
const DELETE_REGION_SUCCESS = 'taxes/DELETE_REGION_SUCCESS';
const DELETE_REGION_FAIL = 'taxes/DELETE_REGION_FAIL';

const EDIT_TAXES = 'taxes/EDIT_TAXES';
const EDIT_TAXES_SUCCESS = 'taxes/EDIT_TAXES_SUCCESS';
const EDIT_TAXES_FAIL = 'taxes/EDIT_TAXES_FAIL';

const DELETE_TAXES = 'taxes/DELETE_TAXES';
const DELETE_TAXES_SUCCESS = 'taxes/DELETE_TAXES_SUCCESS';
const DELETE_TAXES_FAIL = 'taxes/DELETE_TAXES_FAIL';

import { getData } from 'global/vuex/api';

const defaultState = () => ({
  loading: false,
  loadedList: false,
  addEditLoaded: 0,
  addEditRegionLoaded: 0,
  deleteTaxLoaded: 0,
  deleteLoaded: 0,
  deleteRegionLoaded: 0,
  taxesList: [],
  currentTaxes: {},
  currentTaxesIndex: 0,
});

const mutations = {
  /* GET LIST*/
  [GET_TAXES] ({taxes}) {
    taxes.loading = true;
  },
  [GET_TAXES_SUCCESS] ({taxes}, payload) {
    taxes.loading = false;
    taxes.loadedList = true;
    if (payload.result.length) {
      payload.result.sort(function (a, b) {
        return window.oldAppUtils.naturalSorter(a.country, b.country);
      });
    }
    taxes.taxesList = payload.result;
    taxes.currentTaxes = payload.result[0];
  },
  [GET_TAXES_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.loadedList = false;
  },

  /*UPDATE*/
  [SWICH_TAXES_LIST] ({taxes}, newIndex) {
    taxes.currentTaxesIndex = newIndex;
    taxes.currentTaxes = taxes.taxesList[newIndex];
  },

  /* ADD REGION */
  [ADD_REGION] ({taxes}) {
    taxes.loading = true;
  },
  [ADD_REGION_SUCCESS] ({taxes}, payload) {
    taxes.loading = false;
    taxes.addEditRegionLoaded++;
    taxes.taxesList[taxes.currentTaxesIndex] = payload.result;
    taxes.currentTaxes = payload.result;
  },
  [ADD_REGION_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.addEditRegionLoaded = false;
  },

  /* DELETE REGION */
  [DELETE_REGION] ({taxes}) {
    taxes.loading = true;
  },
  [DELETE_REGION_SUCCESS] ({taxes}, payload) {
    taxes.loading = false;
    taxes.deleteRegionLoaded++;
    taxes.taxesList[taxes.currentTaxesIndex] = payload.result;
    taxes.currentTaxes = payload.result;
  },
  [DELETE_REGION_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.deleteRegionLoaded = false;
  },

  /* ADD TAX*/
  [ADD_TAXES] ({taxes}) {
    taxes.loading = true;
  },
  [ADD_TAXES_SUCCESS] ({taxes}, payload) {
    const lastIndex = taxes.taxesList.length;
    taxes.loading = false;
    taxes.addEditLoaded++;
    taxes.taxesList.push(payload.result);
    taxes.currentTaxesIndex = lastIndex;
    taxes.currentTaxes = taxes.taxesList[lastIndex];
  },
  [ADD_TAXES_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.addEditLoaded = false;
  },

  /* EDIT */
  [EDIT_TAXES] ({taxes}) {
    taxes.loading = true;
  },
  [EDIT_TAXES_SUCCESS] ({taxes}, payload) {
    taxes.loading = false;
    taxes.addEditLoaded++;
    taxes.taxesList[taxes.currentTaxesIndex] = payload.result;
    taxes.currentTaxes = payload.result;
  },
  [EDIT_TAXES_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.addEditLoaded = false;
  },

  /* DELETE */
  [DELETE_TAXES] ({taxes}) {
    taxes.loading = true;
  },
  [DELETE_TAXES_SUCCESS] ({taxes}) {
    taxes.loading = false;
    taxes.deleteTaxLoaded++;
    taxes.taxesList.splice(taxes.currentTaxesIndex,1);
    const newIndex = taxes.currentTaxesIndex - 1 < 0 ? taxes.currentTaxesIndex : taxes.currentTaxesIndex - 1;
    taxes.currentTaxesIndex = newIndex;
    taxes.currentTaxes = taxes.taxesList[newIndex];
  },
  [DELETE_TAXES_FAIL] ({taxes}) {
    taxes.loading = false;
    taxes.deleteTaxLoaded = false;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};


export const getTaxesAction = ({ dispatch }) => {
  dispatch(
    GET_TAXES,
    {
      types: [GET_TAXES_SUCCESS, GET_TAXES_FAIL],
      data: getData('store', 'taxes', 'GET'),
    }
  );
};

export const swichTaxesAction = ({ dispatch, state }, index) => {
  if (state.storeSection.taxes.currentTaxesIndex !== index) {
    dispatch(
      SWICH_TAXES_LIST,
      index
    );
  }
};

export const addRegionAction = ({ dispatch }, {countryTaxId, data}) => {
  dispatch(
    ADD_REGION,
    {
      types: [ADD_REGION_SUCCESS, ADD_REGION_FAIL],
      data: getData('store', `tax/${countryTaxId}/region-tax`, 'POST', data),
    }
  );
};

export const deleteRegionTaxAction = ({ dispatch }, {taxId, regionTaxId}) => {
  dispatch(
    DELETE_REGION,
    {
      types: [DELETE_REGION_SUCCESS, DELETE_REGION_FAIL],
      data: getData('store', `tax/${taxId}/region-tax/${regionTaxId}`, 'DELETE'),
    }
  );
};


export const addTaxAction = ({ dispatch }, data) => {
  dispatch(
    ADD_TAXES,
    {
      types: [ADD_TAXES_SUCCESS, ADD_TAXES_FAIL],
      data: getData('store', 'tax', 'POST', data),
    }
  );
};
//
export const editTaxesAction = ({ dispatch }, {taxId, data}) => {
  dispatch(
    EDIT_TAXES,
    {
      types: [EDIT_TAXES_SUCCESS, EDIT_TAXES_FAIL],
      data: getData('store', `tax/${taxId}`, 'PUT', data),
    }
  );
};

export const deleteTaxAction = ({ dispatch }, taxId) => {
  dispatch(
    DELETE_TAXES,
    {
      types: [DELETE_TAXES_SUCCESS, DELETE_TAXES_FAIL],
      data: getData('store', `tax/${taxId}`, 'DELETE'),
    }
  );
};
