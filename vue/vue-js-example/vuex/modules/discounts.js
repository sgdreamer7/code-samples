const GET_DISCOUNTS = 'discounts/GET_DISCOUNTS';
const GET_DISCOUNTS_SUCCESS = 'discounts/GET_DISCOUNTS_SUCCESS';
const GET_DISCOUNTS_FAIL = 'discounts/GET_DISCOUNTS_FAIL';

const ADD_DISCOUNT = 'discounts/ADD_DISCOUNT';
const ADD_DISCOUNT_SUCCESS = 'discounts/ADD_DISCOUNT_SUCCESS';
const ADD_DISCOUNT_FAIL = 'discounts/ADD_DISCOUNT_FAIL';

const EDIT_DISCOUNT = 'discounts/EDIT_DISCOUNT';
const EDIT_DISCOUNT_SUCCESS = 'discounts/EDIT_DISCOUNT_SUCCESS';
const EDIT_DISCOUNT_FAIL = 'discounts/EDIT_DISCOUNT_FAIL';

const DELETE_DISCOUNT = 'discounts/DELETE_DISCOUNT';
const DELETE_DISCOUNT_SUCCESS = 'discounts/DELETE_DISCOUNT_SUCCESS';
const DELETE_DISCOUNT_FAIL = 'discounts/DELETE_DISCOUNT_FAIL';

import { getData } from 'global/vuex/api';
// import _ from 'lodash';
import _ from 'lodash';

const defaultState = () => ({
  discountListLoaded: false,
  addDiscountLoadedCount: 0,
  editDiscountLoadedCount: 0,
  deleteDiscountLoadedCount: 0,
  loading: false,
  currentDiscount: {},
  discountList: [],
  currentDiscountIndex: 0,
});

const mutations = {
  [GET_DISCOUNTS] ({discounts}) {
    discounts.loading = true;
  },
  [GET_DISCOUNTS_SUCCESS] ({discounts}, payload) {
    discounts.loading = false;
    discounts.discountListLoaded = true;
    discounts.discountList = payload.result;
  },
  [GET_DISCOUNTS_FAIL] ({discounts}, payload) {
    discounts.loading = false;
    discounts.discountListLoaded = false;
    discounts.error = payload;
  },

  /*ADD*/
  [ADD_DISCOUNT] ({discounts}) {
    discounts.loading = true;
  },
  [ADD_DISCOUNT_SUCCESS] ({discounts}, payload) {
    discounts.loading = false;
    discounts.addDiscountLoadedCount++;
    discounts.discountList.push(payload.result);
  },
  [ADD_DISCOUNT_FAIL] ({discounts}, payload) {
    discounts.loading = false;
    discounts.addDiscountLoadedCount = false;
    discounts.error = payload;
  },

  /*EDIT*/
  [EDIT_DISCOUNT] ({discounts}) {
    discounts.loading = true;
  },
  [EDIT_DISCOUNT_SUCCESS] ({discounts}) {
    discounts.loading = false;
    discounts.editDiscountLoadedCount++;
    discounts.discountList.splice(discounts.currentDiscountIndex, 1, discounts.currentDiscount);
  },
  [EDIT_DISCOUNT_FAIL] ({discounts}, payload) {
    discounts.loading = false;
    discounts.editDiscountLoadedCount = false;
    discounts.error = payload;
  },

  /*DELETE*/
  [DELETE_DISCOUNT] ({discounts}) {
    discounts.loading = true;
  },
  [DELETE_DISCOUNT_SUCCESS] ({discounts}) {
    discounts.loading = false;
    discounts.deleteDiscountLoadedCount++;
    discounts.discountList.splice(discounts.currentDiscountIndex, 1);
  },
  [DELETE_DISCOUNT_FAIL] ({discounts}, payload) {
    discounts.loading = false;
    discounts.deleteDiscountLoadedCount = false;
    discounts.error = payload;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};

export const getDiscountsAction = ({ dispatch }) => {
  dispatch(
    GET_DISCOUNTS,
    {
      types: [GET_DISCOUNTS_SUCCESS, GET_DISCOUNTS_FAIL],
      data: getData('store', 'sales/discounts', 'GET'),
    }
  );
};

export const addDiscountAction = ({ dispatch }, data) => {
  dispatch(
    ADD_DISCOUNT,
    {
      types: [ADD_DISCOUNT_SUCCESS, ADD_DISCOUNT_FAIL],
      data: getData('store', 'sales/discounts', 'POST', data),
    }
  );
};

export const editDiscountAction = ({ dispatch, state }, {id, data, index}) => {
  let newData = _.clone(data);
  state.storeSection.discounts.currentDiscount = data;
  state.storeSection.discounts.currentDiscountIndex = index;
  delete newData._id;
  dispatch(
    EDIT_DISCOUNT,
    {
      types: [EDIT_DISCOUNT_SUCCESS, EDIT_DISCOUNT_FAIL],
      data: getData('store', 'sales/discounts/' + id, 'PUT', newData),
    }
  );
};

export const deleteDiscountAction = ({ dispatch, state }, {id, index}) => {
  state.storeSection.discounts.currentDiscountIndex = index;
  dispatch(
    DELETE_DISCOUNT,
    {
      types: [DELETE_DISCOUNT_SUCCESS, DELETE_DISCOUNT_FAIL],
      data: getData('store', 'sales/discounts/' + id, 'DELETE'),
    }
  );
};
