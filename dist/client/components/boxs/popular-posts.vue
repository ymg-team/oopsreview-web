<template lang="pug">
  .popular-post
    .container 
      .grid(v-if="data.status && data.status === 200")

        // 1
        card-large(:data="data.result[0]")
        
        // 2
        card-small(:data="data.result[1]")
        
        // 3
        card-small(:data="data.result[2]")
        
        // 4
        card-large(:data="data.result[3]")
        
        // 5
        card-small(:data="data.result[4]")

        // 6
        card-small(:data="data.result[5]")

        // 7
        card-small(:data="data.result[6]")

      .popular-end
          strong Oopsreview 
          br 
          | We are software review specialist
</template>

<script lang="ts">
import Vue from 'vue'
import CardSmall from '../cards/post-small.vue'
import CardLarge from '../cards/post-large.vue'

Vue.component("card-small", CardSmall)
Vue.component("card-large", CardLarge)

export default Vue.extend({
  name: 'popular-post-box',

  props: ['data']
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
  .popular-post 
    background-color: #000
    padding-top: 2em
    .container
      border: 3px solid $color-blue-main
  .card-post-popular 
      padding: 0
      color: $color-white-main
      text-transform: uppercase
      font-weight: 800
      transition: all .5s ease
      &:hover
        background: $color-white-main 
        color: $color-black-main
        a 
          color: $color-black-main
      a 
        color: $color-white-main
        font-size: 1.5em
        &:hover 
          color: $color-gray-dark
      .thumb
        padding: 0
        .thumb-image 
          background-size: cover
      .title
        h2 
          margin: 0
        padding: 1em
        small, small a 
          font-size: 1em
      &.col-4_sm-12
        .thumb
          height: 220px
          .thumb-image 
            height: 100%
        .title 
          padding: .5em 
          h2, a 
            font-size: 1em
      &.col-8_sm-12
        .thumb-image
          height: 320px

  // popular-end style
  .popular-end 
    background-color: $color-blue-main
    color: $color-white-main 
    text-align: center 
    font-size: 1.3em 
    text-transform: uppercase
    padding: 2em 0

</style>
