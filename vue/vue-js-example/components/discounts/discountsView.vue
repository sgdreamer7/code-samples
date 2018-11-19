<template>
    <discounts
      v-if="discountList.length"
      :discount-list='discountList'
      :current-discount='currentDiscount'
      :current-discount-index='currentDiscountIndex'
      :toogle-dialog='toogleDialog'
    ></discounts>

    <empty-list
      v-else
      icon='icon_create-new'
      message="Create a Discount Code"
      :add-new-item="() => toogleDialog({type: 'discountAddEdit', data: {}})"
    >
    </empty-list>

    <add-edit-discount
      v-if='discountAddEdit'
      :showdialog="discountAddEdit"
      :closepopup="() => toogleDialog({type: 'discountAddEdit'})"
      :add-submit='addDiscountAction'
      :edit-submit='editDiscountAction'
      :discount-data="dialogData"
      :current-discount='discountList[dialogData.index]'
      >
    </add-edit-discount>

    <delete-dialog
      v-if = "discountDelete"
      :showdialog = "discountDelete"
      header = "Delete Discount Code"
      :text="`Are you sure you want to <strong>permanently</strong> delete ${getDiscountName}?`"
      :closepopup = "() => toogleDialog({type: 'discountDelete'})"
      :submit = "deleteDiscountAction.bind(this, {id: dialogData.discount && dialogData.discount._id, index: dialogData.index && dialogData.index})"
    >
    </delete-dialog>
</template>

<script>
  import discounts from 'store/components/discounts/discounts';
  import addEditDiscount from 'store/components/discounts/addEditDiscount/addEditDiscount';
  import deleteDialog from 'dialogs/components/deleteDialog';
  import emptyList from 'store/components/assets/emptyList/emptyList';
  import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';
  import { getUserBillingMethodsAction } from 'global/vuex/modules/user/billing';
  import { openDialogAction } from 'dialogs/vuex/modules/dialogSwitches';
  import {
    getDiscountsAction,
    addDiscountAction,
    editDiscountAction,
    deleteDiscountAction,
  } from 'store/vuex/modules/discounts';

  export default {

    components: {
      discounts,
      addEditDiscount,
      deleteDialog,
      emptyList,
    },

    vuex: {
      getters: {
        discountList: state => state.storeSection.discounts.discountList,
        currentDiscount: state => state.storeSection.discounts.currentDiscount,
        currentDiscountIndex: state => state.storeSection.discounts.currentDiscountIndex,
        addDiscountLoadedCount: state => state.storeSection.discounts.addDiscountLoadedCount,
        editDiscountLoadedCount: state => state.storeSection.discounts.editDiscountLoadedCount,
        deleteDiscountLoadedCount: state => state.storeSection.discounts.deleteDiscountLoadedCount,
        billingMethods: state => state.userData.billing.billingMethods,
      },

      actions: {
        getDiscountsAction,
        addDiscountAction,
        editDiscountAction,
        deleteDiscountAction,
      },
    },

    computed: {
      // Vuex Getters ----------------------------------------------------------

      discountAddEdit () {
        return this.$store.state.dialogs.dialogSwitches.discountAddEdit;
      },

      discountDelete () {
        return this.$store.state.dialogs.dialogSwitches.discountDelete;
      },

      dialogData () {
        return this.$store.state.dialogs.dialogSwitches.dialogData;
      },

      getDiscountName () {
        const discount = this.discountList.find((value) => value._id === this.dialogData.discount._id);

        return discount ? discount.name : '';
      },

    },

    watch: {

      addDiscountLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.toogleDialog({type: 'discountAddEdit'});
          }
        },
      },

      editDiscountLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.toogleDialog({type: 'discountAddEdit'});
          }
        },
      },

      deleteDiscountLoadedCount: {
        handler: function (newVal) {
          if (newVal) {
            this.toogleDialog({type: 'discountDelete'});
          }
        },
      },
    },

    route: {
      data ({ next, abort }) {
        if (this.billingMethods.length > 0) {
          this.getDiscountsAction();

          return next();
        }

        getUserBillingMethodsAction(this.$store)
          .then(billingMethods => {
            if (billingMethods.length > 0) {
              this.getDiscountsAction();

              return next();
            }

            openDialogAction({ type: 'storeHoldOnDialog' });

            return abort();
          });
      },
    },

    methods: {
      toogleDialog (modal) {
        return toogleDialogAction(modal);
      },
    },
  };
</script>
