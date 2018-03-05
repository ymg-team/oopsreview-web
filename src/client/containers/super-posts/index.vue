<template lang='pug'>
  .super-posts-list
    header-tag(
      title='All Posts'
    )
    post
</template>

<script lang='ts'>
import Vue from 'vue'
import header from '../../components/cards/header-tag.vue'
import post from '../../components/boxs/super-post.vue'

Vue.component('header-tag', header)
Vue.component('post', post)

export default Vue.extend({
  name: 'super-posts-list'
})
</script>