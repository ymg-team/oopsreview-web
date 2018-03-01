<template lang='pug'>
  div 
    top-navbar(size='small')
    navbar
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
    name: 'layout-error'
  })
</script>

<style lang='sass'>
  @import '../../design/sass/base'
</style>