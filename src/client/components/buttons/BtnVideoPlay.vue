<template lang="pug">
  span.btn-play(:class="size === 'big' ? 'big' : '' ")
    i.icono-play
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "button-play",
  props: ["size"]
})
</script>


<style lang="sass" scoped>
  @import '../../../design/sass/color'
  .btn-play
    &.big 
      padding: 20px 50px 20px
      width: 30px
      height: 40px
      margin-left: -60px
      margin-top: -40px
      .icono-play
        transform: scale(2) 
    &:hover 
      background: $color-gray-dark
    position: absolute
    top: 50%
    padding: 4px 8px 4px
    background: $color-blue-main
    border-radius: 8px
    width: 40px
    height: 32px
    text-align: center
    left: 50%
    margin-left: -26px
    margin-top: -29px
    cursor: pointer
    transition: background .5s ease
</style>
