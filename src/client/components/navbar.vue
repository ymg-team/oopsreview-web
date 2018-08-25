<template lang="pug">
  nav 
    .container-medium 
      div(v-if='search === false')
        .left
          ul.navbar
            li(v-for="n, key in popular_tags") 
              router-link(:to="'/tag/' + n.toLowerCase()" :key="key") {{ n.toUpperCase() }}
        .right
          a.icono-search(href='javascript:;' v-on:click='toggleSearch' style='-webkit-transform: scale(.8) rotate(40deg);-ms-transform: scale(.8) rotate(40deg);transform: scale(.8) rotate(40deg);')
      
      ul.search(v-if='search === true') 
        input#search-input(type='text' v-model='search_text' v-on:keydown='handleChangeSearch' placeholder='search here...')
        a.icono-cross(href='javascript:;' v-on:click='toggleSearch' style='position:absolute;margin-top:.5em;transform: translateX(-2em) rotate(45deg);')
    
    .fixed(:class='!show_navbar ? "hide" : "" ')
      router-link(to='/')
        img.logo(src='/images/logo-black-transparent.png')
          

</template>

<script lang="ts">
import Vue from 'vue'
import { router } from '../index'

const popular_tags = ['Android', 'iOS', 'Web', 'Windows', 'MacOS', 'Linux', 'Games', 'Developer']

export default Vue.extend({
  name: 'navbar',
  data() {
    return {
      search: false,
      search_text: '',
      show_navbar: false,
      popular_tags
    }
  },

  props: {
    keyword: {
      type: String,
      default: ''
    }
  },

  watch: {
    keyword(nv, ov) {
      if(nv == '') {
        this.search = false 
        this.search_text = ''
      }
    }
  },

  methods: {
    toggleSearch() {
      this.search = !this.search
      if(this.search === true) {
        setTimeout(() => {
          const search_input:HTMLElement | null = document.getElementById('search-input')
          if(search_input) search_input.focus()
        }, 300)
      } else {
        this.search_text = ''
        // if close on route /search - redirect to home
        if (this.$route.name == 'search') router.push({path: `/`})
      }
    },

    handleChangeSearch(e: KeyboardEvent) {
      if(e.keyCode == 13 && this.search_text != '') {
        router.push({path: `/search?q=${this.search_text}`})
      }
    },

    handleScroll() {
      document.addEventListener('scroll', (e) => {
        const position = window.scrollY
        if(position > 218) {
          // show navbar
          this.show_navbar = true
        }else {
          // hide navbar
          this.show_navbar = false
        }
      })
    }
  },

  mounted() {
    // user is doing search, and access /search page
    if(this.keyword != '') {
      this.search_text = this.keyword
      this.search = true
    }
    // add scroll listener
    this.handleScroll()
  }
})
</script>

<style lang="sass" scoped>
  @import '../../design/sass/color'
  nav 
    background-color: #000
    border-top: 1px solid $color-gray-medium
    border-bottom: 1px solid $color-gray-medium
    .fixed
      &.hide
        top: -150px  
      transition: all .5s ease
      position: fixed 
      width: 100vw
      padding: .5em .5em
      background: $color-white-transparent 
      top: 0
      z-index: 5
      img.logo 
        width: 150px

    ul.navbar 
      margin: 0
      padding: 1em 0
      display: inline-flex
      li 
        display: inline-block
        margin-right: 1em
        width: max-content
        a 
          transition: all .3s ease
          color: $color-white-main
          text-decoration: none
          font-size: 1em
          letter-spacing: 1.5px
          &:hover 
            color: $color-gray-dark
    .left
      overflow-x: auto
      display: inline-flex
      width: calc(100% - 35px)
    .right 
      display: inline-flex 
      width: 35px

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

