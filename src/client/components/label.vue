<template lang="pug">
  span.label(:style="custom_style") {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'label',
  props: ['text', 'custom_style']
})
</script>

<style lang="sass" scoped>
  .label 
    padding: 2px 4px
    background: #b1b1b1
    border-radius: 4px
    color: #FFF
</style>
