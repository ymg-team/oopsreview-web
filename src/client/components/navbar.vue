<template lang="pug">
  nav 
    .container-medium 
      ul.navbar(v-if='search === false')
        li 
          router-link(to='/tag/android') MOBILE
        li
          router-link(to='/tag/android') DESKTOP
        li
          router-link(to='/tag/web') WEB
        li
          router-link(to='/tag/web') DEVELOPER
        li(style='float:right;margin:0;margin-top:-.4em;') 
          a.icono-search(href='javascript:;'  v-on:click='toggleSearch' style='-webkit-transform: scale(.8) rotate(40deg);-ms-transform: scale(.8) rotate(40deg);transform: scale(.8) rotate(40deg);')
      ul.search(v-if='search === true') 
        input#search-input(type='text' v-model='search_text' v-on:keydown='handleChangeSearch' placeholder='search here...')
        a.icono-cross(href='javascript:;' v-on:click='toggleSearch' style='position:absolute;margin-top:.5em;transform: translateX(-2em) rotate(45deg);')
</template>

<script lang="ts">
  import Vue from 'vue'
  import { router } from '../index'

  export default Vue.extend({
    name: 'navbar',
    data() {
      return {
        search: false,
        search_text: ''
      }
    },
    methods: {
      toggleSearch() {
        this.search = !this.search
        if(this.search === true)
          setTimeout(() => {
            (document.getElementById('search-input')).focus()
          }, 300)
        else 
          this.search_text = ''
      },

      handleChangeSearch(e: Object={}) {
        console.log(e.keyCode, this.search_text)
        if(e.keyCode == 13 && this.search_text != '') {
          router.push({path: `/search?q=${this.search_text}`})
        }
      }
    }
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
          font-size: 1em
          letter-spacing: 1.5px
          &:hover 
            color: $color-gray-dark

    ul.search
      margin: 0
      padding: .25em 0
      input[type='text']
        &:focus
          outline: none
        width: 100%
        background: transparent
        border: none
        padding: .8em 0
        color: #FFF
        font-size: 1em
</style>

