<template>
  <dialog dialog-class="self-add-product-popup" :show.sync="showdialog" :on-close="closepopup" :small="true">
    <div class="add-product-popup-wrapper">
        <div class="popup-header">
            <icon name="icon_tag" scale="2"></icon>
            <h2>Select Product Type</h2>
        </div>
        <div class="popup-main">
            <div class="popup-field clearfix">
              <div
                @click="openPopup('productsAddProductDialog', {productCategory: 'Prints'})"
                class="product-type-box"
                :class="optionsPrint.length > 0 ? '' : 'disabled' "
              >
                <div class="product_type_icon"><icon name="icon_gallery-2" scale="5"></div>
                <div class="product_type_line"></div>
                <div class="product_type_text">Print</div>
              </div>
              <div
                @click="openPopup('productsAddProductDialog', {productCategory: 'Canvas'})"
                class="product-type-box"
                :class="optionsProduct.length > 0 ? '' : 'disabled' "
              >
                <div class="product_type_icon"><icon name="icon_image" scale="5"></icon></div>
                <div class="product_type_line"></div>
                <div class="product_type_text">Product</div>
              </div>

              <div
                @click="openPopup('productsAddEditDigitalProductDialog', {productCategory: 'Digital'} )"
                class="product-type-box"
              >
                <div class="product_type_icon"><icon name="icon_download" scale="5"></icon></div>
                <div class="product_type_line"></div>
                <div class="product_type_text">Digital</div>
              </div>

            </div>
        </div>
    </div>
  </dialog>
</template>

<script>
  import { toogleDialogAction } from 'dialogs/vuex/modules/dialogSwitches';

  export default {
    props: {
      showdialog: Boolean,
      closepopup: Function,
      catalogData: Array,

    },
    computed: {
      optionsPrint: function () {
        const options = this.catalogData.filter((product) => {
          return product.categoryName === 'Prints';
        });
        if (options) {
          return options;
        } else {
          return [];
        }
      },
      optionsProduct: function () {
        const options = this.catalogData.filter((product) => {
          return product.categoryName === 'Canvas';
        });
        if (options) {
          return options;
        } else {
          return [];
        }
      },
    },
    methods: {
      openPopup: function (dialog, data) {
        this.closepopup();
        this.openpopup({type: dialog, data});
      },
      openpopup (modal) {
        return toogleDialogAction(modal);
      },
    },
  };
</script>

<style lang="scss">
.self-add-product-popup {
  .dialog-container {
    width: 520px;
  }
}
</style>

<style scoped lang="scss">
.popup-main {
  height: calc(100% - 98px);
}


.popup-field {
  display: flex;
}

.product-type-box {
  flex-grow: 1;
  width: auto;
}
</style>
