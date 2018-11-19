<template>
  <div class="stripe-page pages">
    <div class="stripe-wrapper">
      <div class="stripe-view">
        <div class="stripe-info">
          <icon class="stripe-connect-icon" name="stripe-logo-cs" scale="5.3"></icon>
          The safest and easiest way to accept online payments
        </div>
        <div v-if="!editStripe">
          <button @click="editStripeAccount()" type="button" class="btn edit-btn">
            Edit Stripe
          </button>

          <button @click="disconnectStripe()" type="button" class="btn red-btn">
            Disconnect Stripe
          </button>
        </div>

        <div v-if="editStripe">
          <button @click="cancelEditStripeAccount()" type="button" class="btn edit-btn">
            Cancel
          </button>

          <button @click="updateTermsOfSale()" type="button" class="cs-button" :disabled="!editStatus">
            Save
          </button>

        </div>
      </div>

      <div v-if="editStripe" class="stripe-body">
        <div class="stripe-row">
          <div>
            <span>Name:</span> {{ form.displayName }}
          </div>

          <div>
            <span>Account Email:</span> {{ form.accountEmail }}
          </div>

          <div>
            <span>Country:</span> {{ form.country }}
          </div>
        </div>

        <div v-if="currenciesList && currencySelected" class="stripe-row">
          <span>Currency</span>
            <v-select
              class="select-category"
              :selected="currencySelected"
              :options="currenciesList"
              :searchable="false"
              :show-labels="false"
              placeholder="Select currency"
              key="code"
              label="displayName"
              @select="confirmChangeCurrecy">
            </v-select>
        </div>

        <terms-of-sale v-if="termOfSaleLoaded"
          :term-of-sale="termOfSale"
          :form-of-sale="formOfSale"
          :without-button="true">
        </terms-of-sale>
      </div>
    </div>
  </div>
</template>

<script>
import bankingSubMerchant from 'store/components/banking/bankingSubMerchant/bankingSubMerchant';
import termsOfSale from 'store/components/banking/termsOfSale/termsOfSale';
import vSelect from 'global/components/select/select';
import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
import { openDialogAction, closeDialogAction } from 'dialogs/vuex/modules/dialogSwitches';
import { updateUserCurrencyAction } from 'global/vuex/modules/user/user';
import { updateTermsOfSaleAction } from 'store/vuex/modules/banking';

export default {
  components: {
    vSelect,
    bankingSubMerchant,
    termsOfSale,
    knowledgeBaseEntry,
  },

  props: {
    bankingData: Array,
    currentBankingData: Object,
    currentBankingIndex: Number,
    bankingDataLoaded: Number,
    switchBanking: Function,
    termOfSale: Object,
    termOfSaleLoaded: Boolean,
    addMerchant: Function,
    updateMerchantInfo: Function,
    updateTermsOfSale: Function,
    toogleDialog: Function,
    error: String,
    expandedEditView: Number,
  },

  data () {
    return {
      currencySelected: '',
      editStripe: false,
      formOfSale: {},
    };
  },

  vuex: {
    actions: {
      openDialogAction,
      closeDialogAction,
      updateUserCurrencyAction,
      updateTermsOfSaleAction,
    },
  },

  computed: {
    // Vuex Getters ----------------------------------------------------------

    merchant () {
      return this.$store.state.storeSection.banking.currentBankingData.merchant;
    },

    merchantAccountInfo () {
      return this.$store.state.userData.user.data.accountingInfo.merchant;
    },

    currenciesList () {
      return this.$store.state.appData.currency.currenciesList;
    },

    currentCurrenciesInfo () {
      return this.$store.state.appData.currency.currentCurrenciesInfo;
    },

    // Computed ----------------------------------------------------------

    confirmMessage () {
      if (this.currencySelected.code && this.currencySelected.code.toLowerCase() === 'usd') {
        return 'Please review all your store prices and discounts after selecting a new currency, to ensure prices are accurate for the new currency.';
      } else {
        return `Auto-Fulfillment is only available in USD. If you set your store currency to ${this.currencySelected.name}, online sales will be disabled for any galleries with auto-fulfillment catalogs selected, and you'll need to select a new catalog for those galleries.

Please review all your store prices and discounts after selecting a new currency, to ensure prices are accurate for the new currency`;
      }
    },

    form () {
      return {
        displayName: this.merchant.display_name,
        accountEmail: this.merchant.email,
        country: this.merchant.country,
      };
    },

    editStatus () {
      if (this.merchantAccountInfo.currency !== this.currencySelected.code) {
        return true;
      }
      if (this.termOfSale.termsAndSaleInfo) {
        return this.termOfSale.termsAndSaleInfo.localeCompare(this.formOfSale.termsOfSale);
      }
      if (this.formOfSale.termsOfSale !== '' && this.formOfSale.termsOfSale !== undefined) {
        return true;
      }

      return false;
    },
  },

  watch: {
    termOfSale () {
      return Vue.set(this.formOfSale, 'termsOfSale', this.termOfSale.termsAndSaleInfo);
    },

    expandedEditView () {
      this.editStripe = false;
      this.currencySelected = this.currentCurrenciesInfo;
      this.formOfSale.termsOfSale = this.termOfSale.termsAndSaleInfo;
    },
  },

  methods: {
    disconnectStripe () {
      openDialogAction({type: 'disconnectDialog'});
    },

    editStripeAccount () {
      // window.oldAppUtils.navigateToUrl('https://dashboard.stripe.com/');
      this.editStripe = true;
    },

    cancelEditStripeAccount () {
      this.editStripe = false;
      this.currencySelected = this.currentCurrenciesInfo;
      this.formOfSale.termsOfSale = this.termOfSale.termsAndSaleInfo;
    },

    updateCurrency (newCurrency) {
      if (newCurrency.code !== this.merchantAccountInfo.currency) {
        this.updateUserCurrencyAction(newCurrency);
        closeDialogAction({ type: 'confirmDialog' });
      } else {
        this.cancelUpdateCurrency();
      }
    },

    confirmChangeCurrecy (newCurrency) {
      openDialogAction({type: 'confirmDialog', data: {
        header: 'Change Currency?',
        message: this.confirmMessage,
        close: this.cancelUpdateCurrency,
        submit: () => {
          this.currencySelected = newCurrency;
          closeDialogAction({ type: 'confirmDialog' });
        },
      } });
    },

    cancelUpdateCurrency () {
      this.currencySelected = Object.assign({}, this.currentCurrenciesInfo);
      closeDialogAction({ type: 'confirmDialog' });
    },

    updateTermsOfSale () {
      this.updateCurrency(this.currencySelected);
      this.updateTermsOfSaleAction(this.formOfSale);
      this.editStripe = false;
    },
  },

  created () {
    Vue.set(this.formOfSale, 'termsOfSale', this.termOfSale.termsAndSaleInfo);
    this.currencySelected = this.currentCurrenciesInfo;
  },
};
</script>

<style lang="scss" scoped>
@import 'src/global/style/colors';
@import 'src/global/style/stripe';

.set-banking-account {
  width: 425px;
  margin-left: 20px;
  margin-bottom: 10px;
  float: left;
}
</style>
