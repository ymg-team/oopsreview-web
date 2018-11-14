<template lang="pug">
.box-post
  .grid(v-if="data.result && data.result.length > 0")
    post-card(v-for="(n,key) in data.result" :key="key" :data="n")

  p.align-center.text-muted(v-if="data.status && data.status !== 200")
    | {{ data.status == 204 ? 'Post not available' : 'Something wrong' }}

  preloader(v-if="!data.status || data.loading")

</template>

<script lang="ts">
import Vue from "vue"
import card from "../cards/post.vue"
import preloader from "../cards/global-loader.vue"

Vue.component("post-card", card)
Vue.component("preloader", preloader)

export default Vue.extend({
  name: "box-post",
  props: ["data"],
})
</script>

<style lang="sass">
  @import '../../../design/sass/color'
</style>

