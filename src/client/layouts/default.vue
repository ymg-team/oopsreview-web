<template lang='pug'>
  div 
    top-navbar
    navbar(:keyword='$route.query.q || \'\'')
    router-view
    bottom-navbar
    toast
</template>

<script lang='ts'>
import Vue from "vue"
import navbar from "../components/navbar.vue"
import header from "../components/header.vue"
import footer from "../components/footer.vue"
import toast from "../components/toast.vue"
import { objToQuery } from "string-manager" 

Vue.component("navbar", navbar)
Vue.component("top-navbar", header)
Vue.component("bottom-navbar", footer)
Vue.component("toast", toast)

interface ToInterface {
  path: string,
  query: object
}

export default Vue.extend({
  name: "layout-default",
  watch: {
    $route(to: any) {
      const {path, query}: ToInterface = to
      let querystring = ''
      if(Object.keys(query).length > 0) {
        querystring += `?${objToQuery(query)}`
      }
      const url = path + querystring
      const win:any = window
      if(win.ga) {
        console.log('send ga')
        // ref : https://developers.google.com/analytics/devguides/collection/gajs/
       win.ga('send', 'pageview', url)
      }
    }
  }
})
</script>

<style lang='sass'>
  @import '../../design/sass/base'
  @import '../../design/sass/color'
  
  body
    color: $color-gray-dark
    a 
      color: $color-gray-medium
  .align-center 
    text-align: center 
  .text-muted 
    color: $color-gray-medium
  .no-padding
    padding: 0 !important
</style>
