<template>
  <div v-if='1!== "Self Fulfillment"' id="productListContainer">
    <table table id="discountList">
        <thead>
        <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Expires</th>
            <th># Used</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for='(index, discount) in discountsData' class="store-table-row" :data-product-id="discount.productID">
            <td class="product-style">
              {{discount.name}}
            </td>
            <td class="product-cost">
              {{discount.key}}
            </td>
            <td class="product-price">
              {{formatDiscount[index]}}
            </td>
            <td class="product-expire" v-text="discount.expire | date '%x'">
            </td>
            <td class="product-price">
              {{formatUsages[index]}}
            </td>
            <td class="product-edit action-cell" @click='toogleDialog({type: "discountAddEdit", data: {discount: discount, index: index}})'>
              <div class="inline-icon"><icon name="icon_edit"></icon></div>
            </td>
            <td class="product-delete action-cell" @click='toogleDialog({type: "discountDelete", data: {discount: discount, index: index}})'>
              <div class="inline-icon"><icon name="icon_trash"></icon></div>
            </td>
        </tr>

        </tbody>
    </table>
  </div>
</template>

<script>
import numeral from 'numeral';
import { capitalize, isUndefined } from 'lodash';
import currencyFormat from 'global/mixins/currencyFormat';

export default {
  mixins: [currencyFormat],

  computed: {
    formatDiscount () {
      let result = this.discountsData.map((item) => {
        let valueString = (item.format === '$') ? this.formatCurrency(item.value) : numeral(item.value).format('0%');
        let typeString = capitalize(item.type);

        return (valueString + ' off ' + typeString);
      });

      return result;
    },
    formatUsages () {
      let result = this.discountsData.map((item) => {
        let limitLabel = !item.usageLimit ? '-' : item.usageLimit;
        let valueLabel = isUndefined(item.timesUsed) ? 0 : item.timesUsed;

        return (valueLabel + ' / ' + limitLabel);
      });

      return result;
    },
  },
  props: {
    discountsData: Array,
    toogleDialog: Function,
  },
};
</script>

<style lang="scss">
@import 'src/global/style/colors';
@import 'src/global/style/store-common';

.product-delete {
  width: 35px;
}
</style>
