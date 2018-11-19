<template>
  <dialog dialog-class="bulkmarkup-popup" :show.sync="showdialog" :on-close='closePopup' :small='true'>
    <div class="bulkmarkup-popup-wrapper">
      <validator name="validation">
        <div class="popup-header">
            <h2>Bulk Markup</h2>
        </div>
        <div class="popup-main">
          <div class="popup-field">
              <h3>Markup by Percentage</h3>
              <input name="markupPercent" id="markupPercent" type="text" spellcheck="false" v-model='form.markup' placeholder="Enter Markup value" v-validate:markup="['requiredStringTrim']">
              <p>
                  All of the prices in this catalog will be set to the cost of the product times the markup percentage followed by any rounding you’d like to appy.
              </p>
          </div>
          <div class="popup-field" style='margin-bottom: 28px;'>
              <h3>Round Prices Up To:</h3>
              <v-select
                :selected="0.00"
                :options="roundData"
                :searchable="false"
                :show-labels="false"
                placeholder="0"
                @select="selectRound"
              ></v-select>
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
  import validator from 'vue-validator';
  import vSelect from 'global/components/select/select';

  export default {
    components: {
      validator,
      vSelect,
    },
    props: {
      showdialog: Boolean,
      closepopup: Function,
      catalogData: Object,
      submit: Function,
    },
    data () {
      return {
        roundData: ['0', '0.99', 'No Rounding'],
        form: {
          roundTo: 0.00,
          markup: 300,
        },
      };
    },
    methods: {
      selectRound (round) {
        if (round) {
          const roundTo = round === this.roundData[2] ? round : +round;
          this.form.roundTo = roundTo;
        } else {
          this.form.roundTo = 0;
        }
      },
      closePopup: function () {
        this.closepopup();
      },
    },
  };
</script>

<style lang="scss" scoped>

input,
.multiselect-wrapper {
  margin: 13px 0;
}

p {
  margin-bottom: 40px;
}

</style>
