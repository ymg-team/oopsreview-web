<template lang="pug">
.oopsreview-loader-wrapper(:className="size")
  .oopsreview-loader
</template>

<script lang="ts">
import Vue from "vue"

const props = {
  size: {
    type: String,
    default: "black"
  }
}

export default Vue.extend({
  props
})
</script>


<style lang="sass" scoped>
@import '../../../design/sass/color'

.oopsreview-loader-wrapper
  padding: 5em
  display: flex
  align-items: center
  justify-content: center

// ref : https://codepen.io/yussan/pen/oMrxeL
.oopsreview-loader
  width: 10em
  height: 3em
  // border: 0.3em solid $color-gray-soft
  border-radius: 3em
  font-size: 20px
  position: relative

  &:before 
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 3em
    height: 3em
    border-radius: 50%
    background-color: $color-gray-soft
    animation: shift 1.5s linear infinite

@keyframes spin
  to 
    transform: rotate(360deg)

@keyframes shift
  50% 
    left: 7em
</style>

