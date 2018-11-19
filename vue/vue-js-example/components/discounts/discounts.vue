<template>
  <div v-if='discountList.length !== 0' class="cs-right-panel" data-name=".discounts">
    <div class="store-header">
      <h1>Discount Codes</h1>
      <div class="actions-right">
        <div @click='toogleDialog({type: "discountAddEdit"})' class="cs-button">
          <icon class="add-discount-icon" name="icon_create-new" scale="1.125"></icon>
          Add Discount Code
        </div>
      </div>
    </div>
    <div class="store-table">
      <discount-list
       :discounts-data='discountList'
       :toogle-dialog='toogleDialog'
      >
      </discount-list>
    </div>
  </div>
</template>

<script>
import discountList from 'store/components/discounts/discountsList/discountsList';
import vSelect from 'global/components/select/select';

export default {
  components: {
    discountList,
    vSelect,
  },
  props: {
    discountList: Array,
    currentDiscount: Object,
    currentDiscountIndex: Number,
    toogleDialog: Function,
  },
};
</script>

<style scoped lang="scss">
@import 'src/global/style/store-common';

.store-header {
  margin: 0 0 30px;
}

.add-discount-icon {
  width: 18px;
  height: 18px;
}
</style>
