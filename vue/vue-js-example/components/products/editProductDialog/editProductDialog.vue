<template>
  <dialog dialog-class="edit-product-popup" :show.sync="showdialog" :on-close="closePopup" :small="true">
    <div class="edit-product-popup-wrapper">
      <validator name="validation">
        <div class="popup-header">
          <icon name="icon_edit"></icon>
          <h2>Edit {{displayProductCategoryOne(productData.categoryName)}}</h2>
        </div>
        <div class="popup-main">
          <div class="popup-field">
            <h3>Product Name</h3>
            <input
              v-autofocus :focus-disabled="!catalogData.currentItem.selfFulfillment"
              id="productName"
              name="productName"
              class="product-name-popup"
              :class="catalogData.currentItem.selfFulfillment ? 'self-product-name-popup' : 'disabled'"
              type="text"
              spellcheck="false"
              placeholder="Enter Name"
              v-model="form.name | trim"
              v-validate:product-name="['requiredStringTrim']">
              <span class="validation-error-text" v-if="$validation.productName.requiredStringTrim && $validation.productName.touched">
                {{ $validation.productName.requiredStringTrim }}
              </span>
              <span class="info-message" v-if="form.name.length > limitNameCF.limit">{{limitNameCF.message}}</span>
          </div>
          <div class="popup-field">
            <h3>Price<optional-form-label></optional-form-label></h3>
            <div class="error-wrapper">
              <div class="currency-wrapper">
                <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
                <input
                  name="productPrice"
                  class="currency-input"
                  :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
                  type="text"
                  spellcheck="false"
                  placeholder="0"
                  v-model="form.totalCost"
                  v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
                  v-validate:price="['price']">
                <span class="validation-error-text long-message" v-if="$validation.price.price && $validation.price.touched">
                  {{ $validation.price.price }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="catalogData.currentItem.selfFulfillment" class="popup-field">
            <h3>Extra Shipping Price<optional-form-label></optional-form-label></h3>
            <div class="currency-wrapper">
              <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
              <input
              name="productPrice"
              class="currency-input"
              type="text"
              spellcheck="false"
              placeholder="0"
              v-model="form.productExtraShip"
              v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
              >
            </div>
          </div>
        </div>
        <div class="popup-footer" style="position:relative;">
          <button @click="closePopup" class="btn cancel">Cancel</button>
          <button
            class="btn btn-selected"
            @click="editProduct"
            :disabled="!$validation.valid"
          >
            Save
          </button>
        </div>
      </validator>
    </div>
  </dialog>
</template>

<script>
import numeral from 'numeral';
import validator from 'vue-validator';
import currencyOptions from 'global/mixins/currencyOptions';
import UITextHelper from 'global/mixins/UITextHelper';
import optionalFormLabel from 'global/components/optionalFormLabel';

export default {
  mixins: [currencyOptions, UITextHelper],

  components: {
    validator,
    optionalFormLabel,
  },

  props: {
    showdialog: Boolean,
    submit: Function,
    closepopup: Function,
    catalogData: Object,
    productData: Object,
  },

  data () {
    return {
      form: {
        totalCost: this.productData.totalCost || this.productData.price,
        name: this.productData.name,
        productExtraShip: this.productData.productExtraShip,
      },
      productIndex: this.productData.index,
      categoryIndex: this.productData.categoryIndex,
    };
  },

  validators: {
    price: {
      check (price) {
        let priceValue = price == null ? 0.0 : numeral(String(price)).value();

        if (!this._vm.catalogData.currentItem.selfFulfillment) {
          return (priceValue - this._vm.productData.cost) >= 0;
        }

        return priceValue >= 0;
      },
      message: 'Price cannot be set lower than or equal to the cost of the print/product',
    },
  },

  computed: {
    markup () {
      const cost = this.productData.cost;

      return (this.form.totalCost - cost) / cost;
    },
  },

  methods: {
    editProduct () {
      if (this.catalogData.currentItem.selfFulfillment) {
        this.submit({
          pricesheetID: this.catalogData.currentItem._id,
          productID: this.productData.productID,
          data: {
            name: this.form.name,
            totalCost: parseFloat(this.form.totalCost),
            productExtraShip: parseFloat(this.form.productExtraShip),
            categoryName: this.productData.categoryName,
          },
        });
      } else {
        this.submit({
          pricesheetID: this.catalogData.currentItem._id,
          productID: this.productData.productID,
          data: { markup: this.markup },
        });
      }
    },

    closePopup () {
      this.closepopup();
    },
  },
};
</script>

<style lang="scss" scoped>
.error-wrapper {
  margin-bottom: 33px;

  .validation-error-text {
    &.long-message {
      letter-spacing: -0.1px;
    }
  }
}
</style>
