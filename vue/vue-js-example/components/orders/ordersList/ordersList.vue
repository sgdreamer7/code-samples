<template>
  <div class="order-list-wrapper">
    <div class="store-header">
      <h1>Orders</h1>
      <span @click="getOrdersAction" class="refresh"><icon :class="{'animation-rotate': loading}" name="repeat-cs" scale="1"></icon></span>
      <!-- FEATURE: waiting BE work -->
      <!-- <div class="download" @click="download">
        <icon name="icon_download-2"></icon>
        Download CSV
      </div> -->
      <datepicker-range
        v-ref:datepicker
        :value="filterDateRange"
        placeholder="Filter by date"
        class="date-range"
        @update="updateDateFilter">
      </datepicker-range>
      <div class="order-search">
        <search
          @update="searchUpdated"
          placeholder="Search orders..."
        ></search>
      </div>
      <div class="orders-reset-query-wrapper">
        <div v-show="filtersObjectHasOwnProperty" @click="resetFilter" class="orders-reset-query">
          <icon name="circle_delete-cs"></icon>
          <span>Clear current search query, filters, and sorting</span>
        </div>
      </div>
    </div>

    <div class="store-table">
      <div class="table orders-list-table">
        <div class="table-header">
            <div class="row row-header">
                <div title="Order #" class="column id">
                    <span>Order #</span>
                </div>
                <div :title="filtersObject.date !== '' ? filtersObject.date : 'Date'" class="column date">
                  <v-select
                    :selected="filtersObject.date"
                    :options="dateOptions"
                    label="label"
                    :searchable="false"
                    :show-labels="false"
                    placeholder="Date"
                    arrow-icon="angle-down-cs"
                    :no-input="false"
                    :icons="true"
                    id="date"
                    @select="filtered"
                  ></v-select>
                </div>
                <div title="Customer" class="column customer">
                    <span>Customer</span>
                </div>
                <div :title="filtersObject.gallery !== '' ? filtersObject.gallery : 'Gallery Name'" class="column gallery-name">
                  <v-select
                    :selected="filtersObject.gallery"
                    :options="computedUniqueGalleryList"
                    :searchable="false"
                    :show-labels="false"
                    placeholder="Gallery Name"
                    arrow-icon="angle-down-cs"
                    :no-input="false"
                    :icons="true"
                    label="label"
                    key="label"
                    id="gallery"
                    @select="filtered"
                  ></v-select>
                </div>
                <div :title="filtersObject.status !== '' ? filtersObject.status : 'Status'" class="column status">
                  <v-select
                    :selected="filtersObject.status"
                    :options="statuses"
                    label="label"
                    :searchable="false"
                    :show-labels="false"
                    placeholder="Status"
                    arrow-icon="angle-down-cs"
                    :no-input="false"
                    :icons="true"
                    id="status"
                    @select="filtered"
                  ></v-select>
                </div>
                <div title="Total" class="column total">
                  <span>Total</span>
                </div>
                <div class="column action"></div>
            </div>
        </div>
        <div v-el:list class="table-body">
          <div v-for="order in filtredData" class="row" track-by="$index"
              :data-order-ID="order._id"
              @click="setScroll"
              v-link="{path: '/store/orders/order-details/' + order._id}">
            <div :title="order.orderNumber" class="column id">
              <span class="inline-icon orders-number-icon">
                <icon v-if="!order.onlyDigital && order.selfFulfillment" name="icon_user" class="order-icon"></icon>
                <icon v-if="!order.onlyDigital && !order.selfFulfillment" name="printer-icon" class="order-icon"></icon>
                <icon v-if="order.onlyDigital" name="digital-download"></icon>
              </span>
              {{order.orderNumber}}
            </div>
            <div :title="order.createdDate | date '%x'" class="column data">{{order.createdDate | date "%x"}}</div>
            <div class="column customer">
              <span :title="order.address[0].fullName">
                {{order.address[0].fullName}}
              </span>
            </div>
            <div :title="order.onlineGalleryName | capitalize"
              class="column gallery-name text-two-line"
              :aria-label="order.onlineGalleryName">
              {{order.onlineGalleryName}}
            </div>

            <div v-if="order.digitalOrderStatus && order.onlyDigital" :title="order.digitalOrderStatus" class="column status">
              <span>
                <span class="order-status">
                  <digital-status :order="order">
                  </digital-status>
                </span>
              </span>
            </div>
            <div v-else :title="order.status" class="column status" @click.prevent>
              <span>
                <span class="order-status">
                  <select-order-status
                    :class="{'disabled': !order.selfFulfillment}"
                    :order="order"
                    :inherit-placeholder-color="true"
                    >
                  </select-order-status>
                </span>
              </span>
            </div>
            <div :title="formatCurrencyOrder(order)" class="column total">{{formatCurrencyOrder(order)}}</div>
            <div title="Order Details" class="column action">
              <span class="inline-icon">
                <icon name="icon_order"></icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vSelect from 'global/components/select/select';
  import search from 'global/components/search';
  import selectOrderStatus from 'store/components/orders/selectOrderStatus';
  import digitalStatus from 'store/components/orders/digitalStatus';
  import currencyFormat from 'global/mixins/currencyFormat';
  import { getOrdersAction } from 'store/vuex/modules/orders';
  import datepickerRange from 'global/components/datepickerRange';
  import { openDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

  import _ from 'lodash';
  import moment from 'moment';

  export default {
    mixins: [currencyFormat],

    components: {
      vSelect,
      search,
      selectOrderStatus,
      digitalStatus,
      datepickerRange,
    },
    props: {
      ordersData: Object,
    },
    data () {
      return {
        statuses: [
          {label: 'Pending', icon: 'time-cs'},
          {label: 'Processing', icon: 'repeat-cs'},
          {label: 'Completed', icon: 'circle_ok-cs'},
          {label: 'Cancelled', icon: 'circle_delete-cs'},
          {label: 'Received', icon: 'inbox-cs'},
          {label: 'Shipped', icon: 'icon_share-airplane'},
        ],
        filterDateRange: {
          from: '',
          to: '',
        },
        fullFilmentOptions: [
          {label: 'Lab Fulfillment'},
          {label: 'Self Fulfillment'},
        ],
        dateOptions: [
          {label: 'newest'},
          {label: 'oldest'},
        ],
        filtersObject: {
          date: '',
          gallery: '',
          status: '',
          fulfillment: '',
          search: '',
          dateRange: '',
        },
        filtredData: [],
        scrollTop: 0,
      };
    },

    vuex: {
      actions: {
        getOrdersAction,
      },
    },

    computed: {
      filtersObjectHasOwnProperty () {
        return Object.keys(this.filtersObject).some((current) => {
          return this.filtersObject[current] !== '';
        });
      },

      computedUniqueGalleryList () {
        const ordersUniqueGalleryList = this.ordersData.uniqueGalleryList ? this.ordersData.uniqueGalleryList : [];

        return ordersUniqueGalleryList.map((galleryName) => {
          return {label: galleryName};
        });
      },

      updateOrderList () {
        return this.$store.state.storeSection.orders.updateOrderList;
      },

      loading () {
        return this.$store.state.storeSection.orders.loading;
      },
    },

    watch: {
      updateOrderList () {
        this.disableFIlterInputField();
        this.filterOrderList();
      },

      ordersData: {
        handler: function () {
          this.disableFIlterInputField();
          this.filterOrderList();
        },
        deep: true,
      },
    },
    methods: {
      download () {
        openDialogAction({ type: 'reportDownloadDialog', data: { } });
      },

      updateDateFilter (date) {
        this.filterDateRange = date;
        if (date.from || date.to) {
          this.filtersObject.dateRange = date;
        } else {
          this.filtersObject.dateRange = '';
        }
        this.filterOrderList();
      },

      searchUpdated (name) {
        this.filtersObject.search = name;
        this.filterOrderList();
      },

      clearDatapicker () {
        this.filterDateRange.from = '';
        this.filterDateRange.to = '';
        this.$refs.datepicker.clearDatapicker();
      },

      resetFilter () {
        Object.keys(this.filtersObject).forEach((current) => {
          this.filtersObject[current] = '';
        });

        this.clearDatapicker();
        this.filterOrderList();
      },

      disableFIlterInputField: function () {
        if (!_.isArray(this.ordersData.orderlist)) {
          $('.order-search-bar').addClass('disabled');
        } else {
          $('.order-search-bar').removeClass('disabled');
        }
      },

      filtered (data, type) {
        if (data && this.filtersObject[type].label !== data.label) {
          this.filtersObject[type] = data;
        } else {
          this.filtersObject[type] = '';
        }
        this.filterOrderList();
      },

      filterByDate (data) {
        if(!data || !data.length || !(this.filterDateRange.from || this.filterDateRange.to)) return data;

        let from = this.filterDateRange.from && new Date(this.filterDateRange.from);
        let to = this.filterDateRange.to && new Date(this.filterDateRange.to);
        to && to.setDate(to.getDate() + 1);

        return data.filter((order) => {
          return (!from || (new Date(order.createdDate) > from)) &&
                 (!to || (new Date(order.createdDate) < to));
        });
      },

      // NOTE(Oleg): Saaaaadnesssss. WTFIS???
      filterOrderList: function () {
        if (!_.isArray(this.ordersData.orderlist)) {
          window.Busy.hide();
          this.filtredData = []; //

          return;
        }
        var _data = this.filterByDate(_.clone(this.ordersData.orderlist));
        var orderFullfillment = _.get(this.filtersObject.fulfillment, 'label');
        var orderDate = _.get(this.filtersObject.date, 'label');
        var orderGalleryName = _.get(this.filtersObject.gallery, 'label');
        var orderStatus = _.get(this.filtersObject.status, 'label');
        var ordersearchInputFiled = this.filtersObject.search;

        if (orderFullfillment === '') orderFullfillment = undefined;
        if (orderDate === '') orderDate = 'newest';
        if (orderGalleryName === '') orderGalleryName = undefined;
        if (orderStatus === '') orderStatus = undefined;
        if (ordersearchInputFiled === '') ordersearchInputFiled = undefined;

        var filteredOrderList;

        if (!_.isUndefined(orderFullfillment) ||
          !_.isUndefined(orderDate) ||
          !_.isUndefined(orderGalleryName) ||
          !_.isUndefined(orderStatus) ||
          !_.isUndefined(ordersearchInputFiled)
        ) {
          // orderFullfillment - filter
          filteredOrderList = $.grep(_data, function (order) {
            if (order.fullFilmentOptions === orderFullfillment || orderFullfillment === undefined) return order;
          });
          // orderGalleryName - filter
          filteredOrderList = $.grep(filteredOrderList, function (order) {
            if (order.onlineGalleryName === orderGalleryName || orderGalleryName === undefined) return order;
          });

          // orderStatus - filter
          filteredOrderList = $.grep(filteredOrderList, function (order) {
            if (order.status === orderStatus || orderStatus === undefined) return order;
          });
          // order Input Field search - filter -> search all fields
          if (!_.isUndefined(ordersearchInputFiled)) {
            filteredOrderList = $.grep(filteredOrderList, function (order) {
              var galleryName;
              var ordersearchInputFiledLower;

              var billingAddress = _.first(order.address, {
                type: 'billing',
              });
              var customerName = billingAddress.fullName;

              customerName = customerName.slice(0, ordersearchInputFiled.length).toLowerCase(); // slicing and converting to lowercase - customer name - according to length of string entered

              // slicing and converting to lowercase - gallery name - according to length of string entered
              if (_.isString(order.onlineGalleryName)) {
                galleryName = order.onlineGalleryName.slice(0, ordersearchInputFiled.length).toLowerCase();
              }

              ordersearchInputFiledLower = ordersearchInputFiled.toLowerCase();

              // total filter using operator - > and < operator
              var flagTotalOpertorFilter = false;
              var operator = ordersearchInputFiled.slice(0, 1);

              if (operator === '=' || operator === '>' || operator === '<') {
                // checking through regular expression (/^\d+$/) whether ordersearchInputFiled value is numeric
                var term = ordersearchInputFiled.slice(1);

                if (/^\d+$/.test(term)) {
                  flagTotalOpertorFilter = true;

                  if (operator === '=') {
                    ordersearchInputFiled = '==' + term;
                  }
                }
              }

              if (flagTotalOpertorFilter === true) {
                var match = eval(order.total + ordersearchInputFiled); // eslint-disable-line

                if (match) {
                  return order;
                }
              } else if (!flagTotalOpertorFilter &&
                !_.isEmpty(customerName) &&

                order._id !== undefined && order._id !== null &&
                order.total !== undefined && order.total !== null &&
                order.fullFilmentOptions !== undefined && order.fullFilmentOptions !== null &&
                order.createdDate !== undefined && order.createdDate !== null &&

                galleryName !== undefined && galleryName !== null &&

                order.status !== undefined && order.status !== null) {
                if (customerName === ordersearchInputFiledLower || order._id.toLowerCase() === ordersearchInputFiledLower || order.total === ordersearchInputFiled || order.fullFilmentOptions.toLowerCase() === ordersearchInputFiledLower || moment(order.createdDate).format('MM/DD/YY') === ordersearchInputFiled || galleryName.toLowerCase() === ordersearchInputFiledLower || order.status.toLowerCase() === ordersearchInputFiledLower.toLowerCase()) {
                  return order;
                }
              }
            });
          }
          // orderDate - sort
          var now = Date.now();

          filteredOrderList = _.sortBy(filteredOrderList, function (order) {
            var ts = +new Date(order.createdDate);

            return orderDate === 'oldest' ? ts : now - ts;
          });
          _data = filteredOrderList;
        }
        this.filtredData = _data;
        window.Busy.hide();
      },

      setScroll () {
        if (this.$els.list) {
          this.scrollTop = this.$els.list.scrollTop;
        }
      },
    },

    attached () {
      if (this.$els.list) {
        this.$els.list.scrollTop = this.scrollTop;
      }
    },
  };
</script>

<style lang="scss">
@import 'src/global/style/colors';

// sass-lint:disable no-mergeable-selectors

.orders-container {
  .order-search {
    .search-input-wrapper {
      height: 32px;

      .search-icon-wrapper {
        svg {
          width: 15px;
          height: 15px;
        }
      }

      .search-input-container {
        height: 32px;

        input {
          height: 32px;
          font-size: 12px;
        }
      }
    }
  }
}

/* un-scoped so multiselect child can inherit */
.table-header {

  .multiselect-wrapper {
    background-color: transparent;

    .multiselect-select {
      padding: 0;
    }

    .fa-icon {
      width: 12px;
    }
  }

  .multiselect-content {
    margin-left: -15px;
    width: 110%;
  }

  .multiselect-tags {
    padding-left: 0;
  }

  .date {
    .multiselect-content {
      min-width: 110px;
    }
  }

  .gallery-name {
    .multiselect-content {
      min-width: 210px;
    }
  }

  .status {
    .multiselect-content {
      width: 175%;
    }
  }

  .multiselect-single {
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.order-status {
  .disabled {
    .multiselect-select {
      opacity: 0;
    }
  }

  .multiselect-icon {
    .fa-icon {
      height: 14px;
      position: relative;
      top: -1px;
    }
  }
}
</style>

<style scoped lang="scss">
@import 'src/global/style/colors';
@import 'src/global/style/ui-common';

.order-list-wrapper {
  height: 100%;
  overflow: hidden;
}


.orders-container {
  .store-header {
    margin-top: 0;
    height: auto;
    position: relative;

    h1,
    .refresh {
      display: inline-block;
      vertical-align: middle;
    }

    .refresh {
      margin-left: 25px;
      height: 16px;
      cursor: pointer;

      &:hover {
        svg {
          fill: $color-cs-teal;
        }
      }
    }
  }

  .store-table {
    overflow: hidden;
    height: calc(100% - 66px);
  }
}

.download {
  float: right;
  height: 32px;
  line-height: calc(32px + 2px);
  margin-left: 24px;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-align: center;
  color: $color-cs-teal;
  width: 181px;
  border-radius: 3px;
  display: inline-block;
  white-space: nowrap;
  background-color: rgba($color-cs-teal-light, 0.15);

  svg {
    top: 3px;
    margin-right: 7px;
  }
}

.date-range {
  float: right;
  margin-left: 24px;
}

.order-search {
  text-align: right;
  display: inline-block;
  float: right;
  position: relative;
}

.order-search-bar {
  background-size: 14px 14px;
  background-position: left 10px center;
  background-repeat: no-repeat;
  padding: 0 10px 0 32px;
}

.search-area {
  width: 200px;
  display: inline-block;
}

.orders-list-table {
  .column {
    .multiselect-tags {
      padding-left: 0;
      width: calc(100% - 40px);
    }
  }
}

.orders-reset-query-wrapper {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  bottom: -25px;
  left: 0;

  .orders-reset-query {
    cursor: pointer;
    font-family: Proxima Nova Bold;
    color: #9b9a9f;

    &:hover {
      opacity: 0.8;
    }

    // sass-lint:disable-block no-universal-selectors
    & > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.orderstatus {
  .dots {
    margin-right: 3px;
  }
}

.dots {
  width: 6px;
  height: 6px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  fill: $color-cs-red;
  border-radius: 50%;
}

.shipped {
  fill: $color-cs-legacy-blue;
}

.delivered {
  fill: #509e75;
}

.table {
  height: 100%;
  display: flex;
  flex-direction: column;

  .table-header {

    .row-header {
      width: calc(100% - 10px);
    }
  }

  .column {
    color: #9b9a9f;
    padding-left: 5px;
    text-transform: capitalize;
    flex-grow: 8;
    flex-shrink: 1;
    flex-basis: 10px;
    min-width: 0;

    &.id {
      flex-grow: 8;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &.date {
      flex-grow: 8;

      .multiselect-wrapper {
        width: 82px;
      }
    }

    &.gallery-name {
      flex-grow: 12;

      .multiselect-wrapper {
        width: 139px;
      }
    }

    &.text-two-line {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // sass-lint:disable-line no-vendor-prefixes
      -webkit-box-orient: vertical; // sass-lint:disable-line no-vendor-prefixes
    }

    &.customer {
      flex-grow: 12;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &.status {
      flex-grow: 13;
      padding-left: 15px;

      .multiselect-wrapper {
        width: 90px;
      }
    }

    &.total {
      flex-grow: 6;
      text-align: right;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 5px;
    }

    &.action {
      flex-grow: 1;
      flex-basis: 14px;
      padding-left: 8px;
      position: relative;
      bottom: -1px;
    }

    .orders-number-icon {
      margin-right: 4px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $color-cs-keyline;
    padding: 14px 0;
    max-height: 48px;
    box-sizing: border-box;
    margin-left: 0;
    width: 100%;
  }

  .table-body {
    height: 100%;
    overflow-y: auto;

    .row {

      &:hover {
        background-color: #fff;

        // sass-lint:disable-block nesting-depth
        .column {
          color: $color-cs-red;
          cursor: pointer;

          &.action {
            svg {
              color: $color-cs-red;
            }
          }
        }
      }
    }

    .column {
      color: $color-cs-dark-text;
      font-size: 15px;

      &.id {
        color: $color-cs-red;
        cursor: pointer;
      }
    }
  }
}

.order-icon {
  fill: none;
  stroke: currentColor;
  height: 14px;
}
</style>
