<template lang="pug">
  .app-card.grid
    .col-6_sm-12.no-padding(style="padding-right:10px !important")
      strong 
        a(href="javascript:;") {{ toCamelCase(app.name) }} 
      | by 
      strong
        a(href="javascript:;") {{ toCamelCase(app.vendor_name) }}
      br 
      | {{ app.description }}
      br
      strong Category: 
      | {{ app.categories }}
      br
      strong Website: 
      a(:href="app.link" target="_blank") {{ app.link }}
      br
    .col-6_sm-12.no-padding(style="padding-right:10px !important")
      strong Oopsreview Rating Overall : 4/5
      br
      | Design : 4/5
      br 
      | Easy to Use : 4/5
      br
      |Features : 4/5
      br
      | Stable : 5/5


</template>

<script lang="ts">
import Vue from "vue"
import { toCamelCase } from "string-manager"

export default Vue.extend({
  name: "card-post-app",
  props: ["app"],
  methods: {
    toCamelCase(str) {
      return toCamelCase(str)
    }
  }
})
</script>

<style lang="sass" scoped>
  @import "../../../design/sass/color"

  .app-card 
    padding: 10px
    border: 1px solid $color-gray-soft
    color: $color-gray-medium
    margin-bottom: 15px !important
    font-size: 13px
</style>
