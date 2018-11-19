<template>
  <div class="empty-list"  @click='addNewItem'>
    <div class="empty-list-wrapper">
      <div class="add-new">
        <icon size="62" class="icon" name="icon_create-new"></icon>
      </div>
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      /**
       * Icon name, display in center
       * @default 'plus'
       * @type {String}
       */
      icon: {
        type: String,
        default: 'icon_create-new',
      },
      /**
       * The message which informs that the list is empty
       * @default 'plus'
       * @type {String}
       */
      message: {
        type: String,
        default: 'Create Item',
      },
      /**
       * The text to be displayed on the button
       * @default 'plus'
       * @type {String}
       */
      buttonText: {
        type: String,
        default: 'Add new',
      },
      /**
       * Adding function (closure)
       * @required
       * @type {Function}
       */
      addNewItem: {
        type: Function,
        required: true,
      },
    },
  };
</script>

<style scoped lang="scss">
@import 'src/global/style/colors';

.empty-list {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .empty-list-wrapper {
    text-align: center;
    margin-bottom: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.8;
    }

    .add-new {
      width: 232px;
      height: 196px;
      background-color: rgba(139, 204, 193, 0.16);
      border-radius: 12px;
      color: #8bccc1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;

      .icon {
        width: 62px;
        height: 62px;
      }
    }

    .message {
      opacity: 0.5;
      font-family: Avenir;
      font-size: 30px;
      line-height: 1;
      letter-spacing: 0.8px;
      color: #3e5071;
    }

    .empty-list-icon {
      width: 128px;
      height: 128px;
      color: $color-cs-med-text;
      cursor: pointer;
    }

    .empty-list-text {
      font-family: 'Proxima Nova Regular';
      color: $color-cs-med-text;
      font-size: 1.25rem;
      line-height: 3;
    }

    .empty-list-button {
      font-family: 'Proxima Nova Regular';
      color: $color-cs-pearl;
      font-size: 1rem;
      text-align: left;
      background-color: $color-cs-legacy-blue;
      padding: 15px 30px;
      border: 0;
      border-radius: 3px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
