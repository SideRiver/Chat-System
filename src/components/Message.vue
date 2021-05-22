<template>
  <div>
      <div class="container">
          <img class="icon" :src="icon" />
          <!-- <img class="icon" v-bind:src="icon"/> -->
          <div class="content">
              <span class="displayName">{{ displayName }}</span>
              <div class="card">{{ content }}</div>
          </div>
          <div class="timestamp">
              <span>{{ date }}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Message',
    data() {
        return{
            content:
                '山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引き越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。',
            displayName: 'Taro Tanaka',
            timestamp: new Date(Date.now()),
            icon: 'https://gyazo.com/2d0ced47431388015ad62926f5106fc6.png',
            isMine: false,
        }
    },
    computed: {
        date(){
            return this.timestamp.toLocaleString()
        }
    }
}
</script>

<style lang="sass" scoped>
.container
  margin: 0 auto 0 0
  &__isMine
    margin: 0 0 0 auto !important

  color: $color-text-main
  display: grid
  grid-template-columns: 56px 1fr 1px
  grid-template-areas: "ga-icon ga-content ga-timestamp"
  @include mq(md)
    grid-template-columns: 56px 1fr
    grid-template-rows: 1fr 1em
    grid-template-areas: "ga-icon ga-content" "_ ga-timestamp"
  &__isMine
    grid-template-columns: 1px 1fr 0px
    grid-template-areas: "ga-timestamp ga-content _"
    @include mq(md)
      grid-template-columns: 1fr 0px
      grid-template-rows: 1fr 1em
      grid-template-areas: "ga-content ga-icon" "ga-timestamp _"

  width: 900px
  @include mq(xl)
    width: 700px
  @include mq(lg)
    width: 500px
  @include mq(md)
    width: 400px
  @include mq('sm')
    width: 300px

.icon
  grid-area: ga-icon
  width: 48px
  height: 48px
  border-radius: 100%
  margin:
    top: 16px

.content
  grid-area: ga-content
  position: relative

.chips
  position: absolute
  top: 0
  right: 6px
  transform: translateY(-50%)
  >button
    width: 36px
    height: 36px
    border-radius: 100%
    border: 0
    padding: 0
    margin: 0 2px

.displayName
  font-size: 0.8em
  padding: 12px

.card
  padding: 12px
  margin-top: 4px
  background: $color-secondary
  &__isMine
    background: $color-primary-lighten
  border-radius: 10px
  line-height: 1.35em

.timestamp
  grid-area: ga-timestamp
  position: relative
  >span
    white-space: nowrap
    position: absolute
    bottom: 0
    left: 0
    font-size: 0.8em
    color: $color-text-sub
    margin: 0 8px
  &__isMine
    >span
      left: inherit
      right: 0
</style>