<template>
  <dialog dialog-class="add-product-popup" :show.sync="showdialog" :on-close="closePopup" :small="catalogData.currentItem.fullFilmentOptions !== 'Self Fulfillment'">
    <div class="add-product-popup-wrapper">
      <validator name="validation">
        <div class="popup-header">
          <icon v-if="productData.productCategory === 'Prints'" name="icon_gallery-2" scale="2"></icon>
          <icon v-else name="icon_image" scale="2"></icon>
          <h2>Add {{displayProductCategoryOne(productData.productCategory)}}</h2>
        </div>
        <div v-if="!catalogData.currentItem.selfFulfillment" class="popup-main">
          <div class="popup-field">
            <v-select
              :class="{'touched': $validation.product.touched, 'invalid': $validation.product.required}"
              :selected="null"
              :options="options"
              :searchable="false"
              :show-labels="false"
              placeholder="Product List"
              @update="selectProduct"
              key="productID"
              label="name"
              :max-height="122">
            </v-select>
            <input type="text" spellcheck="false" name="product" v-show="false" v-model="form.productID" v-validate:product = "['required']">
            <span class="validation-error-text" v-if="$validation.product.required && $validation.product.touched">{{ $validation.product.required }}</span>
          </div>

          <!-- NEW FEAT -->
          <!-- <div class="popup-field ">
            <h3>Price</h3>
            <input
              id="product_Price"
              name="productPrice"
              class="productprice-popup"
              type="text"
              spellcheck="false"
              placeholder="0.00"
              v-model="form.price"
              v-input-mask mask-type="currency" :options="maskOptions"
              v-validate:auto-product-price="['required']"
            >
            <span class="validation-error-text" v-if="$validation.autoProductPrice.required && $validation.autoProductPrice.touched">{{ $validation.autoProductPrice.required }}</span>
          </div> -->
        </div>

        <div v-else class="popup-main self-form">
          <div class="popup-field">
            <h3>Product Name</h3>
            <input
              v-autofocus
              id="productName"
              name="productName"
              class="product-name-popup"
              type="text"
              spellcheck="false"
              placeholder="ex: 4x6, 8x12 Canvas, Barrel of Monkeys etc."
              v-model="selfForm.name | trim"
              v-validate:product-name="['required']">
            <span class="validation-error-text" v-if="$validation.productName.required && $validation.productName.touched">{{ $validation.productName.required }}</span>
            <span class="info-message" v-if="selfForm.name.length > limitNameCF.limit">{{limitNameCF.message}}</span>
          </div>

          <div class="popup-field">
            <h3>Price <optional-form-label></optional-form-label></h3>
            <div class="currency-wrapper">
              <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
              <input
              id="product_Price"
              name="productPrice"
              class="currency-input"
              :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
              type="text"
              spellcheck="false"
              placeholder="0.00"
              v-model="selfForm.totalCost"
              v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
              v-validate:price="['price']"
              >
              <span class="validation-error-text long-message" v-if="$validation.price.price && $validation.price.touched">
                {{ $validation.price.price }}
              </span>
            </div>
          </div>

          <div class="popup-field">
            <h3>Additional Shipping<optional-form-label></optional-form-label></h3>
            <div class="currency-wrapper">
              <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
              <input
               id="productExtraShip"
               name="productExtraShip"
               class="currency-input"
               :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
               type="text"
               spellcheck="false"
               placeholder="0.00"
               v-model="selfForm.productExtraShip"
               v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
              >
            </div>
          </div>
        </div>

        <div class="popup-footer" style="position:relative;">
          <button @click="closePopup" class="btn cancel">Cancel</button>
          <button
            @click="save"
            :disabled="!$validation.valid"
            class="btn btn-selected">
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
import vSelect from 'global/components/select/select';
import inputMask from 'global/directives/mask/mask';
import currencyOptions from 'global/mixins/currencyOptions';
import UITextHelper from 'global/mixins/UITextHelper';
import optionalFormLabel from 'global/components/optionalFormLabel';

export default {
  mixins: [currencyOptions, UITextHelper],

  components: {
    validator,
    vSelect,
    optionalFormLabel,
  },

  directives: {
    inputMask,
  },

  props: {
    showdialog: Boolean,
    closepopup: Function,
    catalogData: Object,
    productData: Object,
    submit: Function,
    allProducts: Array,
  },

  data () {
    return {
      maskOptions: {
        mask: '$ 9{1,5}[.99]',
        autoUnmask: true,
        rightAlign: false,
        greedy: false,
        placeholder: '0',
        definitions: {
          '.': {
            validator: '[.]',
            cardinality: 1,
          },
        },
      },
      form: {
        productID: '',
      },
      selfForm: {
        name: '',
        totalCost: '',
        productExtraShip: '',
        category: this.productData.productCategory === 'Prints' ? 'Prints' : 'Product',
      },
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
      message: 'Price cannot be less than 0',
    },
  },

  computed: {
    sendForm () {
      return !this.catalogData.currentItem.selfFulfillment ? this.form.productID : this.selfForm;
    },

    options () {
      const options = this.allProducts.filter((product) => {
        return product.categoryName === this.productData.productCategory;
      });
      if (options) {
        return options;
      } else {
        return [];
      }
    },
  },

  methods: {
    save () {
      if (this.catalogData.currentItem.selfFulfillment) {
        this.submit({
          pricesheetID: this.catalogData.currentItem._id,
          data: {
            name: this.sendForm.name,
            totalCost: parseFloat(this.sendForm.totalCost) || 0.0,
            productExtraShip: parseFloat(this.sendForm.productExtraShip) || 0.0,
            categoryName: this.sendForm.category,
          },
        });
      } else {
        this.submit({
          pricesheetID: this.catalogData.currentItem._id,
          data: {
            productID: this.sendForm,
            labID:this.catalogData.currentItem.labID,
          },
        });
      }
    },

    selectProduct (val) {
      this.form.productID = val ? val.productID : '';
      this.$validate('product', true);
    },

    closePopup () {
      this.closepopup();
    },
  },
};
</script>

<style lang="scss" scoped>

.add-product-popup {

  .popup-field {

    & h3 {
      margin-bottom: 8px;
    }
  }

  & .popup-main {
    overflow: visible;

    &.self-form {
      overflow: auto;
    }
  }

  .validation-error-text {
    &.long-message {
      letter-spacing: -0.1px;
    }
  }
}

.add-product-popup-wrapper {
  height: 100%;
}
</style>
