<template>
  <dialog dialog-class="delete-popup" :show.sync="showdialog" :on-close='closePopup' :small='true'>
    <validator name="validation">
      <div v-if="type === 'region'" class="popup-header">
        <icon :name="dialogData.regionTaxID ? 'icon_edit' : 'icon_create-new'" scale=2></icon>
        <h2 v-text="dialogData.regionTaxID ? 'Edit Region Tax' : 'Add Region Tax'"></h2>
      </div>
      <div v-else class="popup-header">
        <icon :name="this.dialogData.country ? 'icon_edit' : 'icon_create-new'" scale=2></icon>
        <h2 v-text="this.dialogData.country ? 'Edit Country' : 'Add Country'"></h2>
      </div>
      <div class="popup-main">
        <div class="popup-field" :class="editMode ? 'disabled' : ''">
          <h3 v-text="type === 'region'? 'Region' : 'Country'"></h3>
          <v-select
            :class="{'touched': $validation.region.touched, 'invalid': $validation.region.required}"
            :selected="selected"
            :options="regions"
            :max-height="215"
            :searchable="true"
            :show-labels="false"
            @update="selectRegion"
            :on-close="validate"
            label='name'
            key='code'
            placeholder="Select Region">
          </v-select>
          <input type="text" spellcheck="false" name="region" v-show="false" v-model="selected" v-validate:region = "['required']">
          <span class='validation-error-text' v-if="$validation.region.required && $validation.region.touched">{{ $validation.region.required }}</span>
        </div>
        <div class="popup-field">
          <h3>Tax Rate</h3>
          <input
            type="text"
            spellcheck="false"
            id="tax-rate"
            placeholder="Example: 1.25%"
            v-input-mask :options="maskOptions"
            v-model="sendForm.taxRate"
            v-validate:rate = "['requiredStringTrim']">
          <span class='validation-error-text' v-if="$validation.rate.requiredStringTrim && $validation.rate.touched">{{ $validation.rate.requiredStringTrim }}</span>
        </div>
        <div class="popup-field">
          <h3>Options</h3>

          <checkbox
            @update="updateTaxShipping"
            :checked="!!sendForm.taxShipping"
          >
            <span class="label-text">Apply Tax to Shipping</span>
          </checkbox>

          <checkbox
            @update="updateTaxDigital"
            :checked="!!sendForm.taxDigital"
          >
            <span class="label-text">Apply Tax to Digital Sales</span>
          </checkbox>

          <checkbox
            v-if="type === 'region'"
            @update="updateAddFederal"
            :checked="!!sendForm.addFederal"
          >
            <span class="label-text">When applicable, add this regional tax rate to the country tax rate for client orders</span>
          </checkbox>
        </div>
      </div>
      <div v-if="type === 'region'" class="popup-footer">
        <button @click='closePopup' class="btn cancel">Cancel</button>
        <button @click='submit({countryTaxId: currentTaxes._id, data: sendForm})' :disabled='!$validation.valid' class="btn btn-selected">Save</button>
      </div>
      <div v-else class="popup-footer">
        <button @click='closePopup' class="btn cancel">Cancel</button>
        <button v-if="dialogData._id" @click='editSubmit({taxId: dialogData._id, data: sendForm})' :disabled='!$validation.valid' class="btn btn-selected">Save</button>
        <button v-else @click='submit(sendForm)' :disabled='!$validation.valid' class="btn btn-selected">Save</button>
      </div>
    </validator>
  </dialog>
</template>

<script>
  import validator from 'vue-validator';
  import inputMask from 'global/directives/mask/mask';
  import vSelect from 'global/components/select/select';
  import checkbox from 'global/components/checkbox';

  export default {
    components: {
      checkbox,
      vSelect,
      validator,
    },
    directives: {
      inputMask,
    },
    props: {
      showdialog: Boolean,
      regions: Array,
      allRegions: Array,
      currentTaxes: Object,
      dialogData: Object,
      submit: Function,
      editSubmit: Function,
      closepopup: Function,
      type: String,
    },

    data () {
      return {
        selected: null,
        checkedNames: [],
        maskOptions: {
          mask: '9{1,3}[.999]%',
          rightAlign: false,
          greedy: false,
          placeholder: '0',
          definitions: {
            '.': {
              validator: '[.]',
              cardinality: 1,
            },
          },
          autoUnmask: true,
        },
        form: {
          addFederal: this.dialogData.addFederal ? this.dialogData.addFederal : 0,
          countryID: this.currentTaxes && this.currentTaxes.countryID,
          stateCode: this.dialogData.stateCode ? this.dialogData.stateCode : '',
          stateID: this.dialogData.stateID ? this.dialogData.stateID : '',
          taxDigital: this.dialogData.taxDigital ? this.dialogData.taxDigital : 0,
          taxRate: this.dialogData.taxRate ? this.dialogData.taxRate : '',
          taxShipping: this.dialogData.taxShipping ? this.dialogData.taxShipping : 0,
        },
        formTax: {
          countryCode: this.dialogData.countryCode ? this.dialogData.countryCode : '',
          taxDigital: this.dialogData.taxDigital ? this.dialogData.taxDigital : 0,
          taxRate: this.dialogData.taxRate ? this.dialogData.taxRate : '',
          taxShipping: this.dialogData.taxShipping ? this.dialogData.taxShipping : 0,
        },
      };
    },

    computed: {
      sendForm () {
        return this.type === 'region' ? this.form : this.formTax;
      },

      editMode () {
        return Object.keys(this.dialogData).length;
      },
    },

    ready () {
      if (this.type === 'region') {
        this.selected = this.dialogData.stateID ? this.allRegions.find(region => region._id === this.dialogData.stateID) : null;
      } else {
        this.selected = this.dialogData.countryID ? this.allRegions.find(region => region._id === this.dialogData.countryID) : null;
      }
      if (Object.keys(this.dialogData).length > 0) {
        this.validate();
      }
    },

    methods: {
      updateTaxShipping ({ checked }) {
        this.sendForm.taxShipping = checked ? 1 : 0;
      },

      updateTaxDigital ({ checked }) {
        this.sendForm.taxDigital = checked ? 1 : 0;
      },

      updateAddFederal ({ checked }) {
        this.sendForm.addFederal = checked ? 1 : 0;
      },

      closePopup () {
        this.closepopup();
      },

      validate () {
        this.$nextTick(() => {
          this.$validate('region', true);
        });
      },

      selectRegion (region) {
        if (!this.editMode) {
          this.selected = region;
        }
        if (region) {
          const {_id, code} = region;
          if (this.type === 'region') {
            this.form.stateCode = code;
            this.form.stateID = _id;
          } else {
            this.formTax.countryCode = code;
          }
          this.validate();
        }
      },
    },
  };
</script>

<style scoped lang="scss">
.checkbox {
  height: auto;
  min-height: 19px;
}
</style>
