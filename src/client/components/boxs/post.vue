<template lang="pug">
  .box-post
    .grid
      card 
      card 
      card  
      card  
      card  
      card  
    loading
</template>

<script lang="ts">
import Vue from 'vue'
import card from '../cards/post.vue'
import loading from '../cards/loading.vue'

Vue.component('card', card)
Vue.component('loading', loading)

export default Vue.extend({
  name: 'post-box'
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
</style>

