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

Vue.component("header-tag", headerTag)

// async components
// ref: https://vuejsdevelopers.com/2017/07/03/vue-js-code-splitting-webpack/
Vue.component("sidebar", resolve => {
  import("../../components/sidebar.vue").then(AsyncComponent => {
    resolve(AsyncComponent.default)
  })
})
Vue.component("button-big", resolve => {
  import("../../components/form/button-big.vue").then(AsyncComponent => {
    resolve(AsyncComponent.default)
  })
})
Vue.component("box-post", post)

export default Vue.extend({
  name: "post-list",

  data() {
    let { tag_name, username } = this
    let { q } = this.$route.query

    let filter = "archived"

    // if access route /author/:username
    if (username) {
      filter = `archived_author_${username}`
    }

    // if access route /tag/:tag_name
    if (tag_name) {
      filter = `archived_${tag_name}`
    }

    // if access route /post?q=keyword
    if (q) {
      filter = `archived_search_${q}`
    }

    // tricky: cannot call this on data()
    const { generateMeta }: any = this
    const { title, subtitle } = generateMeta()

    // initial data
    return {
      title,
      filter,
      subtitle
    }
  },

  metaInfo() {
    const { title, subtitle } = this.generateMeta()

    // initial data
    return {
      title,
      meta: [{ vmid: "description", name: "description", content: subtitle }]
    }
  },

  props: ["tag_name", "username"],

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
      if (q) {
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
    generateMeta() {
      let { tag_name, username }: any = this
      let { q } = this.$route.query

      let title = "Posts",
        subtitle = tag_name
          ? `Find all available post posted with tag "${tag_name}"`
          : ""

      // if access route /author/:username
      if (username) {
        title = `Post by "${username}"`
        subtitle = `Find all available post posted by "${username}"`
      }

      // if access route /tag/:tag_name
      if (tag_name) {
        title = `Post by tag "${tag_name}"`
      }

      // if access route /post?q=keyword
      if (q) {
        title = `Searching "${q}"`
        subtitle = `Searching post by keyword "${q}"`
      }

      // initial data
      return {
        title,
        subtitle
      }
    },

    morePosts() {
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastcreatedon = post[post.length - 1].created_on

      const { $store }: any = this

      // fetch lattest created on
      $store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      const { q } = this.$route.query
      let params: any = { filter: this.filter }
      if (this.tag_name) params.tag = this.tag_name
      if (this.username) params.username = this.username
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
