<template lang="pug">
  .static.bg-white
    .container
      .grid-center
        .col-6_md-12
          h1 This is Static Page
          p  updated 26 days ago
      .grid-center
        .col-6_md-12
          article
            img(src='/images/sample.jpg')
            h2 Introduction
            p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu dignissim ex. Morbi eu viverra dui. Nam sit amet ante malesuada, elementum nisl id, egestas nibh. Nam nisl libero, iaculis eget dui id, malesuada posuere tellus. Aliquam in purus at lorem commodo pulvinar. Donec iaculis ex in neque consectetur, sit amet placerat dui feugiat. Aenean eu sollicitudin nunc, sit amet tincidunt lectus. Suspendisse vestibulum ut erat ut ultricies. Nulla vel scelerisque tortor. Phasellus tempus ipsum quis arcu vehicula dignissim. Ut aliquam imperdiet placerat. Ut nec pretium arcu. Cras congue, nisl ut ullamcorper tincidunt, magna orci iaculis mauris, eget malesuada mauris eros condimentum ante. In iaculis turpis sit amet purus volutpat facilisis.
</template>

<script lang="ts">
import Vue from 'vue'
import { getData } from '../../../../internals/static-data'

export default Vue.extend({
  name: 'static-detail',
  // on component created
  created() {
    // console.log(data)
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.static
  h1 
    font-size: $size-text-large
  img 
    padding: 1em 0
    max-width: 100%
    text-align: center
  article 
    line-height: 1.8
    letter-spacing: .3px
    font-size: 1.1em
    br 
      display: block
      margin: 1em 0
      
</style>
