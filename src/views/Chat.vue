<template>
  <div class="wrapper">
    <header class="header">
      <h1>Skillup Chat</h1>
    </header>
    <div class="message">
      <div class="message__container" ref="container">
        <transition-group name="message" tag="div">
          <Message
            class="message__component"
            v-for="message in messages"
            :key="message.id"
            :content="message.content"
            :icon="message.icon"
            :timestamp="message.timestamp"
            :displayName="message.displayName"
            :isMine="message.isMine"
            @editMessage="editMessage(message.id)"
            @deleteMessage="deleteMessage(message.id)"
          />
        </transition-group>
      </div>
    </div>
    <div class="form">
      <div class="form__container">
        <textarea
          class="form__textarea"
          v-model="inputText"
          plaseholder="メッセージを入力"
          @keyup="keyup"
        />
        <button class="form__submit" @click="submit">送信する</button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
import {
  postMessage,
  deleteMessage,
  updateMessage,
  setMessageListener,
} from '@/firebase/api.js'

export default {
  name: 'Chat',
  props: {
    user: Object,
  },
  components: {
    Message,
  },
  data() {
    return {
      inputText: '',
      messages: [],
      isEditMode: false,
      editTarget: '',
    }
  },
  methods: {
    submit() {
      if (this.inputText === '') return
      if (this.isEditMode) {
        updateMessage(this.editTarget, this.inputText)
        this.isEditMode = false
        this.editTarget = ''
      } else {
        postMessage(this.user, this.inputText)
      }
      this.inputText = ''
    },
    added(message) {
      this.checkSender(message)
      this.messages.push(message)
      this.$nextTick(() => {
        const elm = this.$refs.container
        window.scrollTo({
          top: elm.clientHeight,
          left: 0,
          behavior: 'smooth',
        })
      })
    },
    modified(message) {
      this.checkSender(message)
      const idx = this.messages.findIndex((e) => e.id === message.id)
      this.messages.splice(idx, 1, message)
    },
    removed(id) {
      const idx = this.messages.findIndex((e) => e.id === id)
      this.messages.splice(idx, 1)
    },
    checkSender(message) {
      if (message.uid === this.user.uid) {
        message.isMine = true
      } else {
        message.isMine = false
      }
    },
    keyup(e) {
      if ((e.keyCode === 13 && e.ctrlKey) || (e.keyCode === 13 && e.metaKey)) {
        this.submit()
      }
    },
    deleteMessage(id) {
      deleteMessage(id)
    },
    editMessage(id) {
      this.isEditMode = true
      this.editTarget = id
      const content = this.messages.find((e) => {
        return e.id === id
      }).content
      this.inputText = content
    },
  },
  created() {
    setMessageListener(this.added, this.modified, this.removed)
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
