<template lang="pug">
  .col-12.card-post
    .thumb
      router-link(to='/post/title-and-color-but-farm-123hu70')
        img(src='/images/sample.jpg' alt='alt of image')
    .title
      router-link(to='/post/title-and-color-but-farm-123hu70')
        | This is title of post
      .meta 
        | Posted by 
        router-link(to="/author/345rty") Yusuf Akhsan Hidayat
        | , 
        | 23 June 2018 - 23:00 UTH8
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>

<style lang="sass" scoped>
  @import '../../../design/sass/color'

  .card-post 
    border-top: 1px solid $color-gray-soft 
    padding: 0 0 1em 0
    display: inline-flex
    padding-bottom: 0
    margin-bottom: 1em
    .thumb
      img 
        width: 200px
    .title 
      padding: .9em 0 0 .9em
      text-transform: uppercase
      text-decoration: none
      a
        font-size: 1.1em
        font-weight: bold
        color: $color-black-medium
      .meta 
          font-size: .8em
          a 
            font-size: .8em
          color: $color-black-medium
</style>
