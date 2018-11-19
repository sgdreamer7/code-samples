<template>
  <div class="order-photo-table">
      <div class='table_header'>
          <div class="table-row">
              <div class="table-col details-photo-column photo-table-photo">Photo</div>
              <div class="table-col details-product-column photo-table-name">Product</div>

              <!-- OLD -->
              <div class="table-col details-quantity-column">Quantity</div>
              <div class="table-col details-total-column">Total</div>

              <!-- NEW FEAT -->
              <!-- <div class="table-col details-quantity-column"></div>
              <div class="table-col details-total-column"></div> -->

          </div>
      </div>
      <div class="photo-table">
        <div v-for='product in currentOrder.products' class="table-row">
            <div class='table-col details-photo-column photo-table-photo'>
                <div v-if="product.downloadClass === 'allPhotos'" class="img order-product-thumb-img">
                  <icon class="all-photos-icon" name="download-class-all-cs"></icon>
                </div>
                <div v-else class="img order-product-thumb-img">
                    <svg v-if="currentOrder.fullFilmentOptions === 'Lab Fulfillment' && product.categoryName !== 'Digital'" :id="product.elementID" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image :data-src="product.imageURL" xlink:href="" x="0" y="0" height="100%" width="100%" />
                        <rect x="0" y="0" width="0" height="0"></rect>
                    </svg>
                    <img v-else :src="product.imageURL">
                    <p class="caption" data-toggle="tooltip" data-placement="bottom" :title="product.image.fileName">
                      {{product.image.fileName}}
                    </p>
                </div>
            </div>
            <div class='table-col details-product-column photo-table-name'>
              <div class="product-name">
                {{product.name}}
              </div>
              <div class="product-extrashipping" v-if="parseFloat(product.totalProductExtraShip) && product.categoryName !== 'Digital'">
                + {{formatCurrencyUsaDollar(product.totalProductExtraShip)}}  Extra Shipping
              </div>
              <div class="product-digital" v-if="product.categoryName === 'Digital'">
                <icon name="icon_download"></icon>
                Digital Download
              </div>
            </div>

            <!-- OLD -->
            <div class='table-col details-quantity-column'>{{product.downloadClass === 'allPhotos' ? '' : product.quantity}}</div>
            <div class='table-col details-total-column'>{{formatCurrencyUsaDollar(product.price)}}</div>

            <!-- NEW FEAT -->
            <!-- <div class="table-col photo-table-edit-image">
              <span>
                <icon name="icon_gear">
              </span>
              <span>Edit</span>
            </div>
            <div class="table-col photo-table-download-image">
              <span>
                <icon name="icon_download">
              </span>
              <span>Download</span>
            </div> -->


        </div>

        <!-- OLD -->
        <table class="overviewTable" v-if="currentOrder.fullFilmentOptions !== 'Lab Fulfillment'">
            <tfoot v-if='currentOrder.prettySummary'>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Total price of all purchased items">Sub Total</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.subTotal, orderCurrency)}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Shipping fees charged to the customer">Shipping</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.shipping + currentOrder.prettySummary.extraShipping, orderCurrency)}}</td>
                </tr>
                <tr v-if='currentOrder.prettySummary.discount' class="order-details__breakdown-discount">
                    <td colspan=3>Discount ({{currentOrder.discount.key}})</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.discount, orderCurrency)}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Taxes charged to the customer for this order">Taxes</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.tax, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Total amount charged to the customer">Grand Total</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.grandTotal, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row" v-if="currentOrder.prettySummary.orderCommissionFee">
                    <td></td>
                    <td></td>
                    <td class="merchant-fee-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Merchant and platform fees for credit card processing">Order Commission</td>
                    <td class="merchant-fee-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.orderCommissionFee, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row" v-if="currentOrder.prettySummary.creditCardProcessingFee">
                    <td></td>
                    <td></td>
                    <td class="merchant-fee-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Merchant and platform fees for credit card processing">Transaction Fee</td>
                    <td class="merchant-fee-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.creditCardProcessingFee, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="profit-label hint--left hint--rounded hint--delay-1000"
                      aria-label="Total amount transferred to your account">Total Transferred</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.totalTransferred, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row">
                  <td></td>
                  <td></td>
                  <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                  aria-label="Your cost for shipping">Extra Shipping</td>
                  <td class="cogs-value">-{{formatCurrencyOrderDetails(currentOrder.prettySummary.extraShipping, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row">
                  <td></td>
                  <td></td>
                  <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                  aria-label="Your cost for shipping">Cost Of Shipping</td>
                  <td class="cogs-value">-{{formatCurrencyOrderDetails(currentOrder.prettySummary.shipping, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Taxes collected, but payable to government agencies">Taxes Collected</td>
                    <td class="cogs-value">-{{formatCurrencyOrderDetails(currentOrder.prettySummary.tax, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--top hint--rounded hint--delay-1000"
                      aria-label="Total Profit for this order">Order Profit (before cost of goods)</td>
                    <td class="profit-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.orderProfit, orderCurrency)}}</td>
                </tr>
            </tfoot>
        </table>

        <table class="overviewTable" v-else>
            <tfoot v-if='currentOrder.prettySummary'>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Total price of all purchased items">Sub Total</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.subTotal, orderCurrency)}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Shipping fees charged to the customer">Shipping</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.shipping, orderCurrency)}}</td>
                </tr>
                <tr v-if='currentOrder.prettySummary.discount' class="order-details__breakdown-discount">
                    <td colspan=3>Discount ({{currentOrder.discount.key}})</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.discount, orderCurrency)}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Taxes charged to the customer for this order">Taxes</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.tax, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="hint--left hint--rounded hint--delay-1000"
                      aria-label="Total amount charged to the customer">Grand Total</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.grandTotal, orderCurrency)}}</td>
                </tr>
                <tr v-if="currentOrder.prettySummary.orderCommissionFee" class="store-table-summary-row">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Your cost for all purchased items">Service Fee</td>
                    <td class="cogs-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.orderCommissionFee, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Your cost for all purchased items">Cost of Goods Sold</td>
                    <td class="cogs-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.serviceFee, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Your cost for shipping">Cost Of Shipping</td>
                    <td class="cogs-value">-{{formatCurrencyOrderDetails(currentOrder.prettySummary.shipping, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row" v-if="currentOrder.prettySummary.premiumPackagingFee">
                    <td></td>
                    <td></td>
                    <td class="premium-packaging-lable">Premium Packaging</td>
                    <td class="premium-packaging-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.premiumPackagingFee, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row" v-if="currentOrder.prettySummary.creditCardProcessingFee">
                    <td></td>
                    <td></td>
                    <td class="merchant-fee-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Merchant and platform fees for credit card processing">Transaction Fee</td>
                    <td class="merchant-fee-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.creditCardProcessingFee, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="profit-label hint--left hint--rounded hint--delay-1000"
                      aria-label="Total amount transferred to your account">Total Transferred</td>
                    <td>{{formatCurrencyOrderDetails(currentOrder.prettySummary.totalTransferred, orderCurrency)}}</td>
                </tr>

                <tr class="store-table-summary-row">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Taxes collected, but payable to government agencies">Taxes Collected</td>
                    <td class="cogs-value">-{{formatCurrencyOrderDetails(currentOrder.prettySummary.tax, orderCurrency)}}</td>
                </tr>
                <tr class="store-table-summary-row totals">
                    <td></td>
                    <td></td>
                    <td class="cogs-lable hint--left hint--rounded hint--delay-1000"
                      aria-label="Total Profit for this order">Order Profit</td>
                    <td class="profit-value">{{formatCurrencyOrderDetails(currentOrder.prettySummary.orderProfit, orderCurrency)}}</td>
                </tr>
            </tfoot>
        </table>


    </div>
  </div>
</template>
<script>
  import currencyFormat from 'global/mixins/currencyFormat';

  export default {
    mixins: [currencyFormat],

    props: {
      currentOrder: Object,
    },
    data () {
      return {
        THUMBNAILS_LONG_EDGE_PX: 160,
        THUMBNAILS_SHORT_EDGE_PX: 100,
      };
    },
    watch: {
      currentOrder: {
        handler: function () {
          this.resizeThumbnailsImage(this.currentOrder.products);
        },
        deep: true,
      },
    },
    computed: {
      orderCurrency () {
        return this.currentOrder.applied_currency ? this.currentOrder.applied_currency : 'usd';
      },
    },
    methods: {
      resizeThumbnailsImage: function (products) {
        if (this.currentOrder.fullFilmentOptions === 'Lab Fulfillment') {
          products.forEach(product => {
            this.resizeOnImageLoad(product);
          });
        }
      },

      resizeOnImageLoad: function (product) {
        var self = this;
        var svg = $('#' + product.elementID);
        var svgImage = $('image', svg);
        var svgCropRect = $('rect', svg);
        var strokeWidth = 4;

        var svgImageSrc = product.imageURL;

        // Create new offscreen image to test
        var theImage = new Image();

        theImage.onload = function () {
          //Get accurate measurements from that.
          var imageWidth = theImage.width;
          var imageHeight = theImage.height;

          var svgWidth;
          var svgHeight;

          if (imageWidth > imageHeight) {
            svgWidth = self.THUMBNAILS_LONG_EDGE_PX;
            svgHeight = Math.ceil((self.THUMBNAILS_LONG_EDGE_PX / imageWidth) * imageHeight);
          } else {
            svgWidth = self.THUMBNAILS_SHORT_EDGE_PX;
            svgHeight = Math.ceil((self.THUMBNAILS_SHORT_EDGE_PX / imageWidth) * imageHeight);
          }

          svg.attr({
            'width': svgWidth + 'px',
            'height': svgHeight + 'px',
          });

          var cropRect = {
            x1: product.X * svgWidth,
            y1: product.Y * svgHeight,
            x2: product.OffsetX * svgWidth,
            y2: product.OffsetY * svgHeight,
          };

          svgImage.attr('xlink:href', svgImageSrc);

          svgCropRect
            .css({
              'fill': 'none',
              'stroke': 'aqua',
              'stroke-opacity': '0.9',
              'stroke-width': strokeWidth + 'px',
            })
            .attr({
              'x': (cropRect.x1 + (strokeWidth / 2)) + 'px',
              'y': (cropRect.y1 + (strokeWidth / 2)) + 'px',
              'width': ((cropRect.x2 - cropRect.x1) - strokeWidth) + 'px',
              'height': ((cropRect.y2 - cropRect.y1) - strokeWidth) + 'px',
            });

          theImage = null;
        };

        theImage.src = svgImageSrc;
      },
    },

    ready () {
      this.resizeThumbnailsImage(this.currentOrder.products);
    },
  };
</script>

<style scoped lang="scss">
@import "src/global/style/colors";

.order-photo-table {
  cursor: default;

  .table-row {
    border-bottom: 1px solid $color-cs-keyline;
    width: 100%;
    display: flex;
    align-items: center;

    .table-col {
      padding: 14px 5px;
      text-transform: capitalize;
      flex-grow: 1;

      & .product-digital,
      & .product-extrashipping {
        margin-left: 12px;
        font-size: 12px;
        margin-top: 5px;
      }

      & .product-digital {
        margin-left: 0;
        display: flex;
        align-items: center;

        & svg {
          height: 13px;
          width: 13px;
          margin-right: 5px;
        }
      }

      // sass-lint:disable-block nesting-depth
      &.details-quantity-column,
      &.details-total-column {
        flex-basis: 50px;
        text-align: right;
      }

      &.details-product-column,
      &.details-photo-column {
        flex-basis: 100px;
        flex-grow: 2;
      }

      &.photo-table-edit-image {
        color: #777;
        cursor: pointer;

        & > span {
          vertical-align: middle;
          display: inline-block;
        }
      }

      /* crop rectangle color */
      &.photo-table-photo {
        .caption {
          text-transform: none;
        }

        svg {
          rect {
            stroke: $color-cs-yellow !important;
          }
        }

        .order-product-thumb-img {
          img {
            position: relative;
            max-width: 150px;
            max-height: 150px;
            display: inline-block;
          }

          .all-photos-icon {
            position: relative;
            width: 70px;
            height: 100px;
            display: inline-block;
          }
        }

        p {
          margin-bottom: -5px;
        }
      }

      &.photo-table-download-image {
        color: $color-cs-legacy-blue;
        cursor: pointer;
        padding-left: 15px;

        & > span {
          vertical-align: middle;
          display: inline-block;
        }
      }
    }
  }

  .photo-table {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .table-row {
      // sass-lint:disable-block nesting-depth
      &:hover {
        color: $color-cs-red !important;
        background-color: #eff8f7;
      }

      .table-col {
        &:first-child {
          font-size: 13px;
        }
      }
    }
  }

  .cogs-value,
  .merchant-fee-value,
  .premium-packaging-value {
    color: $color-cs-red;
  }
}
</style>
