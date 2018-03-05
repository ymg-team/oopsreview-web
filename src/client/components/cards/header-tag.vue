<template lang="pug">
.header-tag
  h1 {{ title }}
  h2(v-if='subtitle != ""') {{ subtitle }}
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
  h1, h2 
    font-weight: 300
</style>
