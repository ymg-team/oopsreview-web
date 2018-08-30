<template lang="pug">
  button.button(
    :disabled="loading"
    :class='button_type'
    :style='customStyle'
    v-on:click='onclick'
    type='button') 
    | {{ loading ? 'loading...' : value }}
</template>

<script lang="ts">
import Vue from 'vue'

const props = {
  type: {
    type: String,
    default: 'button'
  },
  button_type: {
    type: String,
    default: 'blue'
  },
  customStyle: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  value: {
    type: String
  },
  onclick: {
    type: Function,
    default() {
      return {}  
    }
  }
}

export default Vue.extend({
  name: 'oops-button',
  props
})
</script>

<style lang="sass">
@import '../../../design/sass/color'

.button 
  border: $color-gray-soft 1px solid
  cursor: pointer
  padding: .5em .8em
  font-size: 1.2em
  &:disabled, &[disabled] 
    cursor: default
    background-color: $color-gray-soft !important
  &.red
    color: $color-white-main
    background-color: $color-red-main
    &:hover
      background-color: $color-red-dark
  &.blue
    color: $color-white-main
    background-color: $color-blue-main
    &:hover
      background-color: $color-blue-dark
</style>
