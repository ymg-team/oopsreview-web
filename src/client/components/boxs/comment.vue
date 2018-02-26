<template lang="pug">
  .comment
</template>

<script lang="ts">
import Vue from 'vue'

function callDisquss(target: String) {

}

export default Vue.extend({
  name: 'comment',
  props: {
    link: {
      type: String,
      required: true
    }
  },
  created() {
    callDisquss('/post/')    
    console.log('comment is ready')
  }
})
</script>

<style lang="sass" scoped>

</style>

