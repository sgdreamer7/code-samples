<template lang="html">
  <div class="select-order-status" :class="inheritPlaceholderColor && statusClass">
    <v-select
      :selected="selected ? orderStatus : null"
      :options="statuses"
      :searchable="false"
      :show-labels="false"
      :placeholder="placeholder"
      :placeholder-icon="placeholderIcon.length ? placeholderIcon : statusIcon"
      :no-input="false"
      :icons="true"
      :action="true"
      label="displayName"
      key="_id"
      >
    </v-select>
  </div>
</template>

<script>
import vSelect from 'global/components/select';

import { changeOrderStatusAction } from 'store/vuex/modules/orders';

export default {
  components: {
    vSelect,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Select Status',
    },
    placeholderIcon: {
      type: String,
      default: '',
    },
    inheritPlaceholderColor: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      statusIcon: '',
      statusClass: '',
    };
  },

  computed: {
    orderStatuses () {
      if (this.order.selfFulfillment) {
        return this.$store.state.storeSection.orders.statuses.filter(item => item.class === 'custom');
      }

      return this.$store.state.storeSection.orders.statuses.filter(item => item.class === 'auto');
    },

    orderStatus () {
      if (this.order.statusId) {
        const status = this.statuses.find((status) => status._id === this.order.statusId);

        return status || null;
      }

      if (this.order.status) {
        const status = this.statuses.find((status) => status.displayName === this.order.status);

        return status || null;
      }

      return null;
    },

    statuses () {
      const statuses = this.orderStatuses.map((status, index) => {
        return Object.assign(
          {},
          status,
          {
            customClass: `select-${status.displayName.toLowerCase()}`,
            click: this.changeStatus.bind(this, index),
          });
      });
      this.updateComponentData(statuses);

      return statuses;
    },

    changeOrderStatusAction () {
      return changeOrderStatusAction.bind(this, this.$store);
    },
  },

  watch: {
    order () {
      this.updateComponentData();
    },
  },

  methods: {
    changeStatus (index) {
      const val = this.statuses[index];
      if (val) {
        this.selectStatus(this.order, val);
      }
    },

    selectStatus (order, newStatus) {
      this.changeOrderStatusAction({order, requestData: {orderId: order._id, status: newStatus.displayName, statusId: newStatus._id}})
        .then(() => {
          this.statusIcon = newStatus.icon;
          this.statusClass = newStatus.customClass;
        });
    },

    updateComponentData (statuses) {
      const currentStatuses = statuses || this.statuses;
      const currentStatus = currentStatuses.find(status => this.order.status ? status.displayName === this.order.status : status._id === this.order.statusId);
      this.statusIcon = currentStatus ? currentStatus.icon : '';
      this.statusClass = currentStatus ? currentStatus.customClass : '';
    },
  },
};
</script>

<style lang="scss">
@import 'src/global/style/colors';

.select-pending {
  color: $color-cs-teal;
}

.select-processing {
  color: #9e7da6;
}

.select-completed,
.select-shipping,
.select-shipped {
  color: #67c694;
}

.select-received {
  color: #ffc845;
}

.select-cancelled {
  color: $color-cs-red;
}

.select-order-status {
  .multiselect-wrapper {
    max-width: 150px;
    background-color: transparent;
  }

  .multiselect-single,
  .multiselect-tags {
    padding-left: 0;
  }

  .multiselect-select {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-cs-dark-text;
    border: none;

    .fa-icon {
      width: 12px;
    }
  }

  .multiselect-icon {
    margin-right: 0.4rem;
  }

  .multiselect-single {
    .multiselect-icon {
      svg {
        margin: 0;
      }
    }
  }
}
</style>
