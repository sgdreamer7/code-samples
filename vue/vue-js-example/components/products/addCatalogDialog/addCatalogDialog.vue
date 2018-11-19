<template>
<dialog dialog-class="add-catalog-dialog" :show.sync="showdialog">
  <div class="add-catalog-popup-wrapper">
    <validator name="validation">
      <div class="popup-header">
        <icon name="icon_create-new"></icon>
        <h2>Add New Catalog</h2>
        <icon class="close-icon" name="icon_close" @click="closePopup"></icon>
      </div>

      <div class="popup-main">
        <form class="createPricesheetForm">
          <div class="popup-field">
            <h3>Catalog Name</h3>
            <input v-autofocus type="text" spellcheck="false" v-model="form.name | trim" v-validate:price-sheet-name="{ requiredStringTrim: true, duplicate: true }" name="name" id="priceSheetName" placeholder="ex: Engagements, Portraits, Weddings" autocomplete="off">
            <span class="validation-error-text" v-if="$validation.priceSheetName.requiredStringTrim && $validation.priceSheetName.touched">{{ $validation.priceSheetName.requiredStringTrim }}</span>
            <span class="validation-error-text" v-if="$validation.priceSheetName.duplicate && !$validation.priceSheetName.requiredStringTrim && $validation.priceSheetName.touched">{{ $validation.priceSheetName.duplicate }}</span>
          </div>

          <div class="popup-field">
            <h3>Fulfillment Options</h3>
            <div class="radio">
              <div class="radio-option">
                <input id="labFulfillment" class="lab-option" :class="{'disabled': currency !== 'usd'}" value="Lab Fulfillment" type="radio" v-model="form.fullFilmentOptions" name="fulFillmentOptions" :checked="currency !== 'usd' ? false : true">
                <label for="labFulfillment" :class="{'disabled': currency !== 'usd'}">
                  <span>Auto Fulfillment</span>
                  <knowledge-base-entry
                    v-if="currency === 'usd'"
                    key="store.products.catalog.auto-fulfillment"
                    hint-class="hint--medium hint--top hint--rounded hint--delay-100"
                    hint-message="Our trusted print lab will fulfill your orders, and we'll take care of everything for you. Click for more details."
                    icon-class="catalog-icon-v-align"
                    :icon-scale="0.8">
                  </knowledge-base-entry>
                  <knowledge-base-entry
                    v-else
                    :only-text="true"
                    text="(why is this disabled?)"
                    hint-class="hint--medium hint--top hint--rounded hint--delay-100"
                    key="store.products.add-catalog.no-usd-auto-fulfill-disabled"
                  >
                  </knowledge-base-entry>
                </label>
              </div>
              <div class="radio-option">
                <input id="selfFulfillment" value="Self Fulfillment" type="radio" v-model="form.fullFilmentOptions" name="fulFillmentOptions" :checked="currency !== 'usd' ? true : false">
                <label for="selfFulfillment">
                  Custom Fulfillment
                  <knowledge-base-entry key="store.products.catalog.self-fulfillment"
                      hint-class="hint--medium hint--top hint--rounded hint--delay-100"
                      hint-message="You will be responsible fulfilling orders for this catalog. Use the lab of your choice, or print yourself."
                      icon-class="catalog-icon-v-align"
                      :icon-scale="0.8"></knowledge-base-entry>
                </label>
              </div>
            </div>
          </div>

          <!-- NEW FEAT -->
          <!-- <div class="popup-field">
                <h3>Enable Order Review</h3>
                <v-select
                  :selected="selectOrderReviewAutoFul[0]"
                  :options="selfFulfillment ? selectOrderReviewSelfFul : selectOrderReviewAutoFul "
                  :searchable="false"
                  :show-labels="false"
                  placeholder="Order review"
                  key='value'
                  label='label'
                ></v-select>
            </div> -->


<!-- No need to ask what lab a user wants when we only offer one lab
          <div v-if="!selfFulfillment" class="popup-field">
            <h3>Choose Your Print Lab</h3>
            <v-select :selected="null" :options="labsForSelect" :searchable="false" :show-labels="false" placeholder="Select Lab" key='value' label='label' @select="selectLab" v-validate:lab="{ required: true }"></v-select>
            <span class='validation-error-text' v-if="$validation.lab.required && $validation.lab.touched">{{ $validation.lab.required }}</span>
          </div>

          <div v-else class="popup-field disabled">
            <h3>Choose Your Print Lab</h3>

            <div class="menu-dropdown" style="position:relative;">
              <p>Select Lab</p>
            </div>
          </div>
End Lab Selection removal-->

          <div class="popup-field lab-options" :class="selfFulfillment ? 'disabled' : ''">
            <h3>Lab Options</h3>

            <checkbox
              @update="updatePremiumPackaging"
            >
              <span class="label-text">Add Premium Packaging</span>
              <knowledge-base-entry key="store.products.catalog.premium.package"
                hint-class="hint--medium hint--top hint--rounded hint--delay-100"
                hint-message="Your client orders will be beautifully packaged prior to shipping! An additional service fee will apply for each order. (click for more details)"
                icon-class="catalog-icon-v-align"
                :icon-scale="0.8"></knowledge-base-entry>
            </checkbox>

            <checkbox
              @update="updateColorCorrection"
            >
              <span class="label-text">Add Color Correction</span>
              <knowledge-base-entry key=""
                hint-class="hint--medium hint--top hint--rounded hint--delay-100"
                hint-message="We suggest Color Correction if you have not calibrated your monitor for your chosen lab. Selecting color correction will increase your base cost of each print."
                icon-class="catalog-icon-v-align"
                :icon-scale="0.8"></knowledge-base-entry>
            </checkbox>
          </div>

          <div class="popup-field">
            <h3>Catalog Options</h3>

            <checkbox
              @update="updateDefaultPriceSheet"
            >
              <span class="label-text">Make this my default catalog</span>
            </checkbox>

            <checkbox
              @update="updateApplyToAllGalleries"
            >
              <span class="label-text">Apply to all current galleries that allow sales</span>
            </checkbox>
          </div>
        </form>
      </div>

      <div class="popup-footer" style="position:relative;">
        <button @click="submit(form)" :disabled="!$validation.valid" class="btn btn-selected">Save</button>
      </div>
    </validator>
  </div>
</dialog>
</template>

<script>
import { get } from 'lodash';
import validator from 'vue-validator';
import vSelect from 'global/components/select/select';
import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
import checkbox from 'global/components/checkbox';

export default {
  components: {
    checkbox,
    validator,
    vSelect,
    knowledgeBaseEntry,
  },

  props: {
    showdialog: Boolean,
    closepopup: Function,
    getLabs: Function,
    submit: Function,
    labs: Array,
    catalogData: [Object, Array],
  },

  data: function () {
    return {
      selectOrderReviewAutoFul: [{
        label: 'Off',
        value: 'off',
      }, {
        label: 'Prints & Products',
        value: 'prints_products',
      }, {
        label: 'Digital Files Only',
        value: 'digital_files_only',
      }, {
        label: 'Prints, Products and Digital Files',
        value: 'prints_products_and_digital_files',
      }, {
        label: 'Digital Files',
        value: 'digital_files',
      }],

      selectOrderReviewSelfFul: [{
        label: 'Off',
        value: 'off',
      }, {
        label: 'Digital Files Only',
        value: 'digital_files_only',
      }],
      selected: {
        value: '564a4f178c873fe563409629',
        label: 'WHCC',
      },

      form: {
        applyToAllGalleries: false,
        colorCorrection: false,
        premiumPackaging: false,
        defaultPriceSheet: false,
        fullFilmentOptions: '',
        labID: '564a4f178c873fe563409629',
        name: '',
      },
    };
  },

  computed: {
    // vuex ---------------
    knowledge () {
      return this.$store.state.appData.knowledge.entries;
    },

    user () {
      return this.$store.state.userData.user.data;
    },

    currency () {
      return get(this.user, 'accountingInfo.merchant.currency');
    },

    labsForSelect: {
      get: function () {
        let data = [];

        this.labs.map((lab) => {
          let obj = {};

          obj.value = lab._id;
          obj.label = lab.displayName;

          data.push(obj);
        });

        return data;
      },
    },

    selfFulfillment () {
      return this.form.fullFilmentOptions === 'Self Fulfillment';
    },
  },

  validators: {
    duplicate: {
      check (name) {
        if (!Array.isArray(this._vm.catalogData.priceSheets)) {
          return true;
        }

        return !this._vm.catalogData.priceSheets.some(({displayName}) =>
          displayName.toLowerCase() === name.toLowerCase());
      },

      message: 'This Catalog already exists',
    },

    labValidate: {
      check () {
        if (this._vm.selfFulfillment) {
          return true;
        } else {
          Vue.validator('required');
        }
      },

      message: 'Required field',
    },
  },

  methods: {
    updatePremiumPackaging ({ checked }) {
      this.form.premiumPackaging = checked;
    },

    updateColorCorrection ({ checked }) {
      this.form.colorCorrection = checked;
    },

    updateDefaultPriceSheet ({ checked }) {
      this.form.defaultPriceSheet = checked;
    },

    updateApplyToAllGalleries ({ checked }) {
      this.form.applyToAllGalleries = checked;
    },

    openExternalLink (link) {
      nw ? nw.Shell.openExternal(link) : window.open(link, '_blank');
    },

    openFilter (e) {
      $(e.target).parent().find('.dropdown').toggle();
    },

    closePopup () {
      this.closepopup();
    },

    selectLab (val) {
      if (val) {
        this.form.labID = val.value;

        this.$validate('lab', true, () => {
          this.$validation.lab.valid = true;
          this.$validation.lab.required = false;
        });
      }
    },
    learnAboutStoreProduct () {
      const key = 'store.products.catalog.store.faq';
      const url = this.knowledge.has(key) ? this.knowledge.get(key).url : {};
      window.oldAppUtils.navigateToUrl(url);
    },
  },

  created () {
    this.getLabs();
  },
};
</script>

<style lang="scss">

.catalog-icon-v-align {
  vertical-align: middle;
}

</style>

<style lang="scss" scoped>
@import 'src/global/style/colors';

.add-catalog-popup-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .close-icon {
    margin-left: 25px;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  .popup-main {
    overflow: auto;

    .popup-field {
      margin: 15px 20px;
    }
  }
}

.add-catalog-dialog { // sass-lint:disable-line no-mergeable-selectors

  .learn-more {
    color: #ff585d;
    cursor: pointer;
   }

  .popup-field {

    h3 {
      margin: 15px 0 13px;
    }

    &:first-child {
      h3 {
        margin-top: 0;
      }
    }

    .radio-option {
      display: block;
      margin-bottom: 10px;
    }

    .radio {
      label {
        margin: 0;

        &.disabled {
          // sass-lint:disable-block nesting-depth
          span {
            opacity: 0.5;
          }

          &::before {
            opacity: 0.5;
          }

          .knowledge-entry {
            opacity: 1;
            color: $color-cs-red;
            pointer-events: auto;
          }
        }
      }
    }
  }

  .checkbox {
    margin-bottom: 10px;

    & label {
      margin: 0;
    }
  }
}

</style>
