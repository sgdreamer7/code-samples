<template>
  <shipping
    v-if="gridData.length"
    :add-button-text='"Add Shipping Method"'
    :grid-data='gridData'
    :grid-columns='gridColumns'
    :grid-columns-name='gridColumnsName'
    :title='"Shipping"'
    :open-shipping-add-edit="openShippingAddEdit"
    :open-shipping-delete-dialog="openShippingDeleteDialog"
  ></shipping>

  <empty-list
    v-else
    icon='icon_create-new'
    message="Create a Shipping Method"
    button-text="Add Shipping"
    :add-new-item="() => openShippingAddEdit({shippingIndex: undefined})"
  >
  </empty-list>

  <add-shipping
    v-if='shippingAddEdit'
    :grid-data='gridData'
    :current-shipping="dialogData"
    :banking-data="bankingData"
    :showdialog="shippingAddEdit"
    :closepopup="openShippingAddEdit"
    :add-submit='addShippingAction'
    :edit-submit='editShippingAction'
  >
  </add-shipping>

  <delete-dialog
    v-if = "shippingDeleteDialog"
    :showdialog = "shippingDeleteDialog"
    :header = "'Delete Shipping Method'"
    :text="`Are you sure you want to <strong>permanently</strong> delete ${getShippingName}?`"
    :closepopup = "openShippingDeleteDialog"
    :submit = "deleteShippingAction.bind(this, dialogData.shippingId)"
  >
  </delete-dialog>

</template>

<script>
  import shipping from 'store/components/shipping/shipping';
  import addShipping from 'store/components/shipping/addShipping/addShipping';
  import deleteDialog from 'dialogs/components/deleteDialog';
  import emptyList from 'store/components/assets/emptyList/emptyList';
  import { getShippingAction, addShippingAction, editShippingAction, deleteShippingAction } from 'store/vuex/modules/shipping';
  import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

  export default {
    components: {
      shipping,
      addShipping,
      deleteDialog,
      emptyList,
    },
    vuex: {
      getters: {
        gridData: state => state.storeSection.shipping.gridData,
        addEditLoaded: state => state.storeSection.shipping.addEditLoaded,
        deleteLoaded: state => state.storeSection.shipping.deleteLoaded,
      },

      actions: {
        addShippingAction,
        editShippingAction,
        deleteShippingAction,
      },
    },
    data () {
      return {
        gridColumns: ['shippingMethod', 'feePerOrder', 'shipsTo'],
        gridColumnsName: ['Shipping Method', 'Fee Per Order', 'Ships To'],
      };
    },
    computed: {

      // Dialog vuex ----------------------------------------------------------

      shippingAddEdit () {
        return this.$store.state.dialogs.dialogSwitches.shippingAddEdit;
      },

      shippingDeleteDialog () {
        return this.$store.state.dialogs.dialogSwitches.shippingDeleteDialog;
      },

      dialogData () {
        return this.$store.state.dialogs.dialogSwitches.dialogData;
      },

      getShippingName () {
        const shipping = this.gridData.find((value) => value._id === this.dialogData.shippingId);

        return shipping ? shipping.shippingMethodName : '';
      },

      bankingData () {
        return this.$store.state.storeSection.banking.currentBankingData.merchant;
      },
    },
    watch: {
      addEditLoaded: {
        handler: function (newVal) {
          if (newVal) {
            this.openShippingAddEdit({shippingIndex: undefined});
          }
        },
      },
      deleteLoaded: {
        handler: function (newVal) {
          if (newVal) {
            this.openShippingDeleteDialog();
          }
        },
      },
    },

    route: {
      data () {
        getShippingAction(this.$store);
      },

    },

    methods: {
      openShippingAddEdit (data) {
        if (data) {
          toogleDialogAction({type: 'shippingAddEdit', data});
        } else {
          toogleDialogAction({type: 'shippingAddEdit'});
        }
      },
      openShippingDeleteDialog (data) {
        if (data) {
          toogleDialogAction({type: 'shippingDeleteDialog', data});
        } else {
          toogleDialogAction({type: 'shippingDeleteDialog'});
        }
      },
    },
  };
</script>
