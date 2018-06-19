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
        .col-12(style='padding-bottom: 0')
          buttonBig(button_type='blue' to='/posts' text='More Stories')
</template>

<script lang="ts">
import Vue from 'vue'
import popular from '../../components/boxs/popular-posts.vue'
import title from '../../components/cards/title.vue'
import post from '../../components/boxs/post.vue'
import sidebar from '../../components/sidebar.vue'
import buttonBig from '../../components/form/button-big.vue'

Vue.component('popular-box', popular)
Vue.component('card-title', title)
Vue.component('box-post', post)
Vue.component('sidebar', sidebar)
Vue.component('buttonBig', buttonBig)

export default Vue.extend({
  name: 'home'
})
</script>
