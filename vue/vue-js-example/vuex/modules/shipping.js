const GET_SHIPPING_SUCCESS = 'shipping/GET_SHIPPING_SUCCESS';
const ADD_SHIPPING_SUCCESS = 'shipping/ADD_SHIPPING_SUCCESS';
const EDIT_SHIPPING_SUCCESS = 'shipping/EDIT_SHIPPING_SUCCESS';
const DELETE_SHIPPING_SUCCESS = 'shipping/DELETE_SHIPPING_SUCCESS';

import { getData } from 'global/vuex/api';
import { findIndex } from 'lodash';
import { openDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

const defaultState = () => ({
  loadedList: false,
  addEditLoaded: 0,
  deleteLoaded: 0,
  gridData: [],
});

const mutations = {
  [GET_SHIPPING_SUCCESS] ({shipping}, shippings) {
    shipping.loadedList = true;
    shipping.gridData = shippings;
  },

  [ADD_SHIPPING_SUCCESS] ({shipping}, newShipping) {
    shipping.addEditLoaded++;
    shipping.gridData.push(newShipping);
  },

  [EDIT_SHIPPING_SUCCESS] ({shipping}, {index, updatedShipping}) {
    shipping.addEditLoaded++;
    shipping.gridData.splice(index, 1, updatedShipping);
  },

  [DELETE_SHIPPING_SUCCESS] ({shipping}, index) {
    shipping.gridData.splice(index, 1);
    shipping.deleteLoaded++;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};


export const getShippingAction = ({ dispatch }) => {
  Busy.show();

  return getData('store', 'shippings', 'GET')
    .then(res => {
      Busy.hide();
      dispatch(GET_SHIPPING_SUCCESS, res.result);

      return res.result;
    })
    .catch(err => {
      Busy.hide();
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result, err}});
    });
};

export const addShippingAction = ({ dispatch }, data) => {
  return getData('store', 'shipping', 'POST', data)
    .then(res => {
      dispatch(ADD_SHIPPING_SUCCESS, res.result);
    })
    .catch(err => {
      Busy.hide();
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result, err}});
    });
};

export const editShippingAction = ({ dispatch, state }, data) => {
  !data._id && openDialogAction({type: 'serverErrorDialog', data: {message:'Request data without _id'}});

  return getData('store', `shipping/${data._id}`, 'PUT', data)
    .then(res => {
      const index = findIndex(state.storeSection.shipping.gridData, ['_id', data._id]);
      dispatch(EDIT_SHIPPING_SUCCESS, {index, updatedShipping: res.result});

      return res.result;
    })
    .catch(err => {
      Busy.hide();
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result, err}});
    });
};

export const deleteShippingAction = ({ dispatch, state }, id) => {
  const index = findIndex(state.storeSection.shipping.gridData, ['_id', id]);
  !id && openDialogAction({type: 'serverErrorDialog', data: {message:'Request data without _id'}});

  return getData('store', `shipping/${id}`, 'DELETE')
    .then(res => {
      Busy.hide();
      dispatch(DELETE_SHIPPING_SUCCESS, index);

      return res.result;
    })
    .catch(err => {
      Busy.hide();
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result, err}});
    });
};
