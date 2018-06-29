<template lang="pug">
  router-link.button-big(v-if="to !== 'javascript:;'" :class='button_type' :to='to')
    | {{ text }}
  a.button-big(v-else-if="!to || to == 'javascript:;'" v-on:click="onclick" :class='button_type' href='javascript:;')
    | {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'

const props = {
  button_type: {
    type: String,
    default: 'blue'
  },
  to: {
    type: String,
    default: 'javascript:;'
  },
  text: {
    type: String,
    default: ''
  },
  onclick: {
    type: Function,
    default: () => {}
  }
}

export default Vue.extend({
  name: 'button-big',
  props
})
</script>


<style lang="sass" scoped>
  @import '../../../design/sass/color'
  @import '../../../design/sass/size'
  .button-big
    &.blue
      background-color: $color-blue-main
      &:hover
        background-color: $color-blue-dark
    &:hover
      background-color: $color-blue-dark
    transition: all .5s ease
    padding: 1.5em .5em
    font-size: $size-text-medium
    font-weight: 300
    display: block
    text-align: center
    background-color: $color-blue-main
    color: $color-white-main !important
    text-transform: uppercase
</style>
