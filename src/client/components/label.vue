<template lang="pug">
  span.label(:style="custom_style") {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'label-oopsreview',
  props: ['text', 'custom_style']
})
</script>

<style lang="sass" scoped>
  @import "../../design/sass/color"
  .label 
    padding: 2px 4px
    background: $color-gray-soft
    border-radius: 4px
    color: #FFF
</style>
