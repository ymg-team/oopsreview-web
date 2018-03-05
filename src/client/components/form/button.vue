<template lang="pug">
  button.button.blue(
    :class='button_type'
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
  button_type: {
    type: String,
    default: 'blue'
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
