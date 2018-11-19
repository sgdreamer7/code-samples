<template>
  <dialog dialog-class="add-digital-product-popup" :show.sync="showdialog" :on-close="closePopup" :small="true">
    <div class="add-digital-product-popup-wrapper">
      <validator name="validation">
        <div class="popup-header">
            <icon name="icon_download" scale=2 ></icon>
            <h2>{{editMode ? 'Edit' : 'Add'}} Digital Product</h2>
        </div>
        <div class="popup-main">
          <div class="popup-field">
            <h3 class="digital-title">Download Type</h3>
            <div class="image-radio">
              <div class="image-radio-inline">
                <input id="singleImage" value="singleImage" type="radio" v-model="form.downloadClass" name="downloadClass" v-show="false" v-validate:download-class="['requiredDownload']">
                <label for="singleImage">
                  <div><icon name="download-class-simple-cs" scale=3></icon></div>
                  <div class="image-radio-text">Single Image</div>
                </label>
              </div>
              <div class="image-radio-inline">
                <input id="allPhotos" value="allPhotos" type="radio" v-model="form.downloadClass" name="downloadClass" v-show="false"  v-validate:download-class>
                <label for="allPhotos">
                  <div><icon name="download-class-all-cs" scale=3></icon></div>
                  <div class="image-radio-text">All Photos</div>
                </label>
              </div>
            </div>
            <span class="validation-error-text error-text-center" v-if="$validation.downloadClass.requiredDownload && $validation.downloadClass.touched">{{ $validation.downloadClass.requiredDownload }}</span>
          </div>

          <div class="popup-field">
            <h3>Max Image Dimension</h3>
            <div class="product-size-options">
              <div class="product-size-popup">
                <input
                  class="size"
                  :class="{'touched': touchedSizeInput, 'invalid': $validation.productSize && $validation.productSize.productSize}"
                  name="size"
                  type="text"
                  spellcheck="false"
                  @blur="touchedSizeInput = true"
                  v-model="form.size"
                  placeholder="2100"
                  :disabled="form.originalSize"
                >
                <span v-if="!form.originalSize">
                  <input
                    v-show="false"
                    v-model="form.size"
                    v-validate:product-size="['productSize']"
                  >
                </span>
                pixels
                <knowledge-base-entry key=""
                  hint-class="hint--medium hint--bottom hint--rounded hint--delay-100"
                  hint-message="Sizing applies to longest edge of the image"
                  :icon-scale="0.8"></knowledge-base-entry>
              </div>
              <div class="product-size-popup">
                <checkbox
                  @update="updateOriginalSize"
                  :checked="form.originalSize"
                >
                  <span class="label-text">Original Size</span>
                </checkbox>
              </div>
            </div>
            <div class="help-text">
              <div class="error" v-if="$validation.productSize && $validation.productSize.productSize && touchedSizeInput">
                {{$validation.productSize.productSize}}
              </div>
            </div>
          </div>

          <div class="popup-field">
            <h3>Price</h3>
            <div class="currency-wrapper">
              <span class="currency-symbol" :class="currentCurrencyInfo.rtl ? 'rtl' : 'ltr'">{{currentCurrencyInfo.symbol}}</span>
              <input
                id="price"
                name="price"
                class="price-popup currency-input"
                type="text"
                spellcheck="false"
                v-model="form.totalCost"
                placeholder="0"
                v-input-mask mask-type="decimal" :options="maskOptionsCurrency"
                v-validate:product-price="['price']"
              >
              <span class="validation-error-text" v-if="$validation.productPrice.price && $validation.productPrice.touched">{{ $validation.productPrice.price }}</span>
            </div>
          </div>


        <div class="popup-field">
          <h3>Product Name</h3>
          <input
            id="productName"
            name="productName"
            class="product-name-popup"
            type="text"
            spellcheck="false"
            placeholder="Digital product"
            v-model="form.name | trim"
            v-validate:product-name="['required']">
          <span class="validation-error-text" v-if="$validation.productName.required && $validation.productName.touched">{{ $validation.productName.required }}</span>
        </div>

        </div>
        <div class="popup-footer" style="position:relative;">
            <button @click="closePopup" class="btn cancel">Cancel</button>
            <button
              @click="submit"
              class="btn btn-selected"
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
  import inputMask from 'global/directives/mask/mask';
  import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
  import currencyOptions from 'global/mixins/currencyOptions';
  import checkbox from 'global/components/checkbox';

  import { addProductAction, editProductAction } from 'store/vuex/modules/products';

  export default {
    mixins: [currencyOptions],

    components: {
      checkbox,
      validator,
      knowledgeBaseEntry,
    },
    directives: {
      inputMask,
    },
    props: {
      productData: Object,
      catalogData: Object,
      showdialog: Boolean,
      closepopup: Function,
    },
    data () {
      return {
        editMode: false,
        touchedSizeInput: false,
        form: {
          downloadClass: 'singleImage',
          totalCost: '',
          size: 0,
          originalSize: true,
          name: '',
        },
      };
    },
    validators: {
      requiredDownload: {
        check (value) {
          return value.length;
        },
        message: 'Please select download class',
      },
      productSize: {
        check (size) {
          return size >= 200;
        },
        message: 'Minimum size must be greater than 200px',
      },
      price: {
        check (price) {
          if (price == null) return true;

          return numeral(String(price)).value() > 0.0;
        },

        message: 'Digital Products must have a price greater than 0',
      },
    },

    watch: {
      'form.downloadClass': function () {
        this.getProductName();
      },
      'form.originalSize': function () {
        this.getProductName();
      },
      'form.size': function () {
        this.getProductName();
      },
    },

    methods: {
      updateOriginalSize ({ checked }) {
        this.form.originalSize = checked;
      },

      submit () {
        if (!this.$validation.valid) {
          this.$validate(true);

          return;
        }

        if (this.editMode) {
          this.editDigitalProduct();
        } else {
          this.addDigitalProduct();
        }
      },

      addDigitalProduct () {
        addProductAction(this.$store, {
          pricesheetID: this.catalogData.currentItem._id,
          data: {
            downloadClass: this.form.downloadClass,
            originalSize: this.form.originalSize,
            size: this.form.size,
            name: this.form.name,
            totalCost: parseFloat(this.form.totalCost) || 0.0,
            categoryName: 'Digital',
            isDigital: true,
          },
        });
      },

      editDigitalProduct () {
        editProductAction(this.$store, {
          pricesheetID: this.catalogData.currentItem._id,
          productID: this.form.productID,
          data: {
            downloadClass: this.form.downloadClass,
            originalSize: this.form.originalSize,
            size: this.form.size,
            name: this.form.name,
            totalCost: parseFloat(this.form.totalCost) || 0.0,
            categoryName: 'Digital',
            isDigital: true,
          },
        });
      },

      getProductName () {
        if (this.$validation.productName.untouched) {
          const classPart = this.form.downloadClass === 'singleImage' ? 'Single Image' : 'All Photos';
          const sizePart = this.form.originalSize ? 'Original' : `${this.form.size}px`;

          this.form.name = `${classPart} - ${sizePart}`;
        }
      },

      closePopup () {
        this.closepopup();
      },
    },

    created () {
      if (this.productData.productID) {
        this.form = Object.assign({}, this.productData);
        this.editMode = true;
      }
    },

    ready () {
      if (this.editMode) {
        this.$validate(true);
      } else {
        this.getProductName();
      }
    },
  };
</script>

<style lang="scss">
@import 'src/global/style/colors';

// .add-digital-product-popup {
//   .dialog-container {
//     width: 550px;
//   }
// }
</style>


<style scoped lang="scss">
@import 'src/global/style/colors';

.popup-field {

  &:first-child {
    margin-top: 20px;
  }

  &:last-child {
    margin-bottom: 25px;
  }

  .currency-wrapper,
  .product-name {
    text-align: left;
    margin-top: 13px;
  }

  .product-size-options {
    display: flex;
    align-items: center;
    margin-top: 13px;
  }

  .product-size-popup {
    flex-basis: 50%;

    &:first-child {
      display: flex;
      align-items: center;
    }

    &:last-child {
      text-align: right;
    }

    .size { // sass-lint:disable-line nesting-depth
      width: 100px;
      margin-right: 10px;
    }
  }

  .help-text {
    margin-top: 20px;
    margin-bottom: 15px;
    color: #999;
    font-size: 15px;

    .error {
      color: $color-cs-red;
      margin-top: 13px;
    }
  }

  .digital-title {
    margin-bottom: 15px;
  }

  .error-text-center {
    width: 100%;
    text-align: center;
  }
}

.image-radio {
  overflow: auto;
  display: flex;
  justify-content: space-around;
  margin-top: 13px;

  .image-radio-inline {
    flex-grow: 1;

    svg {
      width: 48px;
      height: 48px;

      // sass-lint:disable-block nesting-depth
      &:hover {
        color: $color-cs-red;
      }
    }

    label {
      text-align: center;
      color: #999;
      font-size: 14px;
      margin: 0;
      display: block;
      cursor: pointer;
      padding-left: 0;

      .image-radio-text { // sass-lint:disable-line nesting-depth
        margin-top: 13px;
      }
    }
  }

  input {
    &[type='radio'] {
      // sass-lint:disable-block nesting-depth
      &:checked {

        & + label {
          .image-radio-text,
          svg {
            color: $color-cs-red;
          }
        }
      }
    }

    & + label {
      // sass-lint:disable-block nesting-depth
      &::before {
        display: none;
      }
    }
  }
}
</style>
