<template lang='pug'>
  .super-posts-list
    header-tag(
      title='All Posts'
    )
    //- searh post by title
    input-text(name='search' placeholder='search post')
    //- post list
    post
</template>

<script lang='ts'>
import Vue from 'vue'
import header from '../../components/cards/header-tag.vue'
import post from '../../components/boxs/super-post.vue'
import inputtext from '../../components/form/input-text.vue'

Vue.component('header-tag', header)
Vue.component('post', post)
Vue.component('input-text', inputtext)

export default Vue.extend({
  name: 'super-posts-list'
})
</script>
