<template lang="pug">
  div 
    popular-box(:data='post.list.featured || {}')
    .container.bg-white 
      .grid 
        .col-8_sm-12
          div(style='padding-top: .5em')
          h2 Latest Post
          box-post(:data='post.list.latest || {}') 
        .col-4_sm-12
          div(style="padding-top:10px")
            sidebar
        .col-12(style='padding-bottom: 0')
          buttonBig(v-if="post.list.latest && post.list.latest.status === 200" style="width:calc(100% - 1em)" button_type='blue' to='/posts' text='More Posts')
</template>

<script lang="ts">
import Vue from "vue"
import popular from "../../components/boxs/popular-posts.vue"
import title from "../../components/cards/title.vue"
import post from "../../components/boxs/post.vue"
import sidebar from "../../components/sidebar.vue"
import buttonBig from "../../components/form/button-big.vue"
import DefaultMeta from "../../../config/metainfo"
import { mapState } from "vuex"
import * as TYPES from "../../vuex/types"

// Vue.component("popular-box",  popular)
Vue.component("popular-box", popular)
Vue.component("card-title", title)
Vue.component("box-post", post)
Vue.component("sidebar", sidebar)
Vue.component("buttonBig", buttonBig)

export default Vue.extend({
  name: "home",

  // custom meta info from vue-meta
  // metaInfo: DefaultMeta,
  metaInfo() {
    return {
      title: DefaultMeta.title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: DefaultMeta.description
        }
      ]
    }
  },

  created() {
    this.$store.dispatch(TYPES.GET_POSTS, { filter: "latest", limit: 8, draft: false })
    this.$store.dispatch(TYPES.GET_POSTS, {
      filter: "featured",
      featured: true,
      draft: false,
      limit: 8
    })
  },

  computed: {
    ...mapState(["post"])
  }
})
</script>
