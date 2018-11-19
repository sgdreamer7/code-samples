<template>
  <div class="cs-right-panel" data-name="orders" style="display: block;">
    <div class="orders-container">
      <orders-list :orders-data='ordersList'>
      </orders-list>
    </div>
  </div>
</template>

<script>
  import ordersList from 'store/components/orders/ordersList/ordersList';

  import { getOrdersAction, getOrderstListGetter } from 'store/vuex/modules/orders';

  export default {
    components: {
      ordersList,
    },

    vuex: {
      getters: {
        ordersList: getOrderstListGetter,
      },
      actions: {
        getOrdersAction,
      },
    },

    route: {
      activate () {
        Busy.show();

        return this.getOrdersAction()
          .then(() => Busy.hide());
      },
    },
  };
</script>

<style scoped lang="scss">

.orders-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
