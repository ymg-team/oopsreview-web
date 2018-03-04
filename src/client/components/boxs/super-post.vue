<template lang='pug'>
  .super-box-post
    row 
    row 
    row
</template>

<script lang='ts'>
import Vue from 'vue'
import row from '../rows/post.vue'

Vue.component('row', row)

export default Vue.extend({
  name: 'box-post'
})
</script>

<style lang='sass'>
</style>