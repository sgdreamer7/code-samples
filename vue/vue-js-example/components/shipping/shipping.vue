<template>
  <div class="cs-right-panel">
    <div class="store-header">
      <h1>Custom Fulfillment {{title}}</h1>
      <div class="actions-right">
        <div @click="openShippingAddEdit({shippingIndex: undefined})"
           class="cs-button">
          <icon name="icon_create-new"></icon>{{addButtonText}}
        </div>
      </div>
    </div>
    <shipping-list
      :grid-data="gridData"
      :columns="gridColumns"
      :columnsname="gridColumnsName"
      :open-shipping-add-edit="openShippingAddEdit"
      :open-shipping-delete-dialog="openShippingDeleteDialog">
    </shipping-list>
  </div>
</template>

<script>
  import shippingList from 'store/components/shipping/shippingList/shippingList';
  export default {
    components: {
      shippingList,
    },
    props: {
      title: String,
      addButtonText: String,
      gridColumns: Array,
      gridColumnsName: Array,
      gridData: Array,
      openShippingAddEdit: Function,
      openShippingDeleteDialog: Function,
    },
  };
</script>

<style lang="scss" scoped>
@import 'src/global/style/colors';
@import 'src/global/style/store-common';

.store-header {
  margin-top: 0;
}

</style>
