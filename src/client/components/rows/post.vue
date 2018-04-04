<template lang='pug'>
  .row-post
    router-link(to='/super/post/23') 
      h2 This title of post 
    p lorem lipsum of the text and iam ready to use to other lorem lipsum of the text and iam ready to use to other lorem lipsum of the text and iam ready to use to other lorem lipsum of the text and iam ready to use to other ...
    small 
      | by 
      a(href='') Yusuf Akhsan H. 
      | last edited 3 hours ago
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'row-post'
})
</script>

<style lang='sass'>
@import '../../../design/sass/color'
.row-post
  padding-left: 1.5em
  padding-bottom: 1em
  border-bottom: 1px solid $color-gray-verysoft
  &:last-child 
    border-bottom: none
  small 
    a 
      color: $color-gray-medium
    color: $color-gray-medium
</style>