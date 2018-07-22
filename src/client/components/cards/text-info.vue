<template lang="pug">
  .loading.align-center {{ text }}  
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'card-text-info',
  props: ['text']
})
</script>

<style lang="sass" scoped>
  @import '../../../design/sass/color'
  .loading 
    padding: 1em
    color: $color-gray-medium
    background: $color-gray-verysoft
    font-size: .8em
</style>
