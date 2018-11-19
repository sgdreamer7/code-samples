<template>
  <div class="menu-wrapper">
    <menu-item
      v-for="(i, item) in menuItems"
      :item="item">
    </menu-item>
  </div>
</template>

<script>
import menuItem from 'global/components/menuItem/menuItem';

export default {
  components: {
    menuItem,
  },

  props: {
    isNoValidBanking: Boolean,
    hasOrders: Boolean,
  },

  computed : {
    menuItems () {
      let items = [
        { label: 'Orders', icon: 'icon_cart-basket', link: '/store/orders' },
        { label: 'Catalogs', icon: 'icon_product', link: '/store/products' },
        { label: 'Taxes', icon: 'icon_taxes', link: '/store/taxes' },
        { label: 'Shipping', icon: 'icon_shipping', link: '/store/shipping' },
        { label: 'Discount Codes', icon: 'icon_discount', link: '/store/discounts' },
        { label: 'Banking', icon: 'icon_banking', link: '/store/banking', marker: this.isNoValidBanking },
      ];

      if (!this.hasOrders) {
        items.unshift({ label: 'Getting Started', icon: 'star-o', link: '/store/started' });
      }

      return items;
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/global/style/layout-globals';

.menu-wrapper {
  position: relative;
  height: 100%;
}
</style>
