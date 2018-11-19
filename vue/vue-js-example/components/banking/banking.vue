<template>
  <div class="pages" style="display: block;">
    <div class="pages-style">
      <div class="banking-body">
        <new-banking-account
          header="We now use Stripe"
          :description="braintreeDeprecationMessage"
          type="old"
          learnMore="">
        </new-banking-account>

        <div class="account-details">
          <banking-sub-merchant
            :merchant-info="currentBankingData.merchant.basicInfo"
            :merchant-id="currentBankingData.merchant.merchantInfo.id"
            :add-new-status="false"
            :greyed-out="false"
            :approval-status="false"
            :term-of-sale="termOfSale"
            :term-of-sale-loaded="termOfSaleLoaded"
            :toogle-dialog="toogleDialog">
          </banking-sub-merchant>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bankingSubMerchant from 'store/components/banking/bankingSubMerchant/bankingSubMerchant';
import newBankingAccount from 'store/components/banking/newBankingAccount';

export default {
  components: {
    bankingSubMerchant,
    newBankingAccount,
  },

  props: {
    currentBankingData: Object,
    bankingDataLoaded: Number,
    termOfSale: Object,
    termOfSaleLoaded: Boolean,
    updateTermsOfSale: Function,
    toogleDialog: Function,
    error: String,
  },

  data () {
    return {
      braintreeDeprecationMessage: `After September 1, 2017, a connected Stripe account will be REQUIRED for online \
      sales. Please connect a Stripe account as soon as possible.`,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/global/style/colors";

.banking-body {
  height: 100%;
  overflow-y: auto;
  /* Some child element is causing an overflow and I can't figure out which
     because the DOM layout is a mess, so this stops x-scroll */
  overflow-x: hidden;
}

.account-details {
  padding: 10px 40px 40px;
}

.banking-page {
  display: none;

  .btn {
    margin: 0 8px;
  }
}
</style>
