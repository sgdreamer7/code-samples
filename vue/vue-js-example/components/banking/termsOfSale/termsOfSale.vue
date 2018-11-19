<template>
  <div class="terms-of-sale">
    <span>Terms of Sale</span>
    <div class="field">
      <textarea  v-if="!withoutButton" class="text-area"
        v-model="form.termsOfSale"
      >
      </textarea>
      <textarea  v-if="withoutButton" class="text-area"
        v-model="formOfSale.termsOfSale"
      >
      </textarea>
    </div>
    <div v-if="!withoutButton" class="wrapper-btn">
      <button @click="updateTermsOfSale" type="button" class="bstrap-btn edit-btn" :disabled="!editStatus">
        <span>Save</span>
      </button>
    </div>
  </div>
</template>

<script>
import knowledgeBaseEntry from 'global/components/knowledgeBaseEntry';
import { updateTermsOfSaleAction } from 'store/vuex/modules/banking';

export default {
  components: {
    knowledgeBaseEntry,
  },

  props: {
    termOfSale: Object,
    formOfSale: Object,
    withoutButton: {
      type: Boolean,
      default: false,
    },
  },

  vuex: {
    actions: {
      updateTermsOfSaleAction,
    },
  },

  data () {
    return {
      form: {
        termsOfSale: this.termOfSale !== undefined ? this.termOfSale.termsAndSaleInfo : '',
      },
    };
  },

  computed: {
    editStatus () {
      if (this.termOfSale.termsAndSaleInfo) {
        return this.termOfSale.termsAndSaleInfo.localeCompare(this.form.termsOfSale);
      }
      if (this.form.termsOfSale !== '' && this.form.termsOfSale !== undefined) {
        return true;
      }

      return false;
    },
  },

  methods: {
    updateTermsOfSale () {
      this.updateTermsOfSaleAction(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/global/style/colors';

.terms-of-sale {
  width: 100%;
  margin-top: 50px;

  span {
    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    color: $color-cs-dusk;
    font-weight: 900;
  }

  .default-layout-icon {
    vertical-align: middle;
  }

  .text-area {
    height: 145px;
    max-width: 100%;
    width: 100%;
    margin: 0;
    overflow-y: scroll;
    resize: none;
    box-sizing: border-box;

    &:disabled {
      color: #9e9e9e;
      cursor: not-allowed;
    }
  }

  .wrapper-btn {
    text-align: left;

    .bstrap-btn {
      display: inline-block;
      margin-bottom: 0;
      font-weight: normal;
      text-align: center;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      user-select: none;
      padding: 7px 12px;
      font-size: 16px;
      line-height: 1.428571429;
      border-radius: 4px;

      &.edit-btn {
        margin-right: 8px;
        width: 140px;
        background-color: $color-cs-red;
        color: #fff;
        border: 1px solid rgba(153, 153, 153, 0.4);
      }

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      & > * { // sass-lint:disable-line no-universal-selectors
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
