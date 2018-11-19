<template>
  <div class="store-leftpanel">
    <div class="heading">
      <h1>Taxes</h1>
      <div @click="openAddTaxesAddEditTaxDialog" class="add-catalog hvr-grow">
        <icon class="add-tax-icon" name="icon_create-new"></icon>
      </div>
    </div>
    <div class="leftpanel-list">
      <div v-for="taxes in taxesList" @click="swichTaxes($index)" class="list-item" :class="currentTaxesIndex === $index ? 'selected-item' : ''">
        <p class="item-name">{{taxes.country}}</p>
      </div>
    </div>
  </div>
  <div class="taxes-list cs-right-panel">
    <div class="store-header">
      <h2>{{currentTaxes.country}}</h2>
      <div class="header-icons">
        <div @click='openEditTaxesAddEditTaxDialog'>
          <icon name="icon_edit" id="taxesEdit"></icon>
        </div>
        <div @click='openTaxesDeleteTaxDialog'>
          <icon name="icon_trash" id="taxesDlt"></icon>
        </div>
      </div>
      <div class="actions-right">
        <div class="cs-button" :class="!regions.length ? 'disabled' : '' " @click="openTaxesAddRegionDialog">
          <icon class="add-region-icon" name="icon_create-new"></icon>
          Add Region
        </div>
      </div>
    </div>
    <div class="store-table">
      <taxes-list :current-taxes="currentTaxes" :open-edit-taxes-add-edit-tax-dialog="openEditTaxesAddEditTaxDialog" :open-taxes-delete-tax-dialog="openTaxesDeleteTaxDialog">
      </taxes-list>
    </div>
  </div>
</template>

<script>
import taxesList from 'store/components/taxes/taxesList/taxesList';
import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';


export default {
  components: {
    taxesList,
  },
  props: {
    regions: Array,
    taxesList: Array,
    currentTaxes: Object,
    currentTaxesIndex: Number,
    swichTaxes: Function,
  },
  watch: {
    taxesData: {
      handler: function () {
      },
      deep: true,
    },
  },
  methods: {
    openAddTaxesAddEditTaxDialog () {
      toogleDialogAction({type: 'taxesAddEditTaxDialog', data: 'add'});
    },
    openTaxesAddRegionDialog () {
      toogleDialogAction({type: 'taxesAddRegionDialog', data: 'add'});
    },
    openEditTaxesAddEditTaxDialog () {
      toogleDialogAction({type: 'taxesAddEditTaxDialog', data: this.currentTaxes});
    },
    openTaxesDeleteTaxDialog () {
      toogleDialogAction({type: 'taxesDeleteTaxDialog'});
    },
  },
};
</script>
<style scoped lang="scss">
@import 'src/global/style/colors';
@import 'src/global/style/store-common';


.taxes-page {
  & .store-table {
    height: calc(100% - 155px);
  }

  & .common {
    color: $color-cs-dark-text;
    margin-bottom: 15px;
    word-wrap: break-word;
  }
}

.taxes-country-list {
  overflow: visible;
  overflow-y: auto;
  flex-grow: 1;
  margin-left: -10px;

  & p {
    color: #9b9a9f;
    margin-bottom: 5px;
  }
}

.add-tax-icon {
  width: 21px;
  height: 21px;
}

.add-region-icon {
  width: 18px;
  height: 18px;
}
</style>
