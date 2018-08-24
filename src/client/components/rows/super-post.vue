<template lang='pug'>
  .row-post
    router-link(:to='"/super/post/" + data._id') 
      h2 {{ data.title }} 
        label-component(v-if="data.draft" text="draft" custom_style="font-size: 15px;margin-top: 5px;position: absolute;margin-left: 5px;")
    p {{ data.content ? (stripTags(data.content)).substring(0, 300) : 'no content...' }}
    small 
      | by 
      a(:href='"/author/" + data.author.username' target="_blank") {{ data.author.username + " ("+ toCamelCase(data.author.fullname) +")" }} 
      | Last edited {{ epochToRelative(data.updated_on || 0) }}
</template>

<script lang='ts'>
import Vue from "vue"
import { truncate, stripTags, toCamelCase } from "string-manager"
import { epochToRelative } from "../../modules/datetime"

// components
import label from "../label.vue"

Vue.component("label-component", label)

export default Vue.extend({
  props: ["data"],
  methods: {
    // truncate(str, int=0, str='') {
    //   return truncate(str, int, str)
    // },
    stripTags(str) {
      return stripTags(str)
    },
    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epochtime) {
      return epochToRelative(epochtime)
    }
  }
})
</script>

<style lang='sass'>
@import '../../../design/sass/color'
.row-post
  padding-left: 1.5em
  padding-bottom: 1em
  border-bottom: 1px solid $color-gray-verysoft
  &:last-child 
    border-bottom: none
  small 
    a 
      color: $color-gray-medium
    color: $color-gray-medium
</style>
