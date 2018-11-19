<template>
  <div class="cs-right-panel">
    <div class="store-started-section">
      <div class="profile-settings-header">
        <h1>How to start selling with us</h1>
      </div>

      <div class="content">
        <iframe
          class='iframe-video'
          width="100%"
          height="100%"
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'started',

    data () {
      return {
        videoUrl: 'https://www.youtube.com/embed/-DhzTulaqZk?rel=0&modestbranding=1',
      };
    },
  };
</script>

<style lang="scss" scoped>
@import "src/global/style/colors";
@import "src/global/style/layout-globals";
@import "src/global/style/account-settings";

.store-started-section {
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100% - 88px);
    padding: 35px;

    .iframe-video {
      max-width: 863px;
      max-height: 485px;
    }
  }
}
</style>
