<template lang="pug">
  .post-list.bg-white
    .container
      .grid-center
        .col-8_md-12.align-center
          header-tag(
            :title='title' 
            :subtitle='subtitle')  
      .grid 
        .col-8_md-12
          div(style='padding-top: .5em')
          // | {{ count }}
          box-post(:data='post.list[filter] || {}') 

          button-big(
            v-if="post.list[filter] && post.list[filter].status === 200" 
            type="blue" 
            :onclick="() => morePosts()"
            text="MORE POSTS")

        .col-4_md-12
          sidebar
</template>

<script lang="ts">
import Vue from "vue"
import * as TYPES from "../../vuex/types"
import { mapState } from "vuex"

// components
import headerTag from "../../components/cards/header-tag.vue"
import post from "../../components/boxs/post.vue"
import sidebar from "../../components/sidebar.vue"
import buttonBig from "../../components/form/button-big.vue"

Vue.component("header-tag", headerTag)
Vue.component("sidebar", sidebar)
Vue.component("button-big", buttonBig)

export default Vue.extend({
  name: "post-list",

  data() {
    return {
      title: "archived",
      filter: "archived",
      subtitle: ""
    }
  },

  props: ["tag_name"],

  watch: {
    tag_name(nv, ov) {
      if (nv) {
        this.title = nv
        this.subtitle =
          "Is the world's number one operating system, since the release of its first version until now, a lot of developments have been there. "
      } else {
        this.title = "archived"
        this.subtitle = ""
      }
    }
  },

  created() {
    if (this.tag_name) {
      this.title = this.tag_name
      this.subtitle =
        "Is the world's number one operating system, since the release of its first version until now, a lot of developments have been there. "
    }
    this.$store.dispatch(TYPES.GET_POSTS, { filter: this.filter })
  },

  methods: {
    morePosts() {
      // get lattest created on
      const post = this.$store.state.post.list[this.filter].result 
      return this.$store.dispatch(TYPES.GET_POSTS, {
        filter: this.filter,
        lastcreatedon: post[post.length - 1].created_on
      })
    }
  },

  mounted() {},

  computed: {
    ...mapState(["post"])
  }
})
</script>
