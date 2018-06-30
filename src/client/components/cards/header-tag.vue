<template lang="pug">
.header-tag
  h1 {{ title }}
  .subtitle(v-html="subtitle")
</template>

<script lang="ts">
import Vue from 'vue'

const props = {
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  }
}

export default Vue.extend({
  name: 'header-tag',
  props
})
</script>

<style lang="sass">
@import '../../../design/sass/color'

.header-tag 
  padding: 2em 1em
  background-size: cover
  border-bottom: 7px solid $color-gray-verysoft
  h1 
    font-size: 3em 
    text-transform: uppercase
  .subtitle 
    font-size: 1.5em
    text-transform: capitalize 
    a
      color: $color-gray-soft
  h1, .subtitle  
    font-weight: 300
</style>
