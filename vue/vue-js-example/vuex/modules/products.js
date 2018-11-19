const GET_PRODUCTS = 'products/GET_PRODUCTS';
const GET_PRODUCTS_SUCCESS = 'products/GET_PRODUCTS_SUCCESS';
const GET_PRODUCTS_FAIL = 'products/GET_PRODUCTS_FAIL';

const ADD_CATALOG = 'products/ADD_CATALOG';
const ADD_CATALOG_SUCCESS = 'products/ADD_CATALOG_SUCCESS';
const ADD_CATALOG_FAIL = 'products/ADD_CATALOG_FAIL';

const EDIT_CATALOG = 'products/EDIT_CATALOG';
const EDIT_CATALOG_SUCCESS = 'products/EDIT_CATALOG_SUCCESS';
const EDIT_CATALOG_FAIL = 'products/EDIT_CATALOG_FAIL';

const DELETE_CATALOG = 'products/DELETE_CATALOG';
const DELETE_CATALOG_SUCCESS = 'products/DELETE_CATALOG_SUCCESS';
const DELETE_CATALOG_FAIL = 'products/DELETE_CATALOG_FAIL';

const ADD_PRODUCT = 'products/ADD_PRODUCT';
const ADD_PRODUCT_SUCCESS = 'products/ADD_PRODUCT_SUCCESS';
const ADD_PRODUCT_FAIL = 'products/ADD_PRODUCT_FAIL';

const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const EDIT_PRODUCT_SUCCESS = 'products/EDIT_PRODUCT_SUCCESS';
const EDIT_PRODUCT_FAIL = 'products/EDIT_PRODUCT_FAIL';

const DELETE_PRODUCT = 'products/DELETE_PRODUCT';
const DELETE_PRODUCT_SUCCESS = 'products/DELETE_PRODUCT_SUCCESS';
const DELETE_PRODUCT_FAIL = 'products/DELETE_PRODUCT_FAIL';

const GET_LABS = 'products/GET_LABS';
const GET_LABS_SUCCESS = 'products/GET_LABS_SUCCESS';
const GET_LABS_FAIL = 'products/GET_LABS_FAIL';

const BULK_MARKUP = 'products/BULK_MARKUP';
const BULK_MARKUP_SUCCESS = 'products/BULK_MARKUP_SUCCESS';
const BULK_MARKUP_FAIL = 'products/BULK_MARKUP_FAIL';

const UPDATE_PRODUCTS_LIST = 'products/UPDATE_PRODUCTS_LIST';

import { getData } from 'global/vuex/api';
// import _ from 'lodash';
var _ = require('lodash');

const defaultState = () => ({
  updateProducts: 0,
  productListLoaded: 0,
  labsLoaded: false,
  bulkLoadedCount: 0,
  addProductLoadedCount: 0,
  editProductLoadedCount: 0,
  deleteProductLoadedCount: 0,
  addCatalogLoadedCount: 0,
  addTo: 0,
  editCatalogLoadedCount: 0,
  deleteCatalogLoadedCount: 0,
  loading: false,
  labs: [],
  responseProductList: [],
  filterProductsByCategories: [],
  productList: {
    currentItem: {},
    allProductCategories: [],
    priceSheets: [],
    productsByCategories: [],
    selectIndex: '',
  },
});

const mutations = {
  /*GET*/
  [GET_PRODUCTS] ({products}) {
    products.loading = true;
  },
  [GET_PRODUCTS_SUCCESS] ({products}, pricesheets) {
    products.loading = false;
    products.productListLoaded++;
    products.responseProductList = pricesheets;
  },
  [GET_PRODUCTS_FAIL] ({products}, payload) {
    products.loading = false;
    products.productListLoaded = 0;
    products.error = payload;
  },

  /*ADD*/
  [ADD_CATALOG] ({products}) {
    products.loading = true;
  },
  [ADD_CATALOG_SUCCESS] ({products}, payload, afterIndex) {
    products.loading = false;
    products.addCatalogLoadedCount++;

    if (payload.result.defaultPriceSheet) {
      products.responseProductList.forEach(pricesheet => {
        pricesheet.defaultPriceSheet = false;
      });
    }
    payload.result.selfFulfillment = payload.result.fullFilmentOptions === 'Self Fulfillment';
    if (typeof(afterIndex) === 'undefined') {
      products.responseProductList.push(payload.result);
    } else {
      products.productList.selectIndex = afterIndex;
      products.responseProductList.splice(afterIndex + 1, 0, payload.result);
    }
    products.addTo = afterIndex + 1 || products.responseProductList.length - 1;
  },
  [ADD_CATALOG_FAIL] ({products}, payload) {
    products.loading = false;
    products.addCatalogLoadedCount = false;
    products.error = payload;
  },

  /*EDIT*/
  [EDIT_CATALOG] ({products}) {
    products.loading = true;
  },
  [EDIT_CATALOG_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.editCatalogLoadedCount++;

    if (payload.result.defaultPriceSheet) {
      products.responseProductList.forEach(pricesheet => {
        pricesheet.defaultPriceSheet = false;
      });
    }

    payload.result.selfFulfillment = payload.result.fullFilmentOptions === 'Self Fulfillment';
    products.responseProductList.splice(products.productList.selectIndex, 1, payload.result);
  },
  [EDIT_CATALOG_FAIL] ({products}, payload) {
    products.loading = false;
    products.editCatalogLoadedCount = false;
    products.error = payload;
  },

  /*DELETE*/
  [DELETE_CATALOG] ({products}) {
    products.loading = true;
  },
  [DELETE_CATALOG_SUCCESS] ({products}) {
    products.loading = false;
    products.deleteCatalogLoadedCount++;
    products.responseProductList.splice(products.productList.selectIndex,1);
  },
  [DELETE_CATALOG_FAIL] ({products}, payload) {
    products.loading = false;
    products.deleteCatalogLoadedCount = false;
    products.error = payload;
  },

  /*ADD PRODUCT*/
  [ADD_PRODUCT] ({products}) {
    products.loading = true;
  },
  [ADD_PRODUCT_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.addProductLoadedCount++;
    let newProduct = payload.result.products[payload.result.products.length - 1];
    products.responseProductList[products.productList.selectIndex].products.push(newProduct);
  },
  [ADD_PRODUCT_FAIL] ({products}, payload) {
    products.loading = false;
    products.addProductLoadedCount = false;
    products.error = payload;
  },

  /*EDIT PRODUCT*/
  [EDIT_PRODUCT] ({products}) {
    products.loading = true;
  },
  [EDIT_PRODUCT_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.editProductLoadedCount++;
    payload.result.selfFulfillment = payload.result.fullFilmentOptions === 'Self Fulfillment';
    products.responseProductList.splice(products.productList.selectIndex, 1, payload.result);
  },
  [EDIT_PRODUCT_FAIL] ({products}, payload) {
    products.loading = false;
    products.editProductLoadedCount = false;
    products.error = payload;
  },

  /*DELETE PRODUCT*/
  [DELETE_PRODUCT] ({products}) {
    products.loading = true;
  },
  [DELETE_PRODUCT_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.deleteProductLoadedCount++;
    payload.result.selfFulfillment = payload.result.fullFilmentOptions === 'Self Fulfillment';
    products.responseProductList.splice(products.productList.selectIndex, 1, payload.result);
  },
  [DELETE_PRODUCT_FAIL] ({products}, payload) {
    products.loading = false;
    products.deleteProductLoadedCount = false;
    products.error = payload;
  },

  /*LABS*/
  [GET_LABS] ({products}) {
    products.loading = true;
  },
  [GET_LABS_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.labsLoaded = true;
    products.labs = payload.result;
  },
  [GET_LABS_FAIL] ({products}, payload) {
    products.loading = false;
    products.labsLoaded = false;
    products.error = payload;
  },

  /*BULK_MARKUP*/
  [BULK_MARKUP] ({products}) {
    products.loading = true;
  },
  [BULK_MARKUP_SUCCESS] ({products}, payload) {
    products.loading = false;
    products.bulkLoadedCount ++;
    payload.result.selfFulfillment = payload.result.fullFilmentOptions === 'Self Fulfillment';
    products.responseProductList.splice(products.productList.selectIndex, 1, payload.result);
  },
  [BULK_MARKUP_FAIL] ({products}, payload) {
    products.loading = false;
    products.bulkLoadedCount = false;
    products.error = payload;
  },

  /*UPDATE*/
  [UPDATE_PRODUCTS_LIST] ({products}, updatedData) {
    products.updateProducts++;
    products.productList = updatedData;
    products.filterProductsByCategories = updatedData.productsByCategories;
  },
};

export default {
  defaultState,
  state: defaultState(),
  mutations,
};

// bulkMarkup
export const bulkMarkupAction = ({ dispatch }, {pricesheetID, data} ) => {
  dispatch(
    BULK_MARKUP,
    {
      types: [BULK_MARKUP_SUCCESS, BULK_MARKUP_FAIL],
      data: getData('store', 'pricesheet/' + pricesheetID + '/markups', 'PUT', data),
    }
  );
};

export const getProductsAction = ({ dispatch }) => {
  Busy.show();
  dispatch(GET_PRODUCTS);

  return getData('store', 'pricesheets', 'GET').then(
    (res) => {
      const pricesheets = res.result.map(pricesheet => {
        pricesheet.selfFulfillment = pricesheet.fullFilmentOptions === 'Self Fulfillment';

        return pricesheet;
      });

      dispatch(GET_PRODUCTS_SUCCESS, pricesheets);
      Busy.hide();
    },
    (err) => {
      dispatch(GET_PRODUCTS_FAIL, err);
      Busy.hide();
    });
};

export const addCatalogAction = ({ dispatch }, data, afterIndex) => {
  dispatch(ADD_CATALOG);
  getData('store', 'pricesheet', 'POST', data)
    .then((data) => {
      dispatch(ADD_CATALOG_SUCCESS, data, afterIndex);
    })
    .catch((err) => {
      dispatch(ADD_CATALOG_FAIL, err);
    });
};

export const editCatalogAction = ({ dispatch }, {pricesheetID, data}) => {
  dispatch(
    EDIT_CATALOG,
    {
      types: [EDIT_CATALOG_SUCCESS, EDIT_CATALOG_FAIL],
      data: getData('store', 'pricesheet/' + pricesheetID, 'PUT', data),
    }
  );
};

export const deleteCatalogAction = ({ dispatch }, id ) => {
  dispatch(
    DELETE_CATALOG,
    {
      types: [DELETE_CATALOG_SUCCESS, DELETE_CATALOG_FAIL],
      data: getData('store', 'pricesheet/' + id, 'DELETE'),
    }
  );
};

export const addProductAction = ({ dispatch }, {pricesheetID, data}) => {
  dispatch(
    ADD_PRODUCT,
    {
      types: [ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL],
      data: getData('store', 'pricesheet/' + pricesheetID + '/product', 'POST', data),
    }
  );
};

export const editProductAction = ({ dispatch }, {pricesheetID, productID, data}) => {
  dispatch(
    EDIT_PRODUCT,
    {
      types: [EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL],
      data: getData('store', 'pricesheet/' + pricesheetID + '/product/' + productID, 'PUT', data),
    }
  );
};

export const deleteProductAction = ({ dispatch }, {pricesheetID, productID}) => {
  dispatch(
    DELETE_PRODUCT,
    {
      types: [DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL],
      data: getData('store', 'pricesheet/' + pricesheetID + '/product/' + productID, 'DELETE'),
    }
  );
};

export const getLabsAction = ({ dispatch }) => {
  dispatch(
    GET_LABS,
    {
      types: [GET_LABS_SUCCESS, GET_LABS_FAIL],
      data: getData('store', 'print-labs', 'GET'),
    }
  );
};

export const updateCatalog = ({ dispatch }, {oldData, index}) => {
  let allProductCategories = [];
  let productsByCategories = [];
  Busy.show();

  if (!oldData.length) {
    Busy.hide();

    return false;
  }

  const priceSheets = oldData.map((entry, i) => {
    Vue.set(entry, 'selected', i === index);

    return entry;
  });

  const selectIndex = index;
  const currentItem = priceSheets[selectIndex];

  const {products: currentProducts} = currentItem;
  currentProducts.forEach(currentProduct => {
    const {markup, cost} = currentProduct;
    if (currentItem.selfFulfillment) {
      currentProduct.categoryID = currentProduct.categoryName;
    } else {
      currentProduct.markupAmount = Math.round(Number(markup) * Number(cost) * 100) / 100;
    }
  });

  allProductCategories = _(currentProducts)
    .uniqBy('categoryID')
    .map(({categoryID, categoryName}) => ({categoryID, categoryName}))
    .sortBy(
      ({categoryName}) => categoryName !== 'Prints',
      ({categoryID}) => Number(categoryID)
    )
    .value();

  const productGroups = _.groupBy(currentProducts, 'categoryID');
  productsByCategories = _.reduce(allProductCategories, (result, {categoryID, categoryName}) => {
    const products = productGroups[categoryID];
    result.push({categoryID, categoryName, products});

    return result;
  }, []);

  const data = {
    selectIndex,
    currentItem,
    priceSheets,
    allProductCategories,
    productsByCategories,
  };

  Busy.hide();

  dispatch(UPDATE_PRODUCTS_LIST, data);
};
