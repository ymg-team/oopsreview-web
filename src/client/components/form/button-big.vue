<template lang="pug">
  router-link.button-big(:class='type' :to='to')
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
