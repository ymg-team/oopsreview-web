<template lang="pug">
  button.button.blue(
    v-on:click='onclick'
    type='type') 
    | {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'

const props = {
  type: {
    type: String,
    default: 'button'
  },
  value: {
    type: String
  },
  onclick: {
    type: Function
  }
}

export default Vue.extend({
  name: 'oops-button',
  props
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/color'

.button 
  border: $color-gray-soft 1px solid
  cursor: pointer
  padding: .5em .8em
  font-size: 1.2em
  &.blue
    color: $color-white-main
    background-color: $color-blue-main
    &:hover
      background-color: $color-blue-dark
</style>
