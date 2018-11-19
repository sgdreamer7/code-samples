<template>
<div v-if="!catalogData.currentItem.selfFulfillment" class="product-list">
  <div class="table" v-for="(index, table) in tableData">
    <div class="table-header">
      <div class="row row-header" :class="{'first-row': index === 0}">
        <div class="column">{{displayProductCategoryMany(table.categoryName)}}</div>
        <div class="column">Cost</div>
        <div class="column">Markup</div>
        <div class="column">Price</div>
        <div class="column action"></div>
        <div class="column action"></div>
      </div>
    </div>

    <div class="table-body">
      <div v-for="product in table.products" class="row store-table-row">

        <div class="column product-style">
          <span class="product-name">{{product.name}}</span>
        </div>

        <div class="column product-cost">
          <span>
            {{table.categoryName !== 'Digital' ? formatCurrencyUsaDollar(product.cost) : 'N/A'}}
          </span>
        </div>

        <div class="column product-markup">
          <span v-if="table.categoryName !== 'Digital'">
            {{product.markupValue ? formatCurrencyUsaDollar(product.markupValue) : formatCurrencyUsaDollar(0)}}
          </span>
          <span v-else>
            N/A
          </span>
        </div>

        <div class="column product-price">
          <span>
            {{formatCurrencyUsaDollar(product.totalCost)}}
          </span>
        </div>

        <div class="column product-edit action" @click="editProduct(table, product)">
          <div class="inline-icon">
            <icon name="icon_edit"></icon>
          </div>
        </div>

        <div class="column product-delete action" @click="toogleDialog({type: 'productsDeleteProductDialog', data: product})">
          <div class="inline-icon">
            <icon name="icon_trash"></icon>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<div v-else class="product-list-container">
  <div class="table" v-for="(index, table) in tableData">
    <div class="table-header" :class="{'first-row': index === 0}">
      <div class="row row-header">
        <div class="column">{{displayProductCategoryMany(table.categoryName)}}</div>
        <div class="column">Price</div>
        <div class="column text-align-right">{{table.categoryName === 'Digital' ? '' : 'Extra Shipping'}}</div>
        <div class="column action"></div>
        <div class="column action"></div>
      </div>
    </div>

    <div class="table-body">
      <div v-for="product in table.products" class="row store-table-row">

        <div class="column product-style">
          <span class="product-name">{{product.name}}</span>
        </div>

        <div class="column product-price">
          <span>
            {{formatCurrency(product.totalCost)}}
          </span>
        </div>

        <div class="column product-extra-ship text-align-right">
          <span>
            {{table.categoryName !== 'Digital' ? formatCurrency(product.productExtraShip) : ''}}
          </span>
        </div>

        <div class="column product-edit action" @click="editProduct(table, product)">
          <div class="inline-icon">
            <icon name="icon_edit"></icon>
          </div>
        </div>

        <div class="column product-delete action" @click="toogleDialog({type: 'productsDeleteProductDialog', data: product})">
          <div class="inline-icon">
            <icon name="icon_trash"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import currencyFormat from 'global/mixins/currencyFormat';
import UITextHelper from 'global/mixins/UITextHelper';

export default {
  mixins: [currencyFormat, UITextHelper],

  props: {
    tableData: Array,
    catalogData: Object,
    toogleDialog: Function,
  },

  methods: {
    editProduct (table, product) {
      if (table.categoryName === 'Digital') {
        this.toogleDialog({type: 'productsAddEditDigitalProductDialog', data: product});
      } else {
        this.toogleDialog({type: 'productsEditProductDialog', data: product});
      }
    },
  },
};

</script>

<style scoped lang="scss">
@import 'src/global/style/store-common';

.table {
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

    &:first-child {
      flex-grow: 20;
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

  .row-header {
    margin-top: 25px;

    &.first-row {
      margin-top: 0;
    }
  }

  & .table-body {
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

.product-list {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
}

.product-style {
  width: 220px;
  cursor: default;

  .product-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: calc(100% - 27px);
    vertical-align: text-bottom;
  }
}

.product-edit,
.product-delete {
  text-align: right;
  width: 35px;
}

.product-list-container {
  height: 100%;
}

</style>
