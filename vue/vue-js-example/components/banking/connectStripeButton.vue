<template>
  <div class="stripe-connect">
    <div class="button" @click="getStripeCode('login')">
      <div v-text="express ? 'Create Express Stripe Account' : 'Connect to Stripe'"></div>
    </div>
  </div>
</template>

<script>
import { connectToStripeAction, connectToStripeExpressAction } from 'store/vuex/modules/banking';
import { checkOnboarding } from 'global/vuex/modules/onboarding';

export default {
  props: {
    express: {
      type: Boolean,
      default: false,
    },
    affiliate: {
      type: String,
      default: false,
    },
  },

  computed: {
    baseUrl () {
      return window.location.href.split('/').slice(0, 3).join('/');
    },
    stripeUrl () {
      // HACK:(dk) forgive me code gods for doing this
      return this.express
        ? `${appConfiguration.AFFILIATE_URL}affiliates/${this.affiliate}/payment/stripe-connect/authorize?stripe_landing=`
        : 'https://connect.stripe.com/oauth/authorize?scope=read_write&response_type=code&stripe_landing=';
    },
  },

  methods: {
    getStripeCode (stripe_landing) {
      const {
        clientId,
        redirectUrl,
      } = appConfiguration.STRIPE;
      let authUrl = `${this.stripeUrl}${stripe_landing}&client_id=${clientId}`;

      let codeReceived = (e) => {
        const {stripeCode} = e.data;
        if (stripeCode) {
          setTimeout(() => {
            const connect = this.express
              ? connectToStripeExpressAction
              : connectToStripeAction;
            connect(this.$store, stripeCode)
              .then(() => checkOnboarding(this.$store));
          }, 0);
          win.close(true);
          window.removeEventListener('message', codeReceived);
        }
      };

      if (window.location.protocol.startsWith('http')) {
        authUrl += `&redirect_uri=${this.baseUrl}/stripe`;
        window.addEventListener('message', codeReceived, false);
      }
      let win = window.open(authUrl, {
        'width': 640,
        'height': 740,
        'position': 'center',
        'focus': true,
        'always_on_top': true,
      }, (win) => { // for nwjs
        win.on('document-end', () => {
          const frame = win.window;

          if (frame.location.href && frame.location.href.startsWith(redirectUrl)) {
            const code = /code=([^&]+)/.exec(frame.location.href);

            if (code && code[1]) {
              codeReceived({data: code[1]});
            }

            win.close(true);
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.button {
  background: $color-cs-bright-lavender;
  color: $color-cs-white;
  padding: 13px 25px;
  transition: transform 0.2s;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.2px;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>
