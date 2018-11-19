<template>
  <div class="digital-status-wrapper">
    <div class="digital-status" :class="order.digitalOrderStatus.toLowerCase()">
      <icon class="status-icon" :name="iconName"></icon>
      <span class="status-name">{{order.digitalOrderStatus}}</span>
    </div>
    <div
    v-if="resend && order.digitalOrderStatus === 'failed'"
    class="resend"
    @click="resendDigitalProducts(order)">
    ( click here to resend )
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
    resend: {
      type: Boolean,
      default: false,
    },
    resendDigitalProducts: {
      type: Function,
      default: () => {},
    },
  },

  computed: {
    iconName () {
      switch (this.order.digitalOrderStatus.toLowerCase()) {
      case 'processing':
        return 'repeat-cs';
      case 'sending':
        return 'icon_share-airplane';
      case 'delivered':
        return 'icon_share-airplane';
      case 'failed':
        return 'circle_delete-cs';
      default:
        return 'icon_share-airplane';
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.digital-status {
  display: flex;
  align-items: center;
  height: 37px;

  .status-name {
    text-transform: capitalize;
  }

  .status-icon {
    height: 14px;
    position: relative;
    top: -1px;
    margin-right: 10px;
  }

  &.processing {
    color: #9e7da6;
  }

  &.sending,
  &.delivered {
    color: #67c694;
  }

  &.failed {
    color: $color-cs-red;
  }
}

.resend {
  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}
</style>
