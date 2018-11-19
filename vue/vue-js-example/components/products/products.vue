<template>
  <div class="store-leftpanel">
    <div class="heading">
      <h1>Catalog</h1>

      <div @click='toogleDialog({type: "productsDialog"})' class="add-catalog hvr-grow">
        <icon class="add-catalog-icon" name="icon_create-new"></icon>
      </div>
    </div>

    <div class="leftpanel-list">
      <div
        v-for='(index, priceSheet) in data.priceSheets'
        :data-pricsesheet-id="priceSheet._id"
        class="list-item"
        :class="{'selected-item': priceSheet.selected}"
        :caption="priceSheet.name"
        @click="switchCatalog($index)"
      >
        <div class="item-name">
          <icon v-if="priceSheet.defaultPriceSheet" class="default-pricesheet" name="star"></icon>
          <span>{{priceSheet.displayName}}</span>
          <div class="hint--rounded hint--delay-1000 hint--left" aria-label="Duplicate Catalog">
            <icon @click="copyCatalog(priceSheet, $index)" name="icon_double"></icon>
          </div>
        </div>

        <p class="item-details">{{formatFulfillmentOptions(priceSheet.fullFilmentOptions)}}</p>
      </div>
    </div>
  </div>

  <div class="cs-right-panel">
    <div class="store-header">
      <h2>{{data.currentItem.displayName}}</h2>

      <div class="header-icons">
        <div @click='toogleDialog({type: "productsEditDialog"})'>
          <icon name="icon_edit" id="catalogEdit"></icon>
        </div>

        <div @click='toogleDialog({type: "productsDeleteDialog"})'>
          <icon name="icon_trash" id="catalogDlt"></icon>
        </div>
      </div>
    </div>

    <div class="products-actions">
      <div class="actions-left">
        <v-select :selected="null" :options="allProductCategoriesForSelect" :searchable="false" :show-labels="false" placeholder="All Items" key='value' label='label' @select="filterProductCategories"></v-select>
      </div>

      <div class="actions-right">
        <div v-if='!data.currentItem.selfFulfillment' @click='toogleDialog({type: "productsBulkMarkupDialog", data: data.currentItem})' class="cs-button light">
          <icon name="icon_taxes" scale="1.125"></icon>
          Bulk Markup
        </div>

        <div @click='toogleDialog({type: "productsSelfAddProductDialog"})' class="cs-button">
          <icon name="icon_create-new"></icon>
          Add Product
        </div>
      </div>
    </div>

    <div class="store-table">
      <product-list :table-data='filterProductsByCategories' :catalog-data='data' :toogle-dialog='toogleDialog'></product-list>
    </div>
  </div>
</template>

<script>
import productList from 'store/components/products/productList/productList';
import vSelect from 'global/components/select/select';
import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';
import UITextHelper from 'global/mixins/UITextHelper';
import { addCatalogAction } from 'store/vuex/modules/products';


export default {
  mixins: [UITextHelper],

  components: {
    productList,
    vSelect,
  },

  computed: {
    allProductCategoriesForSelect () {
      return [{
        value: 'all',
        label: 'All Items',
      }].concat(this.data.allProductCategories.map(({categoryID: value, categoryName: label}) => {
        return {
          value: value,
          label: this.displayProductCategoryMany(label),
        };
      }));
    },
  },

  props: {
    data: Object,
    filterProductsByCategories: Array,
    updateCatalog: Function,
  },

  methods: {
    toogleDialog (modal) {
      return toogleDialogAction(modal);
    },

    openFilter (e) {
      $(e.target).parent().find('.dropdown').toggle();
    },

    switchCatalog (index) {
      if (index !== this.data.selectIndex) {
        this.updateCatalog({oldData: this.data.priceSheets, index});
      }
    },

    filterProductCategories (val) {
      if (val && val.value !== 'all') {
        for (var i = 0; i < this.data.productsByCategories.length; i++) {
          if (this.data.productsByCategories[i].categoryID === val.value) {
            this.filterProductsByCategories = [];
            this.filterProductsByCategories.push(this.data.productsByCategories[i]);
          }
        }
      } else {
        this.filterProductsByCategories = this.data.productsByCategories;
      }
    },

    copyCatalog ({
      _id,
      colorCorrection,
      fullFilmentOptions,
      displayName,
      premiumPackaging,
    }, index) {
      let i = 1;
      displayName = displayName.replace(/ copy [0-9]+/, '').replace(/ copy/, '');

      const checkName = (tempName) => {
        const isTaken = !!this.data.priceSheets.find(p => p.displayName === tempName);

        if (isTaken) {
          i++;
          checkName(`${displayName} copy ${i}`);
        } else {
          displayName = tempName;
        }
      };

      checkName(`${displayName} copy`);

      const copy = {
        applyToAllGalleries: false,
        defaultPriceSheet: false,
        colorCorrection,
        fullFilmentOptions,
        name: displayName,
        premiumPackaging,
        _id,
      };

      addCatalogAction(this.$store, copy, index);
    },
  },
};
</script>

<style lang="scss">
@import 'src/global/style/colors';

.products-actions {
  .multiselect-content {
    color: $color-cs-med-text;
  }
}

</style>

<style scoped lang="scss">
@import 'src/global/style/colors';
@import 'src/global/style/store-common';

.products-actions { // sass-lint:disable-line no-mergeable-selectors
  margin: 20px 0;

  .multiselect-wrapper {
    color: #666;
    font-size: 16px;
    transition: border-color 0.2s;

    &:hover {
      border-color: #ccc;
    }
  }

  .actions-left {
    width: 160px;
    float: left;
    font-size: 14px;
  }

  .actions-right {
    top: 0;               // Cancel adjustment for other sections
    display: inline-flex; // Vertical alignment for buttons

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &::after {
    clear: both;
  }
}

.add-catalog-icon {
  height: 21px;
  width: 21px;
}

.item-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
