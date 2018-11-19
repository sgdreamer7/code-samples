<template>
<dialog dialog-class="edit-catalog-popup" :show.sync="showdialog" :on-close='closePopup' :small='true'>
  <div class="edit-catalog-popup-wrapper">
    <validator name="validation">
      <div class="popup-header">
        <icon name="icon_edit"></icon>
        <h2>Edit Catalog</h2>
      </div>

      <div class="popup-main">
        <div class="popup-field">
          <h3>Catalog Name</h3>
          <input v-autofocus id="productPrice" name="productPrice" class="product-price-popup" type="text" spellcheck="false" placeholder="Sample Catalog" v-model='form.name | trim' detect-change="off" v-validate:price-sheet-name="{ requiredStringTrim: true, duplicate: true }">
          <span class='validation-error-text' v-if="$validation.priceSheetName.requiredStringTrim && $validation.priceSheetName.touched">{{ $validation.priceSheetName.requiredStringTrim }}</span>
          <span class='validation-error-text' v-if="$validation.priceSheetName.duplicate && !$validation.priceSheetName.requiredStringTrim && $validation.priceSheetName.touched">{{ $validation.priceSheetName.duplicate }}</span>
        </div>

        <div class="popup-field" v-if="!catalogData.currentItem.selfFulfillment">
          <h3>Lab</h3>
          <p class="self-heading">WHCC</p>
        </div>

        <div class="popup-field lab-options" v-if="!catalogData.currentItem.selfFulfillment">
          <h3>Lab Options</h3>

          <checkbox
            @update="updatePremiumPackaging"
            :checked="form.premiumPackaging"
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
            :checked="form.colorCorrection"
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
            :checked="form.defaultPriceSheet"
          >
            <span class="label-text">Make this my default catalog</span>
          </checkbox>

          <checkbox
            @update="updateApplyToAllGalleries"
            :checked="form.applyToAllGalleries"
          >
            <span class="label-text">Apply to all current galleries that allow sales</span>
          </checkbox>
        </div>
      </div>

      <div class="popup-footer" style="position:relative;">
        <button @click='closePopup' class="btn cancel">Cancel</button>
        <button @click='submit({pricesheetID: catalogData.currentItem._id, data: form})' :disabled='!$validation.valid' class="btn btn-selected">Save</button>
      </div>
    </validator>
  </div>
</dialog>
</template>

<script>
import {get} from 'lodash';
import validator from 'vue-validator';
import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
import checkbox from 'global/components/checkbox';

export default {
  components: {
    validator,
    knowledgeBaseEntry,
    checkbox,
  },

  props: {
    showdialog: Boolean,
    closepopup: Function,
    submit: Function,
    catalogData: Object,
  },

  data () {
    return {
      form: {
        premiumPackaging: get(this.catalogData.currentItem, 'premiumPackaging', false),
        applyToAllGalleries: this.catalogData.currentItem.applyToAllGalleries,
        colorCorrection: this.catalogData.currentItem.colorCorrection,
        defaultPriceSheet: this.catalogData.currentItem.defaultPriceSheet,
        name: this.catalogData.currentItem.displayName,
      },
    };
  },

  validators: {
    duplicate: {
      check (name) {
        if (this._vm.catalogData.priceSheets.length === 0) return true;
        if (name === this._vm.catalogData.currentItem.displayName) return true;

        for (var i = this._vm.catalogData.priceSheets.length - 1; i >= 0; i--) {
          if (this._vm.catalogData.priceSheets[i].displayName === name) {
            return false;
          }
        }

        return true;
      },

      message: 'This Catalog already exists',
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

    closePopup () {
      this.closepopup();
    },

    openExternalLink: url => nw ? nw.Shell.openExternal(url) : window.open(url, '_blank'),
  },
};

</script>
<style lang="scss" scoped>
@import 'src/global/style/colors';

.edit-catalog-popup {

  .popup-field {

    h3 {
      margin: 15px 0 13px;
    }

    &:first-child {
      h3 {
        margin-top: 0;
      }
    }

    .self-heading {
      text-align: justify;
    }
  }

  .checkbox {
    margin-bottom: 10px;

    label {
      margin: 0;
    }
  }

  .lab-options {

    .checkbox {

      .label-text {
        vertical-align: middle;
      }

      label {
        &::before {
          margin: 0;
        }
      }
    }
  }
}
</style>

<style style="scss">
.catalog-icon-v-align {
  vertical-align: middle;
}
</style>
