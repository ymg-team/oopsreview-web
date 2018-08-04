<template lang='pug'>
  .super-box-post
    div(v-if='!data || !data.status')
      loading 
    div(v-else)
      div(v-if='data.result.length > 0' v-for="n,key in data.result")
        row-super-post(:key="key" :data="n")
      div(v-else)
        text-info(:text='data.message || "post tidak ditemukan"')
</template>

<script lang='ts'>
import Vue from 'vue'
import rowSuperPost from '../rows/super-post.vue'
import textinfo from '../cards/text-info.vue'
import loading from '../cards/loading.vue'

Vue.component('row-super-post', rowSuperPost)
Vue.component('loading', loading)
Vue.component('text-info', textinfo)

const props={
  'data': {
    type: Object
  }
}

export default Vue.extend({
  name: 'box-post',
  props,
})
</script>

<style lang='sass'>
</style>
