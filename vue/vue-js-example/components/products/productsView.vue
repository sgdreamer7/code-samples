<template>
  <products
    v-if="responseProductList.length"
    :data="productList"
    :filter-products-by-categories="filterProductsByCategories"
    :update-catalog="updateCatalog"
    >
  </products>

  <empty-list
    v-else
    icon="icon_create-new"
    message="Create a Catalog"
    :add-new-item="addNewItemproductsDialog"
  >
  </empty-list>

  <add-catalog
    v-if="productsDialog"
    :showdialog="productsDialog"
    :closepopup="closePopupproductsDialog"
    :catalog-data="productList"
    :submit="addCatalogAction"
    :get-labs="getLabsAction"
    :labs="labs"
    >
  </add-catalog>
  <edit-catalog
    v-if="productsEditDialog"
    :showdialog="productsEditDialog"
    :closepopup="closePopupproductsEditDialog"
    :catalog-data="productList"
    :submit="editCatalogAction"
    >
  </edit-catalog>
  <edit-product
    v-if="productsEditProductDialog"
    :showdialog="productsEditProductDialog"
    :closepopup="closePopupproductsEditProductDialog"
    :product-data="dialogData"
    :catalog-data="productList"
    :submit="editProductAction"
    >
  </edit-product>
  <delete-dialog
    v-if="productsDeleteDialog"
    :showdialog="productsDeleteDialog"
    :header = "'Delete Catalog'"
    :text="`Are you sure you want to <strong>permanently</strong> delete ${productList.currentItem.displayName}?`"
    :closepopup="closePopupproductsDeleteDialog"
    :submit = "deleteCatalogAction.bind(this, productList.currentItem._id)"
  >
  </delete-dialog>
  <delete-dialog
    v-if="productsDeleteProductDialog"
    :header = "displayProductCategoryOne(dialogData.categoryName)"
    :showdialog="productsDeleteProductDialog"
    :text = "'Are you sure you want to delete this item?'"
    :closepopup="closePopupproductsDeleteProductDialog"
    :submit = "deleteProductAction.bind(this, {pricesheetID: productList.currentItem._id, productID: dialogData.productID})"
    >
  </delete-dialog>
  <add-product
    v-if="productsAddProductDialog"
    :showdialog="productsAddProductDialog"
    :closepopup="closePopupproductsAddProductDialog"
    :product-data="dialogData"
    :catalog-data="productList"
    :submit="addProductAction"
    :all-products="allProducts"
    >
  </add-product>
  <add-edit-digital-product
    v-if="productsAddEditDigitalProductDialog"
    :showdialog="productsAddEditDigitalProductDialog"
    :closepopup="closeProductsAddEditDigitalProductDialog"
    :product-data="dialogData"
    :catalog-data="productList"
    >
  </add-edit-digital-product>
  <self-add-product
    v-if="productsSelfAddProductDialog"
    :showdialog="productsSelfAddProductDialog"
    :closepopup="closePopupproductsSelfAddProductDialog"
    :catalog-data="allProducts"
    >
  </self-add-product>
  <bulk-markup
    v-if="productsBulkMarkupDialog"
    :showdialog="productsBulkMarkupDialog"
    :closepopup="closePopupproductsBulkMarkupDialog"
    :catalog-data="productList"
    :submit="bulkMarkupAction"
    >
  </bulk-markup>
</template>

<script>
  import _ from 'lodash';
  import addCatalog from 'store/components/products/addCatalogDialog/addCatalogDialog';
  import editCatalog from 'store/components/products/editCatalogDialog/editCatalogDialog';
  import addProduct from 'store/components/products/addProductDialog/addProductDialog';
  import editProduct from 'store/components/products/editProductDialog/editProductDialog';
  import selfAddProduct from 'store/components/products/addProductDialog/selfFullfilmentAddDialog/selfFullfilmentAddDialog';
  import addEditDigitalProduct from 'store/components/products/addProductDialog/addEditDigitalProduct';
  import bulkMarkup from 'store/components/products/bulkMarkupDialog/bulkMarkupDialog';
  import products from 'store/components/products/products';
  import deleteDialog from 'dialogs/components/deleteDialog';
  import emptyList from 'store/components/assets/emptyList/emptyList';
  import UITextHelper from 'global/mixins/UITextHelper';

  import {
    getProductsAction,
    updateCatalog,
    deleteCatalogAction,
    addCatalogAction,
    getLabsAction,
    editCatalogAction,

    addProductAction,
    editProductAction,
    deleteProductAction,
    bulkMarkupAction,
  } from 'store/vuex/modules/products';

  import { toogleDialogAction, openDialogAction, closeDialogAction } from 'dialogs/vuex/modules/dialogSwitches';


  export default {
    mixins: [UITextHelper],

    components: {
      products,
      addCatalog,
      editCatalog,
      addProduct,
      selfAddProduct,
      editProduct,
      bulkMarkup,
      addEditDigitalProduct,
      deleteDialog,
      emptyList,
    },

    vuex: {
      getters: {
        responseProductList: state => state.storeSection.products.responseProductList,
        addCatalogLoadedCount: state => state.storeSection.products.addCatalogLoadedCount,
        addTo: state => state.storeSection.products.addTo,
        editCatalogLoadedCount: state => state.storeSection.products.editCatalogLoadedCount,
        deleteCatalogLoadedCount: state => state.storeSection.products.deleteCatalogLoadedCount,
        addProductLoadedCount: state => state.storeSection.products.addProductLoadedCount,
        editProductLoadedCount: state => state.storeSection.products.editProductLoadedCount,
        bulkLoadedCount: state => state.storeSection.products.bulkLoadedCount,
        deleteProductLoadedCount: state => state.storeSection.products.deleteProductLoadedCount,
        productListLoaded: state => state.storeSection.products.productListLoaded,
        filterProductsByCategories: state => state.storeSection.products.filterProductsByCategories,
        productList: state => state.storeSection.products.productList,
        labs: state => state.storeSection.products.labs,
        updateProducts: state => state.storeSection.products.updateProducts,
      },
      actions: {
        getProductsAction,
        updateCatalog,
        deleteCatalogAction,
        addCatalogAction,
        getLabsAction,
        editCatalogAction,

        addProductAction,
        editProductAction,
        deleteProductAction,
        bulkMarkupAction,
      },
    },

    computed: {

      // Dialog vuex ----------------------------------------------------------
      productsDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsDialog;
      },

      productsEditDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsEditDialog;
      },

      productsEditProductDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsEditProductDialog;
      },

      productsDeleteDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsDeleteDialog;
      },

      productsDeleteProductDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsDeleteProductDialog;
      },

      productsSelfAddProductDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsSelfAddProductDialog;
      },

      productsAddProductDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsAddProductDialog;
      },

      productsAddEditDigitalProductDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsAddEditDigitalProductDialog;
      },

      productsBulkMarkupDialog () {
        return this.$store.state.dialogs.dialogSwitches.productsBulkMarkupDialog;
      },

      dialogData () {
        return this.$store.state.dialogs.dialogSwitches.dialogData;
      },

      getCatalogName () {
        let product = this.productList.find((value) => value._id === this.productList.currentItem._id);

        return product.name ;
      },

      // Computed ----------------------------------------------------------
      currentProductList: function () {
        return this.productList.currentItem.products;
      },
    },

    watch: {

      bulkLoadedCount:{
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex});
            closeDialogAction({type: 'productsBulkMarkupDialog'});
          }
        },
      },

      productListLoaded: {
        handler: function (newVal) {
          if (newVal && this.responseProductList.length) {
            this.updateCatalog({oldData: this.responseProductList, index: 0});
          }
        },
      },

      deleteCatalogLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex !== 0 ? this.productList.selectIndex - 1 : 0});
            closeDialogAction({type: 'productsDeleteDialog'});
          }
        },
      },

      addCatalogLoadedCount: {
        handler: function (newVal) {
          if (newVal && this.addTo < this.responseProductList.length - 1) {
            this.updateCatalog({oldData: this.responseProductList, index: this.addTo});
            closeDialogAction({type: 'productsDialog'});
          } else {
            this.updateCatalog({oldData: this.responseProductList, index: this.responseProductList.length - 1});
            closeDialogAction({type: 'productsDialog'});
          }
        },
      },

      editCatalogLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex});
            closeDialogAction({type: 'productsEditDialog'});
          }
        },
      },

      addProductLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex});
            closeDialogAction({type: 'productsAddProductDialog'});
            closeDialogAction({type: 'productsAddEditDigitalProductDialog'});
          }
        },
      },

      editProductLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex});
            closeDialogAction({type: 'productsEditProductDialog'});
            closeDialogAction({type: 'productsAddEditDigitalProductDialog'});
          }
        },
      },

      deleteProductLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.updateCatalog({oldData: this.responseProductList, index: this.productList.selectIndex});
            closeDialogAction({type: 'productsDeleteProductDialog'});
          }
        },
      },

      updateProducts: {
        handler: function (newVal) {
          if (newVal) {
            this.getPricesheetProducts();
          }
        },
      },
    },

    created () {
      this.getProductsAction();
    },

    methods: {

      // Close dialog ----------------------------------------------------------
      addNewItemproductsDialog: () => toogleDialogAction({type: 'productsDialog'}),

      closePopupproductsDialog: () => toogleDialogAction({type: 'productsDialog'}),

      closePopupproductsEditDialog: () => toogleDialogAction({type: 'productsEditDialog'}),

      closePopupproductsEditProductDialog: () => toogleDialogAction({type: 'productsEditProductDialog'}),

      closePopupproductsDeleteDialog: () => toogleDialogAction({type: 'productsDeleteDialog'}),

      closePopupproductsDeleteProductDialog: () => toogleDialogAction({type: 'productsDeleteProductDialog'}),

      closePopupproductsAddProductDialog: () => toogleDialogAction({type: 'productsAddProductDialog'}),

      closeProductsAddEditDigitalProductDialog: () => toogleDialogAction({type: 'productsAddEditDigitalProductDialog'}),

      closePopupproductsSelfAddProductDialog: () => toogleDialogAction({type: 'productsSelfAddProductDialog'}),

      closePopupproductsBulkMarkupDialog: () => toogleDialogAction({type: 'productsBulkMarkupDialog'}),

      getPricesheetProducts : function () {
        Products.getProductsByLabId(this.productList.currentItem.labID)
          .then(function (resp) {
            if (resp && resp.length !== 0) {
              return resp;
            } else {
              const message = 'Houston we may have some sort of problem - we\'re unable to find any products to add! Please contact support or try again later.';
              openDialogAction({ type: 'errorDialog', data: { message } });
            }
          })
          .then(function (resp) {
            const identityOf = product => product.labProductID || product.productID;
            var allProductsList = resp.products;

            var existingProductids = {};
            _.each(this.currentProductList, function (product) { existingProductids[identityOf(product)] = true; });

            var availableProductTobeAdded = _.filter(allProductsList, function (product) {
              return !existingProductids[identityOf(product)];
            }, this.currentProductList);

            if (availableProductTobeAdded.length === 0) {
              this.allProducts = [];
            } else {
              this.allProducts = availableProductTobeAdded;
            }
          }.bind(this));
      },
    },
  };
</script>
