<template lang="pug">
  .error-box
    h1 {{ error_code || 500 }}
    h2 {{ error_message || 'Something Wrong' }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'error-box',
  props: ['error_code', 'error_message']
})
</script>

<style lang="sass" scoped>
  .error-box
    padding: 5em 0
    color: #FFF
    background-color: #000
    text-align: center

    h1 
      font-size: 5em
      margin: .1em
</style>
