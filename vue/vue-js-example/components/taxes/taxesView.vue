<template>
  <taxes
    v-if="currentTaxes"
    :taxes-list = "taxesList"
    :swich-taxes = "swichTaxesAction"
    :current-taxes = "currentTaxes"
    :current-taxes-index = "currentTaxesIndex"
    :regions = "filtredRegions"
  >
  </taxes>

  <empty-list
    v-else
    icon='icon_create-new'
    message="Add a Tax Rate"
    :add-new-item="addNewItem"
  >
  </empty-list>

  <delete-dialog
    v-if = "taxesDeleteRegionDialog"
    :showdialog = "taxesDeleteRegionDialog"
    :header = "'Delete Tax Region Rate'"
    :text = "'Are you sure you want to <strong>permanently</strong> delete this item?'"
    :closepopup = "closeTaxesDeleteRegionDialog"
    :submit = "deleteRegionTaxAction.bind(this, { taxId: dialogData.taxID, regionTaxId: dialogData.regionTaxID })"
  >
  </delete-dialog>

  <delete-dialog
    v-if = "taxesDeleteTaxDialog"
    :showdialog = "taxesDeleteTaxDialog"
    :header = "'Delete Tax Rate'"
    :text="`Are you sure you want to <strong>permanently</strong> delete ${currentTaxes.country}?`"
    :closepopup = "closeTaxesDeleteTaxDialog"
    :submit = "currentTaxes && deleteTaxAction.bind(this, currentTaxes._id)"
  >
  </delete-dialog>

  <add-region-dialog
    v-if = "taxesAddRegionDialog"
    :showdialog = "taxesAddRegionDialog"
    :closepopup = "closeTaxesAddRegionDialog"
    :current-taxes = "currentTaxes"
    :dialog-data = "typeof dialogData === 'object' ? dialogData : {}"
    :regions = "filtredRegions"
    :all-regions = "currentRegionsList"
    :submit = "addRegionAction"
    :type="'region'"
  >
  </add-region-dialog>

  <add-region-dialog
    v-if = "taxesAddEditTaxDialog"
    :showdialog = "taxesAddEditTaxDialog"
    :closepopup = "closeTaxesAddEditTaxDialog"
    :current-taxes = "currentTaxes"
    :dialog-data = "typeof dialogData === 'object' ? dialogData : {}"
    :regions = "filtredCountry"
    :all-regions = "country"
    :submit = "addTaxAction"
    :edit-submit = "editTaxesAction"
    :type="'tax'"
  >
  </add-region-dialog>
</template>

<script>
  import _ from 'lodash';
  import taxes from 'store/components/taxes/taxes';
  import deleteDialog from 'dialogs/components/deleteDialog';
  import addRegionDialog from 'store/components/taxes/addRegionDialog/addRegionDialog';
  import emptyList from 'store/components/assets/emptyList/emptyList';
  import {
    getTaxesAction,
    swichTaxesAction,
    deleteRegionTaxAction,
    addRegionAction,
    addTaxAction,
    editTaxesAction,
    deleteTaxAction,
  } from 'store/vuex/modules/taxes';
  import {
    getCountryRegionAction,
    getCountry,
  } from 'store/vuex/modules/assets';

  import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

  export default {
    components: {
      taxes,
      deleteDialog,
      addRegionDialog,
      emptyList,
    },
    vuex: {
      getters: {
        taxesList: state => state.storeSection.taxes.taxesList,
        currentTaxes: state => state.storeSection.taxes.currentTaxes,
        currentTaxesIndex: state => state.storeSection.taxes.currentTaxesIndex,

        addEditRegionLoaded: state => state.storeSection.taxes.addEditRegionLoaded,
        deleteRegionLoaded: state => state.storeSection.taxes.deleteRegionLoaded,
        deleteTaxLoaded: state => state.storeSection.taxes.deleteTaxLoaded,
        addEditLoaded: state => state.storeSection.taxes.addEditLoaded,

        currentRegionsList: state => state.storeSection.assets.currentRegionsList,
        loadedCountryId: state => state.storeSection.assets.loadedCountryId,
        country: state => state.storeSection.assets.country,
      },

      actions: {
        getTaxesAction,
        swichTaxesAction,
        deleteRegionTaxAction,
        getCountryRegionAction,
        addRegionAction,
        getCountry,
        addTaxAction,
        editTaxesAction,
        deleteTaxAction,
      },
    },
    computed: {

      // Dialog vuex ----------------------------------------------------------

      taxesDeleteTaxDialog () {
        return this.$store.state.dialogs.dialogSwitches.taxesDeleteTaxDialog;
      },

      taxesDeleteRegionDialog () {
        return this.$store.state.dialogs.dialogSwitches.taxesDeleteRegionDialog;
      },

      taxesAddEditTaxDialog () {
        return this.$store.state.dialogs.dialogSwitches.taxesAddEditTaxDialog;
      },

      taxesAddRegionDialog () {
        return this.$store.state.dialogs.dialogSwitches.taxesAddRegionDialog;
      },

      dialogData () {
        return this.$store.state.dialogs.dialogSwitches.dialogData;
      },

      // Computed ----------------------------------------------------------
      filtredCountry: function () {
        let existingCountries = _.map(this.taxesList, 'countryCode');
        let data = this.country.map(function (simpleCountry) {
          if (!_.includes(existingCountries, simpleCountry.code)) {
            return simpleCountry;
          } else {
            return null;
          }
        });

        return _.compact(data);
      },

      filtredRegions: function () {
        let existingRegions = _.map(this.currentTaxes.regionTax, 'stateCode');
        let data = this.currentRegionsList.map(function (region) {
          if (!_.includes(existingRegions, region.code)) {
            return region;
          } else {
            return null;
          }
        });

        return _.compact(data);
      },
    },

    watch: {
      currentTaxes: {
        handler: function (newValue) {
          if (newValue) {
            this.getCountryRegionAction(newValue.countryID);
          }
        },
      },

      addEditRegionLoaded: {
        handler: function (newValue) {
          if (newValue) {
            this.closeTaxesAddRegionDialog();
          }
        },
      },

      deleteRegionLoaded: {
        handler: function (newValue) {
          if (newValue) {
            this.closeTaxesDeleteRegionDialog();
          }
        },
      },

      deleteTaxLoaded: {
        handler: function (newValue) {
          if (newValue) {
            this.closeTaxesDeleteTaxDialog();
          }
        },
      },

      addEditLoaded: {
        handler: function (newValue) {
          if (newValue) {
            this.closeTaxesAddEditTaxDialog();
          }
        },
      },
    },

    methods: {
      addNewItem () {
        toogleDialogAction({type: 'taxesAddEditTaxDialog', data: 'add'});
      },

      closeTaxesAddRegionDialog () {
        toogleDialogAction({type: 'taxesAddRegionDialog'});
      },

      closeTaxesDeleteRegionDialog () {
        toogleDialogAction({type: 'taxesDeleteRegionDialog'});
      },

      closeTaxesDeleteTaxDialog () {
        toogleDialogAction({type: 'taxesDeleteTaxDialog'});
      },

      closeTaxesAddEditTaxDialog () {
        toogleDialogAction({type: 'taxesAddEditTaxDialog'});
      },
    },

    created () {
      this.getTaxesAction();
      this.getCountry();
    },
  };
</script>
