<template>
  <div class="banking__wrap cs-right-panel">
    <div class="profile-settings-header">
      <div>
        <h1>Payment Methods</h1>
      </div>
      <div v-if="settings.storageSettings && settings.storageSettings.storageType == 'free'" class="helper-text">
        Note: With your FREE account, you incur a 15% sales commission
      </div>
    </div>

    <new-banking-account v-if="currentBankingData.merchant && currentBankingData.merchant.type === 'none'">
    </new-banking-account>

    <banking
      v-if="currentBankingData.merchant && currentBankingData.merchant.type === 'braintree'"
      :current-banking-data="currentBankingData"
      :banking-data-loaded="bankingDataLoaded"
      :term-of-sale="termOfSale"
      :term-of-sale-loaded="termOfSaleLoaded"
      :error="error"
      :toogle-dialog="toogleDialog">
    </banking>

    <stripe-account
      v-if="currentBankingData.merchant && currentBankingData.merchant.type === 'stripe' && currenciesList.length"
      :current-banking-data="currentBankingData"
      :banking-data-loaded="bankingDataLoaded"
      :term-of-sale="termOfSale"
      :term-of-sale-loaded="termOfSaleLoaded"
      :error="error"
      :toogle-dialog="toogleDialog"
      :expanded-edit-view="expandedEditView">
    </stripe-account>

    <merchant-agreement
      v-if="showDialog"
      :showdialog="showDialog"
      :closepopup="toogleDialog.bind(this, 'showDialog')">
    </merchant-agreement>

    <disconnect-dialog
      v-if="disconnectDialog"
      :showdialog="disconnectDialog">
    </disconnect-dialog>
  </div>
</template>

<script>
  import newBankingAccount from 'store/components/banking/newBankingAccount';
  import banking from 'store/components/banking/banking';
  import merchantAgreement from 'store/components/banking/merchantAgreement/merchantAgreement';
  import stripeAccount from 'store/components/banking/stripeAccount';
  import disconnectDialog from 'dialogs/components/disconnectDialog';
  import {
    getMerchantInfoAction,
    getTermsOfSaleAction,
  } from 'store/vuex/modules/banking';

  export default {
    components: {
      newBankingAccount,
      banking,
      merchantAgreement,
      stripeAccount,
      disconnectDialog,
    },

    vuex: {
      getters: {
        error: state => state.storeSection.banking.error,
        currentBankingData: state => state.storeSection.banking.currentBankingData,
        bankingDataLoaded: state => state.storeSection.banking.bankingDataLoaded,
        termOfSale: state => state.storeSection.banking.termOfSale,
        termOfSaleLoaded: state => state.storeSection.banking.termOfSaleLoaded,
        settings: state => state.userData.settings.settings,
      },
      actions: {
        getMerchantInfoAction,
        getTermsOfSaleAction,
      },
    },

    data () {
      return {
        showDialog: false,
        expandedEditView: 0,
      };
    },

    created () {
      this.getMerchantInfoAction();
      this.getTermsOfSaleAction();
    },

    computed: {
      // Vuex Getters ----------------------------------------------------------
      currenciesList () {
        return this.$store.state.appData.currency.currenciesList;
      },

      // Computed ----------------------------------------------------------

      disconnectDialog () {
        return this.$store.state.dialogs.dialogSwitches.disconnectDialog;
      },
    },

    methods: {
      toogleDialog (dialog) {
        this[dialog] = !this[dialog];
      },
    },

    route: {
      activate () {
        return this.expandedEditView++;
      },
    },
  };
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.listing-transition {
  position: absolute;
  width: 100%;
}

.listing-enter {
  animation: listing-in 0.25s ease-in;
}

.listing-leave {
  animation: listing-out 0.25s ease-out;
}

.profile-settings-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid $color-cs-keyline;

  .helper-text {
    font-family: Avenir;
    font-size: 14px;
    font-weight: normal;
    font-style: oblique;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    color: $color-cs-dusk;
  }
}

@keyframes listing-in {
  0% {
    opacity: 0;
    transform: translate(-5%);
  }

  100% {
    opacity: 1;
    transform: translate(0%);
  }
}

@keyframes listing-out {
  0% {
    opacity: 1;
    transform: translate(0%);
  }

  100% {
    opacity: 0;
    transform: translate(5%);
  }
}
</style>
