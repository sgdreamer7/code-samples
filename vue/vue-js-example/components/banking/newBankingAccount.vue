<template>
  <div class="new-account" :class="{'has-indent': salesSection}">
    <div class="stripe-wrapper">
      <div class="stripe-view">
        <div class="stripe-info">
          <icon class="stripe-connect-icon" name="stripe-logo-cs" scale="5.3"></icon>
          {{description}}
          <span v-if="salesSection" @click="learnAboutJumpToStripe"> &nbsp;Learn More</span>
        </div>
        <connect-stripe-button></connect-stripe-button>
      </div>
    </div>
  </div>
</template>

<script>
import connectStripeButton from 'store/components/banking/connectStripeButton';

export default {
  components: {
    connectStripeButton,
  },
  props: {
    header: {
      type: String,
      default: 'Connect Your Stripe Account',
    },
    description: {
      type: String,
      default: 'The safest and easiest way to accept online payments',
    },
    type: {
      type: String,
      default: 'new',
    },
    learnMore: {
      type: String,
      default: '',
    },
    salesSection: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    knowledge () {
      return this.$store.state.appData.knowledge.entries;
    },
  },
  methods: {
    learnAboutJumpToStripe () {
      const key = 'store.banking.braintree-deprecation.learn-more';
      const url = this.knowledge.has(key) ? this.knowledge.get(key).url : 'https://help.example.com';
      window.oldAppUtils.navigateToUrl(url);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/global/style/colors";
@import "src/global/style/stripe";
@import "src/global/style/breakpoints";

.new-account {
  padding: 40px 0;
  width: 100%;

  &.has-indent {
    padding: 40px;
  }
}

@media (max-width: $breakpoint-sm) {
  .new-account {
    &.has-indent {
      padding: 20px;
    }
  }
}
</style>
