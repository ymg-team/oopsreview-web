<template lang="pug">
.box-post
  .grid
    div(v-if="data.data && data.data.length > 0")
      post-card(v-for="(n,key) in data.data" :key="key")

  loading(v-if="!data.status || data.loading")

</template>

<script lang="ts">
import Vue from "vue"
import card from "../cards/post.vue"
import loading from "../cards/loading.vue"

Vue.component("post-card", card)
Vue.component("loading", loading)

export default Vue.extend({
  name: "box-post",

  data() {
    return {
    }
  },

  props: ["data"],

  watch: {
    data(oldval, newval) {
      console.log(oldval, newval)
    }
  }
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
</style>

