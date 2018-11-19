<template>
  <dialog dialog-class="shipping-method-dialog" :show.sync="showdialog" :on-close="closePopup" :small="true">
    <div class="shipping-method-dialog-wrapper">
      <validator name="validation">
        <div class="popup-header">
          <icon :name="currentShipping._id ? 'icon_edit' : 'icon_share-airplane'" scale=1.5></icon>
          <h2 v-text="currentShipping._id ? 'Edit Shipping Method' : 'Add Shipping Method'"></h2>
        </div>
        <div class="popup-main">
          <div class="popup-field">
            <h3>Shipping Method Name</h3>
            <input
              v-autofocus
              id="shippingName"
              name="shippingName"
              class="shipping-name-popup"
              type="text"
              placeholder="ex: FedEx, UPS, Carrier Pigeon"
              v-model="currentItem.shippingMethodName | trim"
              v-validate:shipping-name="{ requiredStringTrim: true, duplicate: true }"
            >
            <span class="validation-error-text" v-if="$validation.shippingName.requiredStringTrim && $validation.shippingName.touched">{{ $validation.shippingName.requiredStringTrim }}</span>
            <span class="validation-error-text" v-if="$validation.shippingName.duplicate && !$validation.shippingName.requiredStringTrim">{{ $validation.shippingName.duplicate }}</span>
          </div>
          <div class="popup-field">
            <h3>Price<optional-form-label></optional-form-label></h3>
            <div class="currency-wrapper">
              <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
              <input
                @focus="focusShippingRate"
                @blur="blurShippingRate"
                id="shippingRate"
                name="shippingRate"
                class="shipping-rate-popup currency-input"
                :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
                type="text"
                spellcheck="false"
                placeholder="0"
                v-model="currentItem.feePerOrder"
                v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
                v-validate:shipping-rate="{ price: true }"
              >
              <span class="validation-error-text" v-if="$validation.shippingRate.price && $validation.shippingRate.touched">{{ $validation.shippingRate.price }}</span>
            </div>
          </div>
          <div class="popup-field" style="margin-top: 25px;">
            <h3>Applies To</h3>
            <div class="radio">
              <input id="domestic" type="radio" value="domestic" name="shipsTo" v-model="currentItem.shipsTo">
              <label for="domestic">
                Domestic
                <span v-if="currentItem.shipsToCode">&nbsp;({{currentItem.shipsToCode}})</span>
              </label>
            </div>
            <div class="radio">
              <input id="international" type="radio" value="international" name="shipsTo" v-model="currentItem.shipsTo">
              <label for="international">International</label>
            </div>
          </div>
        </div>
        <div class="popup-footer" style="position:relative;">
          <button @click="closepopup" class="cs-button light">Cancel</button>
          <button v-if="currentShipping._id" @click="editSubmit(currentItem)" class="cs-button" :disabled="!$validation.valid">Save</button>
          <button v-else @click.stop="addSubmit(currentItem)" class="cs-button" :disabled="!$validation.valid">Save</button>
        </div>
      </validator>
    </div>
  </dialog>

</template>

<script>
import validator from 'vue-validator';
import { requiredStringTrim } from 'global/utils/validators';
import currencyOptions from 'global/mixins/currencyOptions';
import optionalFormLabel from 'global/components/optionalFormLabel';

export default {
  mixins: [currencyOptions],

  components: {
    optionalFormLabel,
  },
  directives: {
    validator,
  },

  props: {
    gridData: Array,
    currentShipping: Object,
    bankingData: Object,
    showdialog: Boolean,
    closepopup: Function,
    addSubmit: Function,
    editSubmit: Function,

  },

  data: function () {
    return {
      currentNameMethod: this.currentShipping.shippingMethodName ? this.currentShipping.shippingMethodName : '',
      currentItem: {

        _id: this.currentShipping._id ? this.currentShipping._id : '',
        shipsToCode: this.currentShipping.shipsToCode ? this.currentShipping.shipsToCode : this.bankingData.country || '',
        shipsTo: this.currentShipping.shipsTo ? this.currentShipping.shipsTo : 'domestic',
        shippingMethodName: this.currentShipping.shippingMethodName ? this.currentShipping.shippingMethodName : '',
        feePerOrder: this.currentShipping.feePerOrder ? this.currentShipping.feePerOrder : 0,
      },
    };
  },

  validators: {
    requiredStringTrim: {
      check: (val) => requiredStringTrim(val),
      message: 'Please enter a name for your shipping method',
    },
    duplicate: {
      check: function (name) {
        if(this._vm.gridData) {
          if(this._vm.currentItem._id && this._vm.currentNameMethod.toLowerCase().localeCompare(name.toLowerCase()) === 0) {
            return true;
          }

          return !this._vm.gridData.some(item => item.shippingMethodName.toLowerCase() === name.toLowerCase());
        }

        return true;
      },
      message: 'This Shipping Name already exists',
    },
    price: {
      check (price) {
        if(price === '') {
          return true;
        }
        if (price) {
          price = +price.replace(/[^\d.]/g, '');
          price = isNaN(price) ? 0 : parseFloat(price.toFixed(2));

          return price >= 0;
        }
      },
      message: 'Price cannot be set lower than zero',
    },
  },

  methods: {
    focusShippingRate () {
      if (+this.currentItem.feePerOrder === 0) {
        this.currentItem.feePerOrder = '';
      }
    },

    blurShippingRate () {
      if (this.currentItem.feePerOrder.length === 0) {
        this.currentItem.feePerOrder = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/global/style/colors';

.shipping-method-dialog  {
  .dialog-container {
    width: 475px;
  }

  .shipping-description {
    color: $color-cs-med-text;
  }

  .counry-select {
    width: 100%;
    height: 43px;
    background-color: #fff;
    margin-top: 0;
  }

  .dialog-footer__button--positive {
    width: 100px;
    margin-left: 16px;
    border: 1px solid $color-cs-red;
    min-width: 100px;
  }
 }

// TODO: this should be the same for all store dialogs, thus NOT defined here.
.popup-field {
  h3 {
    margin-bottom: 8px;
  }
}
</style>
