<template lang="pug">
  .col-12.card-post
    .thumb
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        img(:src="data.image.small" :alt="data.title")
    .title
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        | {{ data.title }}
      .meta 
        | By  
        router-link(:to="'/author/ + data.author.username'") {{ data.author.fullname }} 
        | | 
        | 23 June 2018 - 23:00 UTH8 
        | | 
        | {{ data.views }} Views
        | | 
        | 45 Comments
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: ["data"],
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
            font-size: 1em
            color: $color-gray-medium
          color: $color-gray-medium
</style>
