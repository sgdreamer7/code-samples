<template>
  <table class="overview-table">
      <thead>
          <tr>
              <th class="photo-column">Image</th>
              <th class="product-column">Item</th>
              <th class="quantity-column">Quantity</th>
              <th class="total-column">Total</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for='product in currentOrder.products'>
            <td>
              <p>{{product.imageName}}<p>
            </td>
            <td>{{product.name}}</td>
            <td style="text-align: right;">{{product.quantity}}</td>
            <td style="text-align: right;">{{formatCurrencyUsaDollar(product.price)}}</td>
        </tr>
      </tobody>
      <tfoot v-if='currentOrder.prettySummary'>
          <tr>
              <td></td>
              <td></td>
              <td>Sub Total</td>
              <td>{{currentOrder.prettySummary.subTotal}}</td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td>Shipping</td>
              <td>{{currentOrder.prettySummary.shipping}}</td>
          </tr>
          <tr v-if='currentOrder.summary.discount' class="order-details__breakdown-discount">
              <td colspan=3>Discount ({{currentOrder.discount.key}})</td>
              <td>{{currentOrder.prettySummary.discount}}</td>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td>Taxes</td>
              <td>{{currentOrder.prettySummary.tax}}</td>
          </tr>
          <tr class="store-table-summary-row totals">
              <td></td>
              <td></td>
              <td>Grand Total</td>
              <td>{{currentOrder.prettySummary.grandTotal}}</td>
          </tr>
          <tr class="store-table-summary-row">
              <td></td>
              <td></td>
              <td class="cogs-lable">Cost of Goods Sold</td>
              <td class="cogs-value">{{currentOrder.prettySummary.cogs}}</td>
          </tr>
          <tr class="store-table-summary-row" v-if="currentOrder.premiumPackagingFee">
              <td></td>
              <td></td>
              <td class="premium-packaging-lable">Premium Packaging</td>
              <td class="premium-packaging-value">{{currentOrder.prettySummary.premiumPackagingFee}}</td>
          </tr>
          <tr class="store-table-summary-row" v-if="currentOrder.merchantFeeAmount">
              <td></td>
              <td></td>
              <td class="merchant-fee-lable">Transaction Fee</td>
              <td class="merchant-fee-value">{{currentOrder.prettySummary.merchantFeeAmount}}</td>
          </tr>
          <tr class="store-table-summary-row totals">
              <td></td>
              <td></td>
              <td class="profit-label">Order Profit</td>
              <td class="profit-value">{{currentOrder.prettySummary.profit}}</td>
          </tr>
      </tfoot>
  </table>
</template>
<script>

  export default {
    components: {
    },
    props: {
      currentOrder: Object,
    },
  };
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.order-details__breakdown-discount {
  color: $color-cs-red;
}

.overview-table {
  td {
    padding: 20px 0;
  }
}

.cogs-value,
.merchant-fee-value,
.premium-packaging-value {
  color: $color-cs-red;
}
</style>
