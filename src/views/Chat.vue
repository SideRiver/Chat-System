<template>
  <div class="wrapper">
      <header class="header">
          <h1>Skillup Chat</h1>
      </header>
      <div class="message">
        <div class="message__container">
          <Message />
        </div>
      </div>
      <div class="form">
        <div class="form__container">
          <textarea class="form__textarea" />
          <button class="form__submit">送信する</button>
        </div>
      </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'Chat',
  components: {
    Message,
  },
}
</script>

<style lang="sass" scoped>
.wrapper
  color: $color-text-main
  scroll-behavior: smooth
  height: 100vh
  &::before
    content: ''
    width: 100vw
    height: 100vh
    position: fixed
    background: $color-bg-sub
    z-index: -1

.header
  background: $color-primary
  height: $header-height
  width: 100vw
  position: fixed
  top: 0
  z-index: 10
  h1
    text-align: center
    line-height: $header-height
    font-size: 28px
    color: $color-text-light

.message
  height: 100vh
  &__container
    background: $color-bg-main
    max-width: 1280px
    margin: 0 auto
    min-height: calc(calc(100vh - #{$header-height}) - calc(#{$form-height} + 24px))
    padding: $header-height 24px $form-height
  &__component
    margin: 10px 0

.form
  background: $color-primary
  width: 100%
  height: $form-height
  position: fixed
  bottom: 0
  z-index: 10

  &__container
    max-width: 1280px
    margin: 0 auto
    padding: 16px 32px
    line-height: $form-height
    display: grid
    grid-template-columns: 1fr 130px
    border-radius: 18px

  &__textarea
    background: $color-bg-main
    outline: none
    box-sizing: border-box
    border: none
    border-radius: 4px
    padding: 16px
    font-size: 16px
    line-height: calc( #{$form-height} - 80px )
    resize: none

  &__submit
    background: $color-accent
    height: 64px
    padding: 0 24px
    border-radius: 4px
    margin-left: 24px
    border: none
    outline: none
    border: 2px solid $color-secondary
    &:active
      background: darken($color-accent, 20%)

.message
  &-enter
    &-from
      opacity: 0
    &-active
      transition: all 500ms ease

  &-leave
    &-to
      opacity: 0
      transform: translateX(5vw)
    &-active
      transition: all 500ms ease
</style>