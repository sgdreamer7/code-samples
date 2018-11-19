<template>
  <div class="particular-order store-leftpanel">
    <div class="order-detail-print-logo">
      <svg class="icons-head">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg__logo1"></use>
      </svg>
    </div>

    <h1>Orders</h1>

    <div class="particular-order-details">
      <div class="info-item">
        <h3>Order #</h3>
        <p class="order-id common">{{currentOrder.orderNumber}}</p>
      </div>

      <div v-if="!currentOrder.onlyDigital" class="info-item order-status">
        <h3>Order Status</h3>
        <select-order-status
          v-ref:select-order-status
          :class="{'disabled': !currentOrder.selfFulfillment}"
          :order="currentOrder"
          :inherit-placeholder-color="true"
          :class="select-order-status">
        </select-order-status>
        <span class="tracking-info" v-if="delivering" @click="trackDelivery()">View tracking info</span>
      </div>

      <div class="info-item" v-if="currentOrder.digitalOrderStatus">
        <h3>Digital Files</h3>
        <digital-status :order="currentOrder" :resend="true" :resend-digital-products="resendDigitalProducts">
        </digital-status>
      </div>

      <div class="info-item">
        <h3>Gallery Name</h3>
        <p class="order-collection common">{{currentOrder.onlineGalleryName}}</p>
      </div>

      <div class="info-item">
        <h3>Date</h3>
        <p class="order-date common">{{currentOrder.createdDate | date '%x'}}</p>
      </div>

      <div class="info-item" v-if="!currentOrder.selfFulfillment && !currentOrder.onlyDigital">
        <h3>Lab</h3>
        <p class="order-lab common">{{currentOrder.labName}}</p>
      </div>

      <div v-if="currentOrder.shippingMethod" class="info-item">
        <h3>Shipping Method</h3>
        <p class="order-shipping-method common">{{currentOrder.shippingMethod.AttributeName || currentOrder.shippingMethod.shippingMethodName}}</p>
      </div>

      <div v-if="processorType === 'braintree'" class="info-item">
        <h3>Profits</h3>
        <p class="order-profit-status common">{{currentOrder.profitStatus}}</p>
      </div>
    </div>
  </div>
  <div class="particular-order-details cs-right-panel">
    <div>
      <a v-link='{path: "/store/orders"}'>
        <div class="cs-button">
          <icon name="svg__gallery-arrow-open" scale="1.125" flip="horizontal"></icon>
          Back to Orders
        </div>
      </a>

      <div class="details-actions">
        <div class="details-action">
          <v-select :selected="null" :action="true" :options="actions" label='label' :searchable="false" :show-labels="false" placeholder="Order options" :icons="true" placeholder-icon="icon_gear"></v-select>
        </div>
        <!-- FUTURE
        <div v-if='currentOrder.selfFulfillment' class="submit-order" :class="{disabled: completeStatus && (currentOrder.status === completeStatus.displayName || currentOrder.statusId === completeStatus._id)}">
          <progress-button
            v-ref:progress-button
            class="submit-order-button"
            :state="progressState"
            :on-click="selectCompleteStatus"
            :label="completeStatus && (currentOrder.status === completeStatus.displayName || currentOrder.statusId === completeStatus._id) ? 'Submited' : 'Submit order'"
            label-success="Order sent"
            label-error="ERROR!"
            default-icon="icon_cart-basket">
          </progress-button>
        </div> -->
      </div>
    </div>

    <!-- OLD -->
    <div class="address old">
      <div v-for='address in currentOrder.address' :class="{'billing-add old': address.billingType, 'shipping-add old': !address.billingType}">
        <div v-if="address.billingType || !currentOrder.onlyDigital">
          <p class="address-title">
            <span v-if="address.billingType">
              Billing Address
            </span>
            <span v-else>
              Shipping Address
            </span>
            <span @click="addToContact(address)" class="save-to-contacts hint--bottom hint--rounded hint--delay-1000" aria-label="Add as a New Contact">
              <icon name="icon_friend" :scale="1.5"></icon>
            </span>
          </p>
          <div class="can-select">
            <p>{{address.fullName}}</p>
            <p>{{address.addressLine1}}</p>
            <p v-if='address.addressLine2'>{{address.addressLine2}}</p>
            <p>{{address.city}}, {{address.zipCode}}</p>
            <p>{{address.state}}, {{address.country}}</p>
            <p class="address-end email">
              <span class="detail-email-span">{{address.email}}</span>
              <span @click='sendEmail($event, address.email)' class="detail-email-icon"><icon name="icon_envelope-mail" scale="1"></icon></span>
            </p>
            <p>{{address.phone}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="store-table store-final-table">
      <photo-table :current-order="currentOrder">
      </photo-table>
    </div>

    <!-- NEW FEAT -->
    <!-- <tabs :active="0" nav-style="order-detail-tabs" class="order-detail-tabs-wrapper">
      <div slot="afterNav" class="order-detail-tabs-after-nav">
        <icon name="icon_cart-basket" scale="1.8"></icon>
        <span>#{{currentOrder.orderNumber}}</span>
      </div>

      <tab header="Overview" icon="icon_order">
        <div class="address">
          <div v-for='address in currentOrder.address' v-if='address.billingType' class="billing-add">
            <p class="address-title">
              <span>
                Billing Address
              </span>
              <span @click="addToContactsAction([{email: address.email}])" class="save-to-contacts hint--bottom hint--rounded hint--delay-1000" aria-label="Add as a New Contact">
                <icon name="icon_friend" :scale="1.5"></icon>
              </span>
            </p>
            <p>{{address.fullName}}</p>
            <p>{{address.addressLine1}}</p>
            <p v-if='address.addressLine2'>{{address.addressLine2}}</p>
            <p>{{address.city}}, {{address.zipCode}}</p>
            <p>{{address.state}}, {{address.country}}</p>
            <p class="address-end email">
              <span class="detail-email-span">{{address.email}}</span>
              <span @click='sendEmail($event, address.email)' class="detail-email-icon"><icon name="icon_envelope-mail" scale="1"></icon></span>
            </p>
            <p>{{address.phone}}</p>
          </div>
          <div v-for='address in currentOrder.address' v-if='!address.billingType' class="shipping-add">
            <p class="address-title">
              <span>
                Shipping Address
              </span>
              <span @click="addToContactsAction([{email: address.email}])" class="save-to-contacts hint--bottom hint--rounded hint--delay-1000" aria-label="Add as a New Contact">
                <icon name="icon_friend" :scale="1.5"></icon>
              </span>
            </p>
            <p>{{address.fullName}}</p>
            <p>{{address.addressLine1}}</p>
            <p v-if='address.addressLine2'>{{address.addressLine2}}</p>
            <p>{{address.city}}, {{address.zipCode}}</p>
            <p>{{address.state}}, {{address.country}}</p>
            <p class="address-end email">
              <span class="detail-email-span">{{address.email}}</span>
              <span @click='sendEmail($event, address.email)' class="detail-email-icon"><icon name="icon_envelope-mail" scale="1"></icon></span>
            </p>
            <p>{{address.phone}}</p>
          </div>

        </div>
        <div class="store-table store-final-table">
          <overview-table :current-order="currentOrder">
          </overview-table>
        </div>
      </tab>

      <tab header="Prints" icon="icon_gallery-2" :notifications="1">
        <div class="store-table-print">
          <photo-table :current-order="currentOrder">
          </photo-table>
        </div>
      </tab>

      <tab header="Products" icon="icon_image">
        <div class="store-table-product">
          <photo-table :current-order="currentOrder">
          </photo-table>
        </div>
      </tab>

      <tab header="Digital" icon="icon_download">
        <div class="digital-informations">
          <div class="digital-info">
            <div class="digital-info-prefix">Status:</div>
            <div class="digital-info-text">
              <span class="digital-info-default">Sent</span>
              <span class="digital-info-additional">( 4/13/16 )</span>
            </div>
          </div>
          <div class="digital-info">
            <div class="digital-info-prefix">Downloaded:</div>
            <div class="digital-info-text">
              <span class="digital-info-default">Yes</span>
              <span class="digital-info-additional view-history">( view history )</span>
            </div>
          </div>
          <div class="digital-info">
            <div class="digital-info-prefix">Link Expires:</div>
            <div class="digital-info-text">
              <span class="digital-info-default">4/16/16</span>
            </div>
          </div>
        </div>
        <div class="store-table-digital">
          <photo-table :current-order="currentOrder">
          </photo-table>
        </div>
      </tab>
    </tabs> -->
    <!-- END -->

</div>

<dialog :show.sync="showTrackingInfo" :on-close="closeTrackingPopup" :small="true">
  <div class="tracking-popup-wrapper">
    <div class="popup-header">
      <h2>Tracking Info</h2>
    </div>

    <div class="popup-main popup-main__tracking">
      <div class="tracking-entry" v-for="order in whccTrackingInfo" v-show="whccTrackingInfo">
        <!-- <p>{{order.carrier}}</p> -->
        <p class="tracking-entry__number" v-for="track in order.tracking" @click="openTrackingUrl(track.url)">
          {{track.number}}</p>
      </div>

      <div class="tracking-not-available" v-show="!whccTrackingInfo">
        <p class="tracking-not-available__message">Tracking information is not available.</p>
      </div>
    </div>

    <div class="popup-footer popup-footer__tracking" v-show="whccTrackingInfo">
      <button @click="serializeToClipboard(whccTrackingInfo)" class="cs-button">Copy to Clipboard</button>
    </div>
  </div>
</dialog>

<download-images
  :selected-images="downloadImageData"
  v-ref:download-images
>
</download-images>

</template>

<script>
import { uniqBy } from 'lodash';
import progressButton from 'global/components/progressButton/progressButton';
import vSelect from 'global/components/select/select';
import tabs from 'global/components/tabs/tabs';
import tab from 'global/components/tabs/tab/tab';
import photoTable from './photoTable/photoTable';
import overviewTable from './overviewTable/overviewTable';
import selectOrderStatus from 'store/components/orders/selectOrderStatus';
import downloadImages from 'global/components/downloadImages';
import digitalStatus from 'store/components/orders/digitalStatus';
import { notification } from 'global/utils/notification';

import { copyToClipboard } from 'global/utils/tools';
import { resendDigitalProducts } from 'global/api/store';
import { addToContactsAction } from 'contacts/vuex/modules/contactsList';
import { changeOrderStatusAction } from 'store/vuex/modules/orders';

import { openDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

export default {
  components: {
    vSelect,
    progressButton,
    tabs,
    tab,
    photoTable,
    overviewTable,
    selectOrderStatus,
    downloadImages,
    digitalStatus,
  },

  props: {
    currentOrder: Object,
  },

  data () {
    return {
      tracking: false,
      showTrackingInfo: false,
      whccTrackingInfo: false,
      progressState: '',
    };
  },

  vuex: {
    actions: {
      addToContactsAction,
    },
  },

  computed: {
    progressButtonState () {
      return this.$refs.progressButton.states;
    },

    orderStatuses () {
      return this.$store.state.storeSection.orders.statuses;
    },

    completeStatus () {
      return this.orderStatuses.find((status) => status.displayName === 'Completed');
    },

    actions () {
      let actions = [];

      if (this.$refs.downloadImages) {
        actions.push({
          label: this.$refs.downloadImages.imagesIsDownloading ? 'Downloading...' : 'Download images',
          icon: 'icon_download',
          click: this.$refs.downloadImages.downloadImage,
        });
      }

      actions.push({
        label: 'Save order as PDF',
        icon: 'icon_order',
        click: this.saveToPdf,
      });

      if (this.currentOrder.hasDigital) {
        actions.push({
          label: 'Resend digital files',
          icon: 'icon_share-airplane',
          click: () => this.resendDigitalProducts(this.currentOrder),
        });
      }

      actions.push({
        label: 'Copy all filenames',
        icon: 'clipboard-cs',
        click: this.copyTo,
      });

      return actions;
    },

    processorType () {
      return this.currentOrder.processorType;
    },

    delivering () {
      return this.currentOrder.status === 'Shipping' || this.currentOrder.status === 'Shipped';
    },

    trackingStyle () {
      return {
        loading: this.tracking,
      };
    },

    downloadImageData () {
      return uniqBy(this.currentOrder.products, 'imageID')
        .map(product => {
          return {
            image: {
              fileName: product.image.fileName,
              image_url: product.image.image_url,
            },
          };
        });
    },
  },

  methods: {
    getFirstName (fullName) {
      let names = fullName.split(' ');

      return names[0];
    },

    getLastName (fullName) {
      let names = fullName.split(' ');

      return names[1];
    },

    addToContact (address) {
      let contactInfo = {
        email: address.email,
        contactHomePhone: address.phone,
        firstName: this.getFirstName(address.fullName),
        lastName: this.getLastName(address.fullName),
      };
      this.addToContactsAction([contactInfo]);
    },

    async resendDigitalProducts (order) {
      const { status } = await resendDigitalProducts(order);

      if (status === 'success') {
        openDialogAction({type: 'successDialog', data: {header: 'Download link has been sent'}});
      } else {
        openDialogAction({type: 'serverErrorDialog', data: {text: 'Download link has not been sent'}});
      }
    },

    saveToPdf () {
      document.title = `Order ${this.currentOrder.orderNumber}.pdf`;
      window.print();
      document.title = 'Site';
    },

    selectCompleteStatus () {
      this.progressState = this.progressButtonState.LOADING;

      if (this.completeStatus) {
        changeOrderStatusAction(this.$store, {order: this.currentOrder, requestData: {orderId: this.currentOrder._id, status: this.completeStatus.displayName, statusId: this.completeStatus._id}})
          .then(() => {
            this.progressState = this.progressButtonState.SUCCESS;
          })
          .catch(() => {
            this.progressState = this.progressButtonState.ERROR;
          });
      } else {
        this.progressState = this.progressButtonState.ERROR;
      }
    },

    copyTo () {
      if(this.downloadImageData.length) {
        copyToClipboard(this.getFileNameString());
      }
    },
    getFileNameString () {
      return this.downloadImageData.map(imageData => {
        return imageData.image.fileName.replace(/\.[^/.]+$/, '');
      }).join(', ');
    },

    sendEmail: function (e, email) {
      e.preventDefault();
      window.oldAppUtils.navigateToUrl('mailto:' + email);
    },

    trackDelivery () {
      if (this.tracking) {
        return false;
      }

      this.tracking = true;

      Orders.trackWhccOrder(this.currentOrder._id)
        .done(({result = {}}) => {
          this.whccTrackingInfo = result;
          this.showTrackingInfo = true;
        })
        .fail(() => {
          this.whccTrackingInfo = false;
          this.showTrackingInfo = true;
        })
        .always(() => {
          this.tracking = false;
        });
    },

    openTrackingUrl (url) {
      nw ? nw.Shell.openExternal(url) : window.open(url, '_blank');
    },

    serializeToClipboard (entries) {
      const lines = [];

      entries.forEach(({ tracking = [] }) => {
        tracking.forEach(({ number }) => {
          lines.push(number);
        });
      });

      copyToClipboard(lines.join(','));
      const orderNumber = this.currentOrder.orderNumber;

      notification(
        'success',
        'Tracking info has copied to clipboard!',
        `Order #${orderNumber}`
      );

      this.showTrackingInfo = false;
    },

    closeTrackingPopup () {
      this.showTrackingInfo = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/global/style/colors";
@import "src/global/style/ui-common";

.order-detail-print-logo {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 30px;
}

.submit-order-button {
  padding: 0;
}

.info-item {
  .multiselect-wrapper {
    background-color: transparent;
    margin-left: -12px;
  }
}

.particular-order-details {
  overflow: visible;
  flex-grow: 1;

  &.cs-right-panel {
    padding-top: 35px;
    padding-bottom: 90px;
    width: calc(100% - 200px);
  }

  p {
    color: #9b9a9f;
    margin: 7px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .common {
    color: $color-cs-dark-text;
    word-wrap: break-word;

    &.pending {
      color: $color-cs-legacy-blue;
    }

    &.processing {
      color: $color-cs-red;
    }

    &.order-lab {
      color: $color-cs-legacy-blue;
    }

    &.order-shipping-method {
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2; // sass-lint:disable-line no-vendor-prefixes
      -webkit-box-orient: vertical; // sass-lint:disable-line no-vendor-prefixes
    }

    &.order-profit-status {
      color: $color-cs-teal;
    }
  }

  .order-status {
    border: none;
    padding: 0 20px 0 0;
    margin-bottom: 15px;

    .order-status-options {
      margin-left: 0;
      top: 25px;
      color: $color-cs-dark-text;
    }

    .tracking-info {
      color: $color-cs-gray;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: $color-cs-med-gray;
      }
    }
  }

  .info-item {
    margin: 25px 0;

    h3 {
      font-size: 16px;
      font-family: Proxima Nova Regular;
    }
  }

  table {
    td {
      font-size: 15px;
    }
  }
}

.store-leftpanel {
  .particular-order-details {
    margin-top: 15px;
  }
}

.digital-informations {
  display: flex;
  padding-top: 15px;
  color: #777;
  font-size: 15px;

  .digital-info {
    width: calc(100% / 3);
    text-align: center;

    .digital-info-prefix {
      display: inline-block;
    }

    .digital-info-text {
      display: inline-block;

      .digital-info-default {
        color: $color-cs-legacy-blue;
      }

      .digital-info-additional {
        &.view-history {
          cursor: pointer;

          &:hover {
            // sass-lint:disable-line nesting-depth
            opacity: 0.8;
          }
        }
      }
    }
  }
}

.store-table-print,
.store-table-product,
.store-table-digital {
  height: calc(100% - 10px);
  overflow: auto;
  padding-top: 20px;
}

.store-table-digital {
  height: calc(100% - 55px);
}

.details-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;

  & > div {
    display: inline-block;
    vertical-align: middle;
  }

  .details-action {
    margin-right: 5px;
    width: 193px;

    .multiselect-wrapper {
      background: #b1b7bd;
      color: #fff;
    }

    .multiselect-border {
      border: none;
    }
  }

  .submit-order {
    background: $color-cs-red;
    border-radius: 5px;
    color: #fff;
    width: 150px;

    &.disabled {
      opacity: 0.5;
    }
  }
}

.order-detail-tabs-wrapper {
  height: calc(100% - 95px);
  overflow: auto;

  .tab-content {
    height: calc(100% - 70px);

    .store-final-table {
      height: calc(100% - 265px);
    }
  }
}

.order-detail-tabs {
  border-bottom: 1px solid $color-cs-keyline;

  .order-detail-tabs-after-nav {
    color: $color-cs-legacy-blue;
    margin-right: 15px;

    // sass-lint:disable-block no-universal-selectors
    & > * {
      display: inline-block;
      vertical-align: -webkit-baseline-middle;
    }

    span {
      font-size: 21px;
      font-weight: bold;
      color: #625f69;
      width: 105px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .nav-order-detail-tabs {
    width: calc(100% - 165px);

    /* Move the line */
    // sass-lint:disable-block force-pseudo-nesting force-element-nesting
    li:first-child.active ~ li:last-child::before {
      transform: translate3d(-300%, 0, 0);
    }

    li:nth-child(2).active ~ li:last-child::before {
      transform: translate3d(-200%, 0, 0);
    }

    li:nth-child(3).active ~ li:last-child::before {
      transform: translate3d(-100%, 0, 0);
    }

    li:nth-child(4).active ~ li:last-child::before {
      transform: translate3d(0%, 0, 0);
    }

    .nav {
      position: relative;
      display: flex;
      margin: 0 auto;
      padding: 0;
      max-width: 1200px;
      list-style: none;
      flex-flow: row wrap;
      justify-content: center;

      & > li {
        position: relative;
        z-index: 1;
        display: block;
        margin: 0;
        text-align: center;
        flex: 1;

        &:last-child {
          &::before {
            // sass-lint:disable-line nesting-depth
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: $color-cs-red;
            content: "";
            transition: transform 0.3s;
            font-size: 18px;
            color: #9b9a9f;
            font-family: Proxima Nova Regular;
          }
        }

        .active {
          a {
            // sass-lint:disable-line nesting-depth
            color: $color-cs-red;
          }
        }

        & > a {
          position: relative;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 1rem 0;
          color: #8a8a8a;
          line-height: 1;
          transition: color 0.3s, transform 0.3s;
          font-size: 15px;

          :hover {
            // sass-lint:disable-line nesting-depth
            opacity: 0.8;
          }
        }
      }
    }
  }

  & > div {
    display: inline-block;
    vertical-align: middle;
  }
}

@keyframes rotating {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

.icon__track-delivery {
  vertical-align: bottom;
  cursor: pointer;

  &.loading {
    animation: rotating 1.3s ease-in-out infinite;
  }
}

.popup-main__tracking {
  max-height: 200px;
  overflow: auto;
  padding: 0 0 20px;
}

.tracking-entry {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.tracking-entry__number {
  border: 1px solid;
  border-radius: 5px;
  padding: 20px;
  color: #ff9595;
  cursor: pointer;
  margin-top: 20px;
  width: 240px;
  text-align: center;

  &:hover {
    transition: all 0.2s ease-in; // sass-lint:disable-line no-transition-all
    color: $color-cs-red;
  }
}

.popup-footer__tracking {
  border-top: 1px solid $color-cs-keyline;

  .cs-button {
    margin: 30px auto;
  }
}

.tracking-not-available {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.tracking-not-available__message {
  text-transform: uppercase;
  color: #9b9a9f;
}

.address-title {
  & > span {
    display: inline-block;
    vertical-align: middle;
  }
}

.save-to-contacts {
  height: 20px;
  margin-left: 10px;
  color: $color-cs-teal;
  cursor: pointer;

  svg {
    height: 20px;
    width: 24px;

    &:hover {
      fill: $color-cs-red;
      transform: scale(1.1);
    }
  }
}

.detail-email-icon {
  color: $color-cs-legacy-blue;
  cursor: pointer;
  display: flex;

  svg {
    height: 16px;
    width: 16px;

    :hover {
      transform: scale(1.1);
      fill: $color-cs-red;
    }
  }
}

.detail-email-span {
  margin-right: 13px;
  max-width: calc(100% - 30px);
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}

.billing-add,
.shipping-add {
  display: inline-block;
  vertical-align: top;
  width: 49%;
  padding: 15px 0;

  .address-title {
    font-size: 18px;
    color: $color-cs-dark-text;
    font-family: Proxima Nova Regular;
    margin-bottom: 20px;
  }
}

.shipping-add {
  padding-left: 15px;

  .old {
    border-left: 1px solid $color-cs-keyline;
  }
}

.address {
  width: 100%;
  margin: 12px auto 0;
  border-top: 1px solid $color-cs-keyline;
  border-bottom: 1px solid $color-cs-keyline;
}

.address-end {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 20px;
}

.email {
  font-size: 15px;
}

.orderstatus {
  img {
    margin-right: 0;
  }
}

.order-details__breakdown-discount {
  color: $color-cs-legacy-green;
}

.can-select {
  user-select: text;
  cursor: text;
}
</style>
