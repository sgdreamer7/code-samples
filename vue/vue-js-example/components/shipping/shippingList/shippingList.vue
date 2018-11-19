<template>
  <div class="store-table">
    <div class="table">
      <div class="table-header">
        <div class="row row-header">
          <div v-for="key in columnsname"
          @click="sortBy(key)"
          class="column"
          :class="{active: sortKey == key}">
            {{key | capitalize}}
            <span class="arrow"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </div>
          <div class="column action"></div>
          <div class="column action"></div>
        </div>
      </div>
      <div class="table-body">
        <div v-for="shipping in gridData" class="row store-table-row">
          <div class="column">
            {{shipping.shippingMethodName}}
          </div>
          <div class="column">
            {{formatCurrency(shipping.feePerOrder)}}
          </div>
          <div class="column">
            {{shipping.shipsTo}}
            <span v-if="shipping.shipsToCode">({{shipping.shipsToCode}})</span>
          </div>
          <div class="column action">
            <icon name="icon_edit" @click="openShippingAddEdit(shipping)"></icon>
          </div>
          <div class="column action">
            <icon name="icon_trash" @click="openDeleteDialog(shipping._id)"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import currencyFormat from 'global/mixins/currencyFormat';

  export default {
    mixins: [currencyFormat],

    props: {
      gridData: Array,
      columns: Array,
      columnsname: Array,
      openShippingAddEdit: Function,
      openShippingDeleteDialog: Function,
    },
    data () {
      var sortOrders = {};
      this.columns.forEach(function (key) {
        sortOrders[key] = 1;
      });

      return {
        sortKey: '',
        sortOrders: sortOrders,
      };
    },
    methods: {
      openDeleteDialog (shippingId) {
        this.openShippingDeleteDialog({ shippingId });
      },

      sortBy: function (key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
    },
  };
</script>


<style scoped lang="scss">
@import 'src/global/style/store-common';
@import 'src/global/style/colors';

.table {
  height: 100%;
  overflow: hidden;

  & .table-header {

    & .row-header {
      width: calc(100% - 10px);
    }
  }

  & .column {
    color: #9b9a9f;
    padding-left: 5px;
    text-transform: capitalize;
    flex-grow: 8;
    flex-shrink: 1;
    flex-basis: 10px;
    min-width: 0;

    &.action {
      flex-grow: 1;
      flex-basis: 14px;
      padding: 0 5px;
      position: relative;
      bottom: -1px;
      text-align: right;
      cursor: pointer;
    }
  }

  & .row {
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

  & .table-body {
    height: calc(100% - 48px);
    overflow-y: auto;

    & .row {

      &:hover {
        background-color: #fff;

        //sass-lint:disable-block nesting-depth
        & .column {
          color: $color-cs-red;

          &.action {
            svg {
              color: $color-cs-red;
            }
          }
        }
      }
    }

    & .column {
      color: $color-cs-dark-text;
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:first-child {
        color: $color-cs-red;
      }
    }
  }
}
</style>
