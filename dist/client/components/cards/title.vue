<template lang="pug">
  .title
    .grid 
      .col
        h3 {{ title }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'title-card',
  props: {
    title: {
      type: String
    }
  }
})
</script>

<style lang="sass" scoped>
  .title 
      h3 
          font-size: 2.8em
          margin: 0
          padding: 1em 0
</style>


