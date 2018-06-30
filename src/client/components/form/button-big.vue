<template lang="pug">
  router-link.button-big(
    v-if="to !== 'javascript:;'" :class="button_type + (loading ? ' loading ' : '')" 
    :disabled="loading" 
    :to='to')
    | {{ loading ? 'loading...' : text }}
  button.button-big(
    v-else-if="!to || to == 'javascript:;'" 
    v-on:click="onclick" :class="button_type + (loading ? ' loading ' : '')" 
    :disabled="loading")
    | {{ loading ? 'loading...' : text }}
</template>

<script lang="ts">
import Vue from "vue"

const props = {
  button_type: {
    type: String,
    default: "blue"
  },
  loading: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: "javascript:;"
  },
  text: {
    type: String,
    default: ""
  },
  onclick: {
    type: Function,
    default: () => {}
  }
}

export default Vue.extend({
  name: "button-big",
  props
})
</script>


<style lang="sass" scoped>
  @import '../../../design/sass/color'
  @import '../../../design/sass/size'
  .button-big
    width: 100% 
    border: none
    cursor: pointer
    &.blue
      background-color: $color-blue-main
      &.loading 
        background-color: $color-gray-verysoft !important
        color: $color-gray-medium !important
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
