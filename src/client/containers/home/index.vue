<template lang="pug">
  div 
    popular-box
    .container.bg-white 
      .grid 
        .col-8
          div(style='padding-top: .5em')
          box-post
        .col-4
          sidebar
</template>

<script lang="ts">
import Vue from 'vue'
import popular from '../../components/boxs/popular-posts.vue'
import title from '../../components/cards/title.vue'
import post from '../../components/boxs/post.vue'
import sidebar from '../../components/sidebar.vue'

Vue.component('popular-box', popular)
Vue.component('card-title', title)
Vue.component('box-post', post)
Vue.component('sidebar', sidebar)

export default Vue.extend({
  name: 'home'
})
</script>