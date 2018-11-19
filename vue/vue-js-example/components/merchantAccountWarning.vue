<template lang="html">
  <div class="hello-bar">
    <span class="hello-message">
      Your Store is deactivated until you add a payment service in the Banking section
    </span>
    <button-ui
      class="hello-button"
      @click.stop="goToBanking">
        Add one now
    </button-ui>
  </div>
</template>

<script>
import buttonUi from 'global/components/buttons/buttonUi';

export default {
  components: {
    buttonUi,
  },

  methods: {
    goToBanking () {
      this.$router.go({
        path: '/store/banking',
      });
    },
  },

};
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.hello-bar {
  width: 100%;
  height: 57px;
  background-color: rgba(#f5a623, 0.18);
  font-family: Avenir-Medium;
  letter-spacing: 0.2px;
  font-size: 14px;
  line-height: 14px;

  .hello-message {
    display: block;
    float: left;
    margin-left: 29px;
    margin-top: 23px;
    color: #b0781e;
  }

  .hello-button {
    background-color: $color-cs-red;
    width: 197px;
    height: 39px;
    float: right;
    margin-right: 48px;
    margin-top: 9px;
    color: $color-cs-white;
  }
}

</style>
