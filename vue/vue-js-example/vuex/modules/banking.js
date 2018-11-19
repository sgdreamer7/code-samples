const GET_BANKING_SUCCESS = 'BANKING/GET_BANKING_SUCCESS';
const GET_BANKING_FAIL = 'BANKING/GET_BANKING_FAIL';

const CONNECT_TO_STRIPE_SUCCESS = 'BANKING/CONNECT_TO_STRIPE_SUCCESS';
const DISCONNECT_FROM_STRIPE_SUCCESS = 'BANKING/DISCONNECT_FROM_STRIPE_SUCCESS';

const GET_TERMOFSALE = 'TERMOFSALE/GET_TERMOFSALE';
const GET_TERMOFSALE_SUCCESS = 'TERMOFSALE/GET_TERMOFSALE_SUCCESS';
const GET_TERMOFSALE_FAIL = 'TERMOFSALE/GET_TERMOFSALE_FAIL';

const UPDATE_TERMOFSALE = 'TERMOFSALE/UPDATE_TERMOFSALE';
const UPDATE_TERMOFSALE_SUCCESS = 'TERMOFSALE/UPDATE_TERMOFSALE_SUCCESS';
const UPDATE_TERMOFSALE_FAIL = 'TERMOFSALE/UPDATE_TERMOFSALE_FAIL';


import { getData } from 'global/vuex/api';
import { openDialogAction } from 'dialogs/vuex/modules/dialogSwitches';
import { updateAmbassadorCanPayAction } from 'accountSettings/vuex/modules/ambassador';

const defaultState = () => ({
  bankingDataLoaded: 0,
  termOfSaleLoaded: false,
  loading: false,
  currentBankingData: {},
  termOfSale: {},
  error: '',
});

const mutations = {
  /*GET*/
  // [GET_BANKING] ({banking}) {
  //   banking.loading = true;
  // },
  [GET_BANKING_SUCCESS] ({banking}, payload) {
    banking.loading = false;
    banking.bankingDataLoaded++;
    banking.currentBankingData = payload.result;
  },
  [GET_BANKING_FAIL] ({banking}, payload) {
    banking.loading = false;
    banking.bankingDataLoaded = 0;
    banking.error = payload;
  },
  /*GET_TERMOFSALE*/
  [GET_TERMOFSALE] ({banking}) {
    banking.loading = true;
  },
  [GET_TERMOFSALE_SUCCESS] ({banking}, payload) {
    banking.loading = false;
    banking.termOfSaleLoaded = true;
    if (payload.result.termsAndSaleInfo) {
      banking.termOfSale = payload.result;
    } else {
      banking.termOfSale = {};
    }
  },
  [GET_TERMOFSALE_FAIL] ({banking}, payload) {
    banking.loading = false;
    banking.termOfSaleLoaded = false;
    banking.error = payload;
  },
  /*UPDATE_TERMOFSALE*/
  [UPDATE_TERMOFSALE] ({banking}) {
    banking.loading = true;
  },
  [UPDATE_TERMOFSALE_SUCCESS] ({banking}, payload) {
    banking.loading = false;
    banking.termOfSaleLoaded = true;
    banking.termOfSale = payload.result;
  },
  [UPDATE_TERMOFSALE_FAIL] ({banking}, payload) {
    banking.loading = false;
    banking.termOfSaleLoaded = false;
    banking.error = payload;
  },

  [CONNECT_TO_STRIPE_SUCCESS] ({banking}, payload) {
    banking.currentBankingData = payload.result;
  },

  [DISCONNECT_FROM_STRIPE_SUCCESS] ({banking}, payload) {
    banking.currentBankingData = payload.result;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};


export const getMerchantInfoAction = ({ dispatch, state }) => {
  if (!state.storeSection.banking.bankingDataLoaded) {
    Busy.show();

    return getData('base', 'user/merchant', 'GET')
      .then(res => {
        dispatch(
          GET_BANKING_SUCCESS,
          res
        );
        Busy.hide();

        return res.result;
      })
      .catch(err => {
        dispatch(
          GET_BANKING_FAIL,
          err
        );
        openDialogAction({type: 'serverErrorDialog', data: {message: err.result}});
        Busy.hide();
      });
  } else {
    dispatch({
      type: GET_BANKING_SUCCESS,
      silent: true,
      payload: {result: state.storeSection.banking.currentBankingData},
    });

    return Promise.resolve(state.storeSection.banking.currentBankingData);
  }
};

export const connectToStripeAction = ({ dispatch }, code) => {
  Busy.show();

  return getData('base', 'user/merchant', 'POST', { authorizationCode: code })
    .then(res => {
      dispatch(CONNECT_TO_STRIPE_SUCCESS, res);
      Busy.hide();
      window.dataLayer.push({
        event: 'interaction',
        category: 'store',
        action: 'connect stripe',
        label: 'succeed',
        value: 1,
      });
    })
    .catch(err => {
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result}});
      // TODO: re-enable this rule
      // eslint-disable-next-line no-console
      console.log(err);
      Busy.hide();
      window.dataLayer.push({
        event: 'interaction',
        category: 'store',
        action: 'connect stripe',
        label: 'fail',
        value: 0,
      });
    });
};

export const connectToStripeExpressAction = ({ dispatch, state }, code) => {
  Busy.show();
  const affiliateid = state.userData.user.data.affiliate;

  return getData('affiliate', `affiliates/${affiliateid}/payment/stripe-connect/authorize`, 'POST', { authorization_code: code })
    .then(() => {
      updateAmbassadorCanPayAction({ dispatch }, true);
      Busy.hide();
    })
    .catch(err => {
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result, err}});
      Busy.hide();
    });
};

export const disconnectFromStripeAction = ({ dispatch }) => {
  Busy.show();

  return getData('base', 'user/merchant', 'DELETE')
    .then(res => {
      dispatch(DISCONNECT_FROM_STRIPE_SUCCESS, res);
      Busy.hide();
      window.dataLayer.push({
        event: 'interaction',
        category: 'store',
        action: 'disconnect stripe',
        label: 'succeed',
        value: 1,
      });
    })
    .catch(err => {
      openDialogAction({type: 'serverErrorDialog', data: {message: err.result}});
      // TODO: re-enable this rule
      // eslint-disable-next-line no-console
      console.log(err);
      Busy.hide();
      window.dataLayer.push({
        event: 'interaction',
        category: 'store',
        action: 'disconnect stripe',
        label: 'fail',
        value: 0,
      });
    });
};

export const getTermsOfSaleAction = ({ dispatch }) => {
  dispatch(
    GET_TERMOFSALE,
    {
      types: [GET_TERMOFSALE_SUCCESS, GET_TERMOFSALE_FAIL],
      data: getData('base', 'terms-of-sale', 'GET'),
    }
  );
};

export const updateTermsOfSaleAction = ({ dispatch }, data) => {
  dispatch(
    UPDATE_TERMOFSALE,
    {
      types: [UPDATE_TERMOFSALE_SUCCESS, UPDATE_TERMOFSALE_FAIL],
      data: getData('base', 'terms-of-sale', 'PUT', data),
    }
  );
};
