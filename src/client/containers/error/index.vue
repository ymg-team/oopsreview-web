<template lang="pug">
  .bg-black
    .container.error-page 
      .grid 
        .col-12.error-page-details
          h1 404
          h2 PAGE NOT FOUND
        .col-12.error-page-footer 
          | Are you lost ?
          br
          | Just click above link or 
          router-link(to='/') back to home

</template>

<script lang="ts">
import Vue from 'vue'
import navbar from '../../components/navbar.vue'

Vue.component('navbar', navbar)

export default Vue.extend({
  name: 'error-page'  
})
</script>

<style lang="sass" scoped>
  @import '../../../design/sass/color'
  .error-page 
    padding: 5em 0
    text-align: center
    h1 
      font-size: 6em
      margin: 0
    .error-page-footer 
      color: $color-gray-soft
      a 
        color: $color-gray-soft
</style>
