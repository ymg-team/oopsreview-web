<template lang='pug'>
  div 
    top-navbar
    navbar(:keyword='$route.query.q || \'\'')
    router-view
    bottom-navbar
</template>

<script lang='ts'>
  import Vue from 'vue'
  import navbar from '../components/navbar.vue'
  import header from '../components/header.vue'
  import footer from '../components/footer.vue'

  Vue.component('navbar', navbar)
  Vue.component('top-navbar', header)
  Vue.component('bottom-navbar', footer)

  export default Vue.extend({
    name: 'layout-default'
  })
</script>

<style lang='sass'>
  @import '../../design/sass/base'
  @import '../../design/sass/color'
  
  body
    color: $color-gray-dark
    a 
      color: $color-gray-medium
  .align-center 
    text-align: center 
  .text-muted 
    color: $color-gray-medium
</style>
