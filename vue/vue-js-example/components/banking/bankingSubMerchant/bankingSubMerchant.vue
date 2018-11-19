<template>
<validator name="validation">
    <h2>Merchant Account</h2>
    <form class="save-sub-merchantt-form banking-form"
      :class="!editStatus && 'disabled'"
      :class="greyedOut && 'greyed-out' ">
        <div class="left-col">
            <div class="field-banking">
                <label>First Name</label>{{form.firstName}}
            </div>
            <div class="field-banking">
                <label>Last Name</label>{{form.lastName}}
            </div>
            <div class="field-banking">
                <label>E-mail</label>{{form.email}}
            </div>
            <div class="field-banking">
                <label>Mobile Phone</label>{{form.mobileNumber}}
            </div>
            <div class="field registered-company-fields">
                <label>Business Name</label>
                <input name="merchantBusinessName" id="merchantBusinessName" type="text" spellcheck="false" placeholder="Business Name*" >
            </div>
            <div class="field-banking">
                <label>Street Address</label>{{form.address1}}
            </div>
            <div class="field-banking">
                <label>City</label>{{form.city}}
            </div>
            <div class="field-banking">
                <label>State</label>{{form.region}}
            </div>
            <div class="field-banking">
                <label>Zip Code</label>{{form.postalCode}}
            </div>
        </div>
        <div class="right-col">
            <div class="field-banking">
                <label>Date Of Birth</label>{{form.dateOfBirth}}
            </div>
            <div class="field-banking">
                <label>Tax ID</label>{{form.descriptor}}
            </div>
            <div class="field-banking">
                <label>Account Number</label>{{form.accountNumber | hideBankingNumber}}
            </div>
            <div class="field-banking">
                <label>Routing Number</label>{{form.routingNumber | hideBankingNumber}}
            </div>
            <div class="field-banking">
                <div class="checkbox">
                    <input id="get-agree" name="getAgree" type="checkbox" name="check" :checked="form.email" >
                    <label for="get-agree">I agree to the <span @click='toogleDialog("showDialog")' id="termsSpan" class="storeBankingTermSpan">Merchant Agreement</span></label>
                </div>
            </div>
        </div>
    </form>

    <div style="clear: both;"></div>

    <div id="legal-section-container" class="legal">
      <terms-of-sale
      v-if='termOfSaleLoaded'
      :term-of-sale='termOfSale'
      >
    </terms-of-sale>
    </div>
</validator>
</template>

<script>
import validator from 'vue-validator';
import termsOfSale from 'store/components/banking/termsOfSale/termsOfSale';

export default {
  components: {
    validator,
    termsOfSale,
  },
  props: {
    merchantInfo: Object,
    merchantId: String,
    addNewStatus: Boolean,
    greyedOut: Boolean,
    approvalStatus: Boolean,
    termOfSale: Object,
    termOfSaleLoaded: Boolean,
    toogleDialog: Function,
  },
  data () {
    return {
      editStatus: false,
      form: {
        accountNumber: this.merchantInfo !== undefined ? this.merchantInfo.accountNumber : '',
        address1: this.merchantInfo !== undefined ? this.merchantInfo.address1 : '',
        city: this.merchantInfo !== undefined ? this.merchantInfo.city : '',
        dateOfBirth: this.merchantInfo !== undefined ? this.merchantInfo.dateOfBirth : '',
        descriptor: this.merchantInfo !== undefined ? this.merchantInfo.descriptor : '',
        email: this.merchantInfo !== undefined ? this.merchantInfo.email : '',
        firstName: this.merchantInfo !== undefined ? this.merchantInfo.firstName : '',
        lastName: this.merchantInfo !== undefined ? this.merchantInfo.lastName : '',
        mobileNumber: this.merchantInfo !== undefined ? this.merchantInfo.mobileNumber : '',
        postalCode: this.merchantInfo !== undefined ? this.merchantInfo.postalCode : '',
        region: this.merchantInfo !== undefined ? this.merchantInfo.region : '',
        routingNumber: this.merchantInfo !== undefined ? this.merchantInfo.routingNumber : '',
      },
    };
  },
  created () {
    if (this.addNewStatus) {
      this.editStatus = true;
    }
  },
  watch: {
    merchantInfo: {
      handler: function () {
        this.form.accountNumber = this.merchantInfo !== undefined ? this.merchantInfo.accountNumber : '';
        this.form.address1 = this.merchantInfo !== undefined ? this.merchantInfo.address1 : '';
        this.form.city = this.merchantInfo !== undefined ? this.merchantInfo.city : '';
        this.form.dateOfBirth = this.merchantInfo !== undefined ? this.merchantInfo.dateOfBirth : '';
        this.form.descriptor = this.merchantInfo !== undefined ? this.merchantInfo.descriptor : '';
        this.form.email = this.merchantInfo !== undefined ? this.merchantInfo.email : '';
        this.form.firstName = this.merchantInfo !== undefined ? this.merchantInfo.firstName : '';
        this.form.lastName = this.merchantInfo !== undefined ? this.merchantInfo.lastName : '';
        this.form.mobileNumber = this.merchantInfo !== undefined ? this.merchantInfo.mobileNumber : '';
        this.form.postalCode = this.merchantInfo !== undefined ? this.merchantInfo.postalCode : '';
        this.form.region = this.merchantInfo !== undefined ? this.merchantInfo.region : '';
        this.form.routingNumber = this.merchantInfo !== undefined ? this.merchantInfo.routingNumber : '';
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/global/style/colors";

h2 {
  font-size: 24px;
  color: $color-cs-dark-text;
  font-family: Proxima Nova Regular;
  padding-bottom: 17px;
}

.banking-form {
  text-align: left;

  & .left-col {
    width: calc(50% - 10px);
    display: inline-block;
    float: left;
    margin-right: 20px;
  }

  & .right-col {
    display: inline-block;
    width: calc(50% - 10px);
  }
}

#legal-section-container {
  // sass-lint:disable-line no-ids
  position: relative;
  clear: both;
}

.registered-company-fields {
  display: none;
}

.field-banking {
  clear: both;
  line-height: 25px;
  margin: 15px 0 0;

  & label {
    color: $color-cs-med-gray;
    display: inline-block;
    padding-right: 10px;
    min-width: 130px;

    span {
      color: $color-cs-red;
    }
  }

  & input {
    width: auto;
    padding: 0;
    border: 0;
  }

  /* Checkbox for CS merchant agreement */
  & #get-agree + label {
    // sass-lint:disable-line no-ids
    &::before {
      top: 6px;
    }
  }
}

.validation-error-text {
  display: block;
  margin-left: 175px !important;
  font-size: 13px !important;
}

.save-sub-merchantt-form {
  &.greyed-out {
    background: #f2f2f2;
    opacity: 0.25;
  }
}
</style>
