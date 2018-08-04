<template lang="pug">
.box-post
  .grid(v-if="data.result && data.result.length > 0")
    post-card(v-for="(n,key) in data.result" :key="key" :data="n")

  p.align-center.text-muted(v-if="data.status && data.status !== 200")
    | {{ data.message || 'Post not available' }}

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
  props: ["data"],
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
</style>

