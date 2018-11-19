<template>
  <dialog dialog-class="discount-codes-popup" :show.sync="showdialog" :small="true">
    <div class="discount-popup-wrapper">
      <validator name="validation">
        <div class="popup-header">
          <h2>{{discountData.index != undefined ? 'Edit' : 'Add'}} Discount Code</h2>
        </div>
        <div class="popup-main">
          <div class="editProductForm">
            <div class="popup-field">
              <h3>Name this Discount Code</h3>
              <span class="discount-codes__popup-field__hint">This name will not be shown to your client.</span>
              <input
                v-autofocus
                name="discountName"
                type="text"
                spellcheck="false"
                placeholder="ex: Summer Print Sale"
                v-model='form.name | trim'
                v-validate:discount-name="['requiredStringTrim']">
              <span class='validation-error-text' v-if="$validation.discountName.requiredStringTrim && $validation.discountName.touched">{{ $validation.discountName.requiredStringTrim }}</span>
            </div>

            <div class="popup-field">
              <h3>Code</h3>
              <span class="discount-codes__popup-field__hint">Your client must enter this code during checkout.</span>
              <span class="button-wrapper">
                <input
                  name="discountKey"
                  type="text"
                  spellcheck="false"
                  placeholder="ex: SUMMER50"
                  v-model='form.key | trim'
                  v-validate:discount-key="['requiredStringTrim']">
                <button @click="generateCode" class="btn">Generate</button>
              </span>
            <span class='validation-error-text' v-if="$validation.discountKey.requiredStringTrim && $validation.discountKey.touched">{{ $validation.discountKey.requiredStringTrim }}</span>
            </div>

            <div class="popup-field">
              <div class="discount-header">
                <h3>Apply Discount To</h3>

                <div class="discount-checkboxes">
                  <div class="radio">
                    <input id="discountType1" type="radio" name="discountType" v-model="form.type" value="order"
                    />
                    <label for="discountType1">Subtotal</label>
                  </div>

                  <div class="radio">
                    <input id="discountType2" type="radio" name="discountType" v-model="form.type"  value="shipping"
                    >
                    <label for="discountType2">Shipping</label>
                  </div>
                  <div class="radio">
                    <input id="discountType3" type="radio" name="discountType" v-model="form.type"  value="digital"
                    >
                    <label for="discountType3">Digital Sales</label>
                  </div>
                </div>
              </div>
              <div class="apply-discount-wrapper">
                <div class="apply-discount-input-wrapper" v-if="typeDiscountIsPercent">
                  <div class="currency-wrapper">
                    <input
                    v-el:discount
                    class="apply-discount-input"
                    :class="{'touched': $validation.discountValue.touched, 'invalid': $validation.discountValue.invalid}"
                    type="text"
                    spellcheck="false"
                    placeholder="25%"
                    @blur="validate"
                    :value="(discountData.index !== undefined) && ( (currentDiscount.format === '%') ? currentDiscount.value * 100 : `$${currentDiscount.value}` )"
                    v-input-mask :options="maskOptionsPersentDiscount"/>
                    <input
                    type="text"
                    spellcheck="false"
                    class="input-helper"
                    v-model="form.value"
                    v-validate:discount-value="{ requiredStringTrim: true, min: 0, max: 1 }"/>
                  </div>
                </div>
                <div class="apply-discount-input-wrapper" v-else>
                  <div class="currency-wrapper">
                    <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
                    <input
                      v-el:discount
                      class="apply-discount-input currency-input"
                      :class="{'touched': $validation.discountValue.touched, 'invalid': $validation.discountValue.invalid }"
                      type="text"
                      spellcheck="false"
                      placeholder="9.99"
                      :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
                      @blur="validate"
                      :value="(discountData.index !== undefined) && ( (currentDiscount.format === '%') ? currentDiscount.value * 100 : `$${currentDiscount.value}` )"
                      v-input-mask mask-type="decimal" :options="maskOptionsCurrencyDiscount"/>
                    </div>
                  <input
                    type="text"
                    spellcheck="false"
                    class="input-helper"
                    v-model="form.value"
                    v-validate:discount-value="{ requiredStringTrim: true }"/>
                </div>


                  <div class="switch">
                    <v-switch-2
                      :model.sync="typeDiscountIsPercent"
                      :false-text="`amount (${currentCurrencySymbol})`"
                      true-text="%"
                    ></v-switch-2>
                  </div>

              </div>
                <span class='validation-error-text' v-if="$validation.discountValue.requiredStringTrim && $validation.discountValue.touched">{{ $validation.discountValue.requiredStringTrim }}</span>
                <span class='validation-error-text' v-if="($validation.discountValue.min || $validation.discountValue.max) && $validation.discountValue.touched">Allowable value from 0% to 100%</span>
            </div>

            <div class="l-horizontal l-justify-between">
              <div class="popup-field">
                <h3>Code Expiration</h3>
                <datepicker
                  class="datapicker"
                  placeholder="optional"
                  :value="form.expire"
                  :config="datapickerOptions"
                  :clear-icon="true"
                  @update="updateDate"
                >
                </datepicker>
              </div>

              <div class="popup-field">
                <h3>Minimum Order</h3>
                <div class="currency-wrapper minimum-order-input">
                  <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
                  <input
                    type="text"
                    spellcheck="false"
                    class="currency-input"
                    placeholder="0"
                    :dir="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'"
                    v-model='form.orderLimit'
                    v-input-mask mask-type="decimal" :options="maskOptionsCurrency"/>
                </div>
              </div>

              <div class="popup-field">
                <h3 class="label-with-tooltip">Max # of Uses</h3>
                <knowledge-base-entry
                  key="store.discount.add-discount.max-of-use"
                  hint-class="hint--medium hint--top-left hint--rounded hint--delay-100"
                  icon-class="catalog-icon-v-align"
                  :icon-scale="0.8"></knowledge-base-entry>
                <input type="text" spellcheck="false" placeholder="optional" v-model='form.usageLimit' >
              </div>
            </div>
          </div>
        </div>
        <div class="popup-footer" style="position:relative;">
          <button @click='closePopup' class="btn cancel">Cancel</button>
          <button v-if='discountData.index !== undefined' :disabled='!$validation.valid' @click="editSubmit({id: form._id, data: form, index: discountData.index})" class="btn btn-selected">Save</button>
          <button v-else :disabled='!$validation.valid' @click.stop="addSubmit(form)" class="btn btn-selected">Save</button>
        </div>
      </validator>
    </div>
  </dialog>
</template>

<script>
  import inputMask from 'global/directives/mask/mask';
  import validator from 'vue-validator';
  import vSwitch2 from 'global/components/switch2';
  import currencyOptions from 'global/mixins/currencyOptions';
  import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
  import datepicker from 'global/components/datepicker';
  import { generateCode } from 'global/utils/tools';

  export default {
    mixins: [currencyOptions],

    components: {
      validator,
      vSwitch2,
      knowledgeBaseEntry,
      datepicker,
    },

    directives: {
      inputMask,
    },

    props: {
      currentDiscount: Object,
      currentDiscountIndex: Number,
      showdialog: Boolean,
      closepopup: Function,
      addSubmit: Function,
      editSubmit: Function,
      discountData: Object,
    },

    data () {
      return {
        form: {
          _id: this.discountData.index !== undefined ? this.currentDiscount._id : '',
          expire: this.discountData.index !== undefined ? this.currentDiscount.expire : '',
          format: this.discountData.index !== undefined ? this.currentDiscount.format : '',
          key: this.discountData.index !== undefined ? this.currentDiscount.key : '',
          name: this.discountData.index !== undefined ? this.currentDiscount.name : '',
          timesUsed: this.discountData.index !== undefined ? this.currentDiscount.timesUsed : '',
          type: this.discountData.index !== undefined ? this.currentDiscount.type : 'order',
          value: this.discountData.index !== undefined ? this.currentDiscount.value : '',
          usageLimit: this.discountData.index !== undefined ? this.currentDiscount.usageLimit : '',
          orderLimit: this.discountData.index !== undefined ? this.currentDiscount.orderLimit : '',
        },

        datapickerOptions: {
          minDate: new Date().setHours(0,0,0,0),
          altInput: true,
          altFormat: 'm/d/Y',
          dateFormat: 'Z',
        },

        typeDiscountIsPercent: this.discountData.index !== undefined && this.currentDiscount.format === '%',

      };
    },

    watch: {
      typeDiscountIsPercent () {
        this.form.value = '';
        this.$els.discount.value = '';
        this.$nextTick(() => {
          this.$validate('discountValue', true);
        });
      },
    },

    computed: {
      // Vuex Getters ----------------------------------------------------------
      currentCurrencyInfo () {
        return this.$store.state.appData.currency.currentCurrenciesInfo;
      },

      // Computed ----------------------------------------------------------------

      currentCurrencySymbol () {
        if (this.currentCurrencyInfo && this.currentCurrencyInfo.symbol) {
          return this.currentCurrencyInfo.symbol;
        } else {
          return '$';
        }
      },
      maskOptionsPersentDiscount () {
        return {
          mask: ['9{1,3}[.99]%'],
          rightAlign: false,
          greedy: false,
          autoUnmask: true,
          showMaskOnHover: false,
          onBeforeWrite: (event, valueArr) => {
            if (event.target) {
              this.form.format = '%';
              if (valueArr.length === 0 || valueArr[0] === '_' || valueArr[1] === '_' || !valueArr[0]) {
                this.form.value = '';
              } else {
                this.form.value = +valueArr.join('').replace(/^\.|\d+\..*\.|[^\d.{1}]/,'') / 100;
              }
              this.$validate('discountValue', true);
            }
          },
          definitions: {
            '.': {
              validator: '[.]',
              cardinality: 1,
            },
          },
        };
      },
      maskOptionsCurrencyDiscount () {
        const rightAlign = this.currentCurrencyInfo.rtl;
        const digits = this.currentCurrencyInfo.fraction_size;

        const options = {
          prefix: '',
          suffix: '',
          digits,
          rightAlign,
          placeholder: '0',
          autoUnmask: true,
          showMaskOnHover: false,
          showMaskOnFocus: false,
          digitsOptional: true,
          integerDigits: 4,
          radixPoint: '.',
          groupSeparator: ',',
          autoGroup: true,
          onBeforeWrite: (event, valueArr) => {
            if (event.target) {
              this.form.format = '$';
              if (valueArr.length === 0 || valueArr[0] === '_' || valueArr[1] === '_' || !valueArr[0]) {
                this.form.value = '';
                this.$els.discount.value = '';
              } else {
                let value = +valueArr.join('').replace(/^\.|\d+\..*\.|[^\d.{1}]/,'');
                this.form.value = value.toFixed(digits);
                this.$els.discount.value = value.toFixed(digits);
              }
              this.$validate('discountValue', true);
            }
          },
          oncleared: () => { this.value = 0; },
        };

        return options;
      },
    },
    methods: {
      updateDate (date) {
        this.form.expire = date;
      },

      generateCode () {
        this.form.key = generateCode(8);
      },

      validate () {
        this.$validate('discountValue', true);
      },
      closePopup: function () {
        this.closepopup();
      },
    },
  };
</script>

<style lang="scss">
@import 'src/global/style/colors';

.discount-codes-popup {
  .dialog-container {
    width: 560px;
    max-height: 100%;

    .l-justify-between {
      margin-bottom: 25px;
    }
  }
}
</style>

<style lang="scss" scoped>
@import 'src/global/style/colors';

.discount-codes-popup { // sass-lint:disable-line no-mergeable-selectors
  .popup-field {
    width: 100%;
    margin: 0;
    padding: 30px 20px 0;

    .button-wrapper {
      display: flex;
      width: 100%;

      .btn {
        margin: 0 0 0 9px;
        height: 42px;
      }
    }

    .datapicker,
    .minimum-order-input {
      margin-top: 10px;
    }

    input[type='text'] {
      width: 100%;

      &.disabled { // sass-lint:disable-line nesting-depth
        opacity: 0.5;
        pointer-events: none;
      }
    }

    h3 {
      padding-right: 20px;

      &.label-with-tooltip {
        padding: 0;
        vertical-align: text-bottom;
      }
    }

    .discount-header {
      display: flex;
      justify-content: space-between;

      .discount-checkboxes {
        justify-content: space-between;
        align-items: baseline;
        display: flex;
        flex-direction: row;
        float: right;

        // sass-lint:disable-block nesting-depth
        .radio {
          label {
            margin: 0 0 0 15px;
          }
        }
      }
    }

    .apply-discount-wrapper {
      display: flex;
      margin-top: 8px;

      .apply-discount-input-wrapper {
        display: flex;
        width: 100%;
      }

      .switch {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-left: 30px;
      }
    }
  }
}

.discount-codes__popup-field__hint {
  margin-top: 5px;
  float: right;
  font-size: 13px;
  color: $color-cs-light-text;
}

.input-helper {
  display: none;
}
</style>
