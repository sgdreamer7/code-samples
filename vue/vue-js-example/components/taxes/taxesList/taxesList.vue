<template>
  <table id="productList">
    <thead>
      <tr>
          <th>Tax</th>
          <th>Rate</th>
          <th>Total Rate</th>
          <th>On Shipping</th>
          <th>On Digital</th>
          <th></th>
          <th></th>
      </tr>
    </thead>
    <tbody id="taxCountryList">
      <tr>
       <td class="tax-reagion">{{currentTaxes.country}}</td>
       <td class="tax-rate">{{currentTaxes.taxRate}}%</td>
       <td class="tax-total">-</td>
       <td class="tax-shipping">{{currentTaxes.taxShipping ? "Yes": "No"}}</td>
       <td class="tax-digital">{{currentTaxes.taxDigital ? "Yes": "No"}}</td>
       <td class="taxes-edit"  @click='openEditTaxesAddEditTaxDialog'><div class="inline-icon"><icon name="icon_edit"></icon></div></td>
       <td class="taxes-delete" @click="openTaxesDeleteTaxDialog"><div class="inline-icon"><icon name="icon_trash"></icon></div></td>
      </tr>

      <tr v-for="region in currentTaxes.regionTax" class="subregion">
       <td class="tax-reagion">{{region.stateName}}</td>
       <td class="tax-rate">{{region.taxRate}}%</td>
       <td class="tax-total">{{region.totalTax}}%</td>
       <td class="tax-shipping">{{region.taxShipping ? "Yes": "No"}}</td>
       <td class="tax-digital">{{region.taxDigital ? "Yes": "No"}}</td>
       <td
        class="taxes-edit"
        @click="openTaxesAddRegionDialog(region)"
        >
          <div class="inline-icon">
            <icon name="icon_edit"></icon>
          </div>
        </td>
       <td
          class="taxes-delete"
          @click="openTaxesDeleteRegionDialog(region)";
        >
          <div class="inline-icon">
            <icon name="icon_trash"></icon>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

  export default {
    props: {
      currentTaxes: Object,
      openEditTaxesAddEditTaxDialog: Function,
      openTaxesDeleteTaxDialog: Function,
    },
    methods: {
      openTaxesAddRegionDialog (region) {
        toogleDialogAction({type: 'taxesAddRegionDialog', data: region});
      },
      openTaxesDeleteRegionDialog (region) {
        toogleDialogAction({type: 'taxesDeleteRegionDialog', data: {taxID: this.currentTaxes._id, regionTaxID: region.regionTaxID } });
      },
    },
  };
</script>

<style lang="scss" scoped>

.taxes-edit,
.taxes-delete {
  text-align: right;
  cursor: pointer;

  svg {
    height: 16px;
    width: 16px;
  }
}

.taxes-delete {
  width: 35px;
}

</style>
