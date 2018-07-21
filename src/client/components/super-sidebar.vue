<template lang='pug'>
.super-sidebar 
  ul 
    li(:class="$route.name === 'new_post' ? 'active' : '' ") 
      router-link(to='/super/posts/new') + New Post
    li(:class="$route.name === 'post' ? 'active' : '' ") 
      router-link(to='/super/posts') Posts
    li(:class="$route.name === 'team' ? 'active' : '' ") 
      router-link(to='/super/team') Team
  .divider
  ul 
    li 
      a(href='javascript:;' v-on:click='handleLogout()') logout
</template>

<script lang='ts'>
import Vue from "vue"
import * as TYPES from "../vuex/types"
import toast from "../modules/toast"
import {mapState} from "vuex"

export default Vue.extend({
  name: "super-sidebar",

  methods: {
    handleLogout() {
      console.log("logout...")
      this.$store.dispatch(TYPES.LOGOUT)
    }
  },

  mounted() {
    console.log(this.$route.name)
  },

  watch: {
    ["auth.response"]():any {
      if (this.auth.response.status) {
        if (this.auth.response.status === 200) {
          toast("Logout success", "success")
          setTimeout(() => {
            location.reload()
          }, 1000)
        } else {
          toast(
            "Failed to logout, please try again",
            "error"
          )
        }
      }
    }
  },

  computed: {
    ...mapState(['auth'])
  }
})
</script>

<style lang='sass'>
  @import '../../design/sass/color'
  .super-sidebar
    ul 
      margin: 0
      padding: 0
      li 
        transition: all .5s ease
        list-style: none
        &.active 
          background-color: $color-gray-dark
        &:hover
          background-color: $color-gray-dark
          cursor: pointer
    color: $color-white-main 
    a
      display: block
      padding: 1em .5em
      color: $color-white-main 
    .divider 
      border-top: 1px solid $color-gray-soft
</style>
