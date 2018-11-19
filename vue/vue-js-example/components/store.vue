<template>
  <div class="store-vue" class="noSelectionHighlight">
    <div class="cs-left-panel">
      <store-menu
        :is-no-valid-banking="isNoValidBanking"
        :has-orders="orders.length > 0"
      ></store-menu>
    </div>
    <div class="store-content">
      <merchant-account-warning v-if="isNoValidBanking && !isBankingPage"></merchant-account-warning>
      <router-view keep-alive></router-view>
    </div>
  </div>
</template>

<script>
  import storeMenu from 'store/components/assets/menu/menu';
  import { getMerchantInfoAction } from 'store/vuex/modules/banking';
  import { setAchivment } from 'global/vuex/modules/onboarding';
  import merchantAccountWarning from 'store/components/merchantAccountWarning';

  export default {
    components: {
      storeMenu,
      merchantAccountWarning,
    },

    data () {
      return {
        firstTime: true,
      };
    },

    vuex: {
      getters: {
        currentBankingData: state => state.storeSection.banking.currentBankingData,
        bankingDataLoaded: state => state.storeSection.banking.bankingDataLoaded,
        orders: state => state.storeSection.orders.ordersList,
      },
      actions: {
        setAchivment,
        getMerchantInfoAction,
      },
    },

    route: {
      data () {
        setAchivment(globalStore, {key:'store', value: true});
        this.getMerchantInfoAction();
      },
    },

    computed: {
      // Dialog vuex ----------------------------------------------------------

      paying () {
        return this.$store.state.userData.settings.paying;
      },

      isNoValidBanking () {
        return !this.currentBankingData.merchant || this.currentBankingData.merchant.type === 'none' || this.currentBankingData.merchant.type === 'braintree';
      },

      isSectionDisabled () {
        return this.isNoValidBanking && this.$route.path.indexOf('banking') === -1 && this.$route.path.indexOf('started') === -1;
      },

      isBankingPage () {
        return this.$route.path.includes('banking');
      },
    },
  };
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';
@import 'src/global/style/layout-globals';

.store-vue {
  width: 100%;
  z-index: 5;
  position: absolute;
  top: $header-bar-height;
  background-color: $color-cs-white;
  /* Using the newer "flex" spec here doesn't allow Orders table content to
  shrink enough, for some reason. The old "box" spec behaves the way we want */
  display: -webkit-box;
  flex-direction: row;
  height: calc(100% - #{$header-bar-height});
}

.cs-left-panel {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  .store-disabled-message {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #816f97;
    background: rgba(#816f97, 0.1);
    font-family: Avenir-Roman;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.2px;

    .heave {
      font-family: Avenir-Heavy;
    }
  }
}

.store-right-panel {
  height: 100%;
  width: 250px;
  padding: 40px 10px 0 0;
  margin: 0;
  opacity: 0;
  flex-grow: 0;
  flex-shrink: 0;

  &.visible {
    opacity: 1;
  }

  &.hide {
    width: inherit;
  }
}

.store-content { // sass-lint:disable-line no-mergeable-selectors
  display: flex;
  flex-grow: 1;
  height: 100%;
  width: calc(100% - #{$sidebar-width-sm});
  position: relative;
  flex-wrap: wrap;

  .locker {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(#fff, 0.6);
    z-index: 100;
  }
}
</style>

<style lang="scss">
.store-content { // sass-lint:disable-line no-mergeable-selectors
  .cs-right-panel {
    padding-bottom: 90px;
  }
}
</style>
