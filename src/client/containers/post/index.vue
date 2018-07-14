<template lang="pug">
  .post-list.bg-white
    .container
      .grid-center
        .col-8_md-12.align-center
          header-tag(
            :title='title' 
            :subtitle=" post.tags[tag_name] && post.tags[tag_name].status === 200 ? post.tags[tag_name].description : subtitle")  
      .grid 
        .col-8_md-12
          div(style='padding-top: .5em')
          // | {{ count }}
          box-post(:data='post.list[filter] || {}') 

          button-big(
            v-if="post.list[filter] && post.list[filter].status === 200 && post.list[filter].result.length >= 8" 
            type="blue" 
            :loading="post.list[filter].loading"
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
    let { tag_name } = this
    let { q } = this.$route.query
    let title = "Posts",
      filter = "archived",
      subtitle = tag_name
        ? `Find all available post posted with tag "${tag_name}"`
        : ""

    if (tag_name) {
      title = `Post by tag "${tag_name}"`
      filter = `archived_${tag_name}`
    }

    if(q) {
      title = `Searching "${q}"`
      filter = `archived_search_${q}`
      subtitle = `Searching post by keyword "${q}"`
    }

    // initial data
    return {
      title,
      filter,
      subtitle
    }
  },

  props: ["tag_name"],

  // beforeRouteUpdate(to, from, next) {
  //   let { tag_name }: any = to.params
  //   let filter = "archived",
  //     title = "posts",
  //     subtitle = ""

  //   if (tag_name) {
  //     filter = `archived_${tag_name}`
  //     title = `posts by tag "${tag_name}"`
  //     subtitle = `Find all available post posted with tag "${tag_name}"`
  //     this.$store.dispatch(TYPES.GET_TAG, tag_name)
  //   }

  //   this.title = title
  //   this.filter = filter
  //   this.subtitle = subtitle

  //   // fetch new data if not available in store
  //   const params = this.generateParams()
  //   if (!this.post[filter]) this.$store.dispatch(TYPES.GET_POSTS, params)

  //   next()
  // },

  watch: {
    tag_name() {
      const { tag_name } = this
      
      let filter = "archived",
        title = "posts",
        subtitle = ""

      if (tag_name) {
        filter = `archived_search_${tag_name}`
        title = `posts by tag "${tag_name}"`
        subtitle = `Find all available post posted with tag "${tag_name}"`
        this.$store.dispatch(TYPES.GET_TAG, tag_name)
      }

      this.title = title
      this.filter = filter
      this.subtitle = subtitle

      // fetch new data if not available in store
      const params = this.generateParams()
      if (!this.post[filter]) this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    $route() {
      const { q } = this.$route.query
      if(q) {
        const title = `Searching "${q}"`
        const subtitle = `Searching post by keyword "${q}"`
        const filter = `archived_${q}`
        
        this.title = title 
        this.subtitle = subtitle
        this.filter = filter 

        const params = this.generateParams()
        if (!this.post[filter]) this.$store.dispatch(TYPES.GET_POSTS, params)
      }
    }
  },

  created() {
    let params = this.generateParams()

    // first fetch data of post list
    this.$store.dispatch(TYPES.GET_POSTS, params)
    if (this.tag_name) this.$store.dispatch(TYPES.GET_TAG, this.tag_name)
  },

  methods: {
    morePosts() {
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastcreatedon = post[post.length - 1].created_on

      // fetch lattest created on
      return this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      const { q } = this.$route.query
      let params: any = { filter: this.filter }
      if (this.tag_name) params.tag = this.tag_name
      if (q) params.keyword = q
      return params
    }
  },

  mounted() {},

  computed: {
    ...mapState(["post"])
  }
})
</script>
