<template lang='pug'>
div
  top-navbar
  .grid 
    .col-2_md-12
      super-sidebar
    .col-10_md-12.bg-white
      router-view
  bottom-navbar
  toast
</template>

<script lang='ts'>
import Vue from 'vue'
import sidebar from '../components/super-sidebar.vue'
import header from '../components/header.vue'
import footer from '../components/footer.vue'
import toast from "../components/toast.vue"

Vue.component('super-sidebar', sidebar)
Vue.component('top-navbar', header)
Vue.component('bottom-navbar', footer)
Vue.component('toast', toast)

export default Vue.extend({
  name: 'layout-super'
})

</script>

<style lang='sass'>
  @import '../../design/sass/base'
</style>
