<template lang="pug">
  .popular-post
    .container 
      .grid
        .col-8_sm-12.card-post-popular
          .grid
            .thumb.col-6
              router-link(to="/post/this-post-title-324efe3")
                .thumb-image(style='background-image:url(/images/sample.jpg)')
            .title.col-6
              router-link(to="/post/this-post-title-324efe3")
                h2 This Is Post title long and ready to ready, how about you
              small by Yusuf A.H.
        
        .col-4_sm-12.card-post-popular
          .thumb
            router-link(to="/post/this-post-title-324efe3")
              .thumb-image(style='background-image:url(/images/sample.jpg)') 
          .title
            router-link(to="/post/this-post-title-324efe3")
              h2 This Is Post title long and ready to ready, how about you
            small by 
              a(href='/user/234u7g234') Yusuf A.H.
        
        .col-4_sm-12.card-post-popular
          .thumb
            router-link(to="/post/this-post-title-324efe3")
              .thumb-image(style='background-image:url(/images/sample.jpg)') 
          .title
            router-link(to="/post/this-post-title-324efe3")
              h2 This Is Post title long and ready to ready, how about you
            small by 
              a(href='/user/234u7g234') Yusuf A.H.

        .col-8_sm-12.card-post-popular
          .grid
            .thumb.col-6
              router-link(to="/post/this-post-title-324efe3")
                .thumb-image(style='background-image:url(/images/sample.jpg)')
            .title.col-6
              router-link(to="/post/this-post-title-324efe3")
                h2 This Is Post title long and ready to ready, how about you
              small by Yusuf A.H.
        
        .col-4_sm-12.card-post-popular
          .thumb
            router-link(to="/post/this-post-title-324efe3")
              .thumb-image(style='background-image:url(/images/sample.jpg)') 
          .title
            router-link(to="/post/this-post-title-324efe3")
              h2 This Is Post title long and ready to ready, how about you
            small by Yusuf A.H.

        .col-4_sm-12.card-post-popular
          .thumb
            router-link(to="/post/this-post-title-324efe3")
              .thumb-image(style='background-image:url(/images/sample.jpg)') 
          .title
            router-link(to="/post/this-post-title-324efe3")
              h2 This Is Post title long and ready to ready, how about you
            small by Yusuf A.H.

        .col-4_sm-12.card-post-popular
          .thumb
            router-link(to="/post/this-post-title-324efe3")
              .thumb-image(style='background-image:url(/images/sample.jpg)') 
          .title
            router-link(to="/post/this-post-title-324efe3")
              h2 This Is Post title long and ready to ready, how about you
            small by Yusuf A.H.

      .popular-end
          strong Oopsreview 
          br 
          | We are software review specialist
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'popular-post-box'
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
          height: 180px
          .thumb-image 
            height: 100%
        .title 
          padding: .5em 
          h2, a 
            font-size: 1em
      &.col-8_sm-12
        .thumb-image
          height: 280px

  // popular-end style
  .popular-end 
    background-color: $color-blue-main
    color: $color-white-main 
    text-align: center 
    font-size: 1.3em 
    text-transform: uppercase
    padding: 2em 0

</style>
