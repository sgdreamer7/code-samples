<template>
  <orders-detail
    v-if="loaded"
    :current-order="currentOrder"
  >
  </orders-detail>
</template>

<script>
  import ordersDetail from 'store/components/orders/ordersDetail/ordersDetail';

  import { getOrderAction, getOrderGetter }from 'store/vuex/modules/orders';

  export default {
    components: {
      ordersDetail,
    },

    vuex: {
      getters: {
        currentOrder: getOrderGetter,
      },

      actions: {
        getOrderAction,
      },
    },

    data () {
      return {
        loaded: false,
      };
    },

    route: {
      data () {
        this.loaded = false;

        return this.getOrderAction(this.$route.params.orderid)
          .then(() => this.loaded = true);
      },
    },
  };
</script>
