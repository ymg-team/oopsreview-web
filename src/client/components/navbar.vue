<template lang="pug">
  nav 
    .container-medium 
      ul.navbar 
        li 
          router-link(to='/tag/android') ANDROID
        li
          router-link(to='/tag/android') iOS
        li
          router-link(to='/tag/web') WEB
        li
          router-link(to='/tag/web') WINDOWS
        li
          router-link(to='/tag/web') MACOS
        li
          router-link(to='/tag/web') CLOUD
        li
          router-link(to='/tag/web') DEVELOPER
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({

  })
</script>

<style lang="sass" scoped>
  @import '../../design/sass/color'
  nav 
    background-color: #000
    border-top: 1px solid $color-gray-medium
    border-bottom: 1px solid $color-gray-medium
    ul.navbar 
      margin: 0
      padding: 1em 0
      li 
        display: inline-block
        margin-right: 1em
        a 
          transition: all .3s ease
          color: $color-white-main
          text-decoration: none
          font-size: 1.2em
          letter-spacing: 1.5px
          &:hover 
            color: $color-gray-dark
</style>

