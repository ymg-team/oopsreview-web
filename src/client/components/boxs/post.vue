<template lang="pug">
  .box-post
    .grid
      if data && data.status
        if data.status === 200
          card
    if !data || data.loading
      loading
</template>

<script lang="ts">
import Vue from "vue"
import card from "../cards/post.vue"
import loading from "../cards/loading.vue"

Vue.component("card", card)
Vue.component("loading", loading)

export default Vue.extend({
  name: "box-post",

  props: ["data"],

  watch: {
    data(ov, nv) {
      console.log(ov, nv)
    }
  }
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
</style>

