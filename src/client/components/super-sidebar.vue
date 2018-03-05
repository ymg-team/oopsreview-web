<template lang='pug'>
.super-sidebar 
  ul 
    li(v-bind:class='{ active: $route.name==\'new-post\' }') 
      router-link(to='/super/posts/new') + New Post
    li(v-bind:class='{ active: $route.name==\'post\' }') 
      router-link(to='/super/posts') Posts
    li(v-bind:class='{ active: $route.name==\'team\' }') 
      router-link(to='/super/team') Team
  .divider
  ul 
    li 
      a(href='javascript:;') logout
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'super-sidebar',
  created() {
    console.log()
  }
})
</script>

<style lang='sass'>
  @import '../../design/sass/color'
  .super-sidebar
    ul 
      margin: 0
      padding: 0
      li 
        transition: all .5s ease
        list-style: none
        padding: 1em .5em
        &.active 
          background-color: $color-gray-dark
        &:hover
          background-color: $color-gray-dark
          cursor: pointer
    color: $color-white-main 
    a
      color: $color-white-main 
    .divider 
      border-top: 1px solid $color-gray-soft
</style>