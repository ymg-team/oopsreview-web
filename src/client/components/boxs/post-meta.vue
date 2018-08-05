<template lang="pug">
  .post-meta
    router-link(:to="'/author/' + data.author.username")
      img.avatar(:src="data.author.avatar.small" alt="avatar user")
      div.avatar-text
        | by
        | {{ toCamelCase(data.author.fullname) }}, 
        | posted 
        time {{ epochToRelative(data.created_on) }}
    .stats 
      span.stats-item(v-if="typeof data.tags === 'object' && data.tags.length > 0")
        span.icono-tag 
        span(v-for="item, key in data.tags" :key="key") 
          router-link(:to="'/tag/' + item" ) {{ item }}
          | {{ key < data.tags.length -1 ? ', ' : ''  }}
      span.stats-item
        span.icono-commentEmpty 
        | {{ data.comments || 0 }}  
      span.stats-item
        span.icono-eye 
        | {{ data.views || 0 }} 

</template>

<script lang="ts">
import Vue from 'vue'
import { epochToRelative } from "../../modules/datetime"
import { toCamelCase } from "string-manager"

export default Vue.extend({
  name: "post-meta",

  props: ["data"],

  methods: {
    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epoch) {
      return epochToRelative(epoch)
    }
  },
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/color'
.post-meta 
  color: $color-gray-dark !important
  [class*=icono-]
    color: $color-gray-dark !important
    margin-right: 10px
    zoom: 0.8
  img.avatar 
    width: 35px
    height: 35px
    border-radius: 35px
    margin-bottom: -12.5px
    margin-right: 5px
    margin-bottom: 5px
    float: left
  .avatar-text 
    padding: 5px 0
  .stats 
    padding: 10px 0
    .stats-item 
      margin-right: 5px
</style>

