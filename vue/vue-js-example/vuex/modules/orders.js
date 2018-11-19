const GET_ORDERS = "orders/GET_ORDERS";
const GET_ORDERS_SUCCESS = "orders/GET_ORDERS_SUCCESS";
const GET_ORDERS_FAIL = "orders/GET_ORDERS_FAIL";
const GET_STATUSES_SUCCESS = "orders/GET_STATUSES_SUCCESS";

const UPDATE_ORDER = "orders/UPDATE_ORDER";

import _ from "lodash";
import numeral from "numeral";

import { getData } from "global/vuex/api";
import { changeOrderStatusByID, getStatuses } from "global/api/store";
import { openDialogAction } from "dialogs/vuex/modules/dialogSwitches";

const defaultState = () => ({
  loading: false,
  loadingList: false,
  loadingOrder: 0,
  updateOrderList: 0,
  statuses: [],
  ordersList: [],
  order: {}
});

const mutations = {
  /* GET ORDERS LIST */
  [GET_ORDERS]({ orders }) {
    orders.loading = true;
  },

  [GET_ORDERS_SUCCESS]({ orders }, ordersList) {
    orders.loading = false;
    orders.loadingList = true;
    orders.ordersList = ordersList;
  },

  [GET_ORDERS_FAIL]({ orders }) {
    orders.loading = false;
    orders.loadingList = false;
  },

  /* GET ORDER */
  [UPDATE_ORDER]({ orders }, { orderIndex, order }) {
    orders.ordersList[orderIndex] = order;
    orders.order = order;
    orders.updateOrderList++;
  },

  /* GET STATUSES */
  [GET_STATUSES_SUCCESS]({ orders }, statuses) {
    orders.statuses = statuses;
  }
};

export const getOrdersAction = ({ dispatch }) => {
  dispatch(GET_ORDERS);

  return Promise.all([getData("store", "orders", "GET"), getStatuses()])
    .then(([orders, statuses]) => {
      const ordersList = orders.result.map((order) => {
        order.selfFulfillment = order.fullFilmentOptions === "Self Fulfillment";

        return order;
      });
      dispatch(GET_ORDERS_SUCCESS, ordersList);
      dispatch(GET_STATUSES_SUCCESS, statuses.result);
    })
    .catch((err) => {
      openDialogAction({ type: "serverErrorDialog", data: { message: err.result, err } });
      Busy.hide();
    });
};

export const getOrderAction = ({ dispatch, state }, orderID) => {
  Busy.show();

  return getData("store", `order/${orderID}`, "GET")
    .then((res) => {
      updateOrderList({ dispatch, state }, res.result);
      Busy.hide();

      return res;
    })
    .catch((err) => {
      Busy.hide();
      openDialogAction({ type: "serverErrorDialog", data: { message: err.result, err } });
    });
};

export const changeOrderStatusAction = ({ dispatch, state }, data) => {
  Busy.show();
  const { order, requestData } = data;

  return changeOrderStatusByID(requestData)
    .then(() => {
      order.status = requestData.status;
      order.statusId = requestData.statusId;
      updateOrderList({ dispatch, state }, order);
      Busy.hide();

      return;
    })
    .catch((err) => {
      Busy.hide();
      openDialogAction({ type: "serverErrorDialog", data: { message: err.result, err } });
    });
};

export const updateOrderList = ({ dispatch, state }, order) => {
  const orderIndex = _.findIndex(state.storeSection.orders.ordersList, { _id: order._id });
  order.selfFulfillment = order.fullFilmentOptions === "Self Fulfillment";
  dispatch(UPDATE_ORDER, { orderIndex, order });
};

// Gettets ----------------------------------------------------------------

export const getOrderstListGetter = (state) => {
  let resp = state.storeSection.orders.ordersList;
  if (resp && _.isArray(resp) && resp.length) {
    Busy.show();
    let _data = {};
    // this.data ? _data = Object.create(this.data) : _data = undefined;

    _data.orderlist = resp;

    if (_.isArray(_data.orderlist)) {
      _data.orderlist.forEach(function(order) {
        order.address = order.address.map(function(address) {
          address.billingType = address.type === "billing";

          return address;
        });
      });
    }
    _data.uniqueGalleryList = _(_data.orderlist)
      .map(function(order) {
        return order.onlineGalleryName;
      })
      .uniq("onlineGalleryName")
      .value();

    Busy.hide();

    return _data;
  }

  return {};
};

export const getOrderGetter = (state) => {
  let currentOrder = state.storeSection.orders.order;
  if (!_.isEmpty(state.storeSection.orders.order)) {
    Busy.show();
    if (Array.isArray(currentOrder.address)) {
      currentOrder.address.forEach(function(address) {
        address.billingType = address.type === "billing";
      });
    }

    currentOrder.createdDate = new Date(currentOrder.createdDate);
    currentOrder.email = currentOrder.address.length ? currentOrder.address[0].email : "";

    currentOrder.prettySummary = getPrettySummary(currentOrder);

    if (!currentOrder || !currentOrder.products || !_.isArray(currentOrder.products)) {
      logger.error("currentOrder is missing important data - cannot extratct product urls");

      return;
    }

    let product;
    let url;

    for (let i = currentOrder.products.length - 1; i >= 0; i--) {
      product = currentOrder.products[i];
      url = product.image.assets[200];

      product.imageURL = url || "/img/orderProductThumbImgPlaceholder.jpg";
    }
    currentOrder.prettyPrice = function() {
      return numeral(this.price).format("$ 0.00");
    };

    if (currentOrder && currentOrder.products) {
      currentOrder.products.forEach(function(product) {
        product.elementID = uuidv1();
      });
    }
    Busy.hide();

    return currentOrder;
  }

  return {};
};

function getPrettySummary(currentOrder) {
  let serviceFee = getCogs(currentOrder);
  let creditCardProcessingFee =
    currentOrder.fees && currentOrder.fees.creditCardProcessingFee
      ? numeral(currentOrder.fees.creditCardProcessingFee).value()
      : numeral(currentOrder.merchantFeeAmount).value();
  let grandTotal = getGrandTotal(currentOrder);
  let orderCommissionFee = currentOrder.fees
    ? numeral(currentOrder.fees.orderCommissionFee).value()
    : null;
  let premiumPackagingFee = currentOrder.fees
    ? numeral(currentOrder.fees.premiumPackagingFee).value()
    : numeral(currentOrder.premiumPackagingFee).value();
  let extraShipping = numeral(currentOrder.extraShipping).value();
  let shipping = numeral(currentOrder.shipping).value();
  let subTotal = numeral(currentOrder.subTotal).value();
  let tax = numeral(currentOrder.tax).value();

  let summary = {
    serviceFee: -serviceFee,
    grandTotal: grandTotal,
    premiumPackagingFee: -premiumPackagingFee,
    extraShipping: extraShipping,
    shipping: shipping,
    subTotal: subTotal,
    tax: tax
  };

  let totalTransferred = subTotal + tax - serviceFee;

  if (premiumPackagingFee) {
    totalTransferred -= premiumPackagingFee;
  }

  if (creditCardProcessingFee) {
    totalTransferred -= creditCardProcessingFee;
  }

  if (orderCommissionFee) {
    totalTransferred -= orderCommissionFee;
  }

  if (currentOrder.discount) {
    summary.discount = numeral(currentOrder.discountValue).value() * -1;
    totalTransferred += summary.discount;
  }

  if (orderCommissionFee) {
    summary.orderCommissionFee = -orderCommissionFee;
  }

  if (creditCardProcessingFee) {
    summary.creditCardProcessingFee = -creditCardProcessingFee;
  }

  if (currentOrder.isSelfFulfillmentOrder) {
    const totalShipping = extraShipping + shipping;
    summary.totalTransferred = totalTransferred += totalShipping;
    summary.orderProfit = totalTransferred - tax - totalShipping;
  } else {
    summary.totalTransferred = totalTransferred;
    summary.orderProfit = totalTransferred - tax;
  }

  const prettySummary = summary;

  return prettySummary;
}

function getGrandTotal(currentOrder) {
  if (currentOrder.grandTotal) {
    return numeral(currentOrder.grandTotal).value();
  }
  const total = numeral(currentOrder.total).value();

  return currentOrder.discount ? total - numeral(currentOrder.discountValue).value() : total;
}

function getCogs(currentOrder) {
  if (currentOrder.fees && currentOrder.fees.serviceFee) {
    return numeral(currentOrder.fees.serviceFee).value();
  }

  let cogs = _.reduce(
    currentOrder.products,
    function(accum, product) {
      accum += numeral(product.cost).value() * numeral(product.quantity).value();

      return accum;
    },
    0
  );

  return cogs;
}

export default {
  defaultState,
  state: defaultState(),
  mutations
};
