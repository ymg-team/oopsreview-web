<template lang='pug'>
  .super-posts-list
    header-tag(
      title='All Posts'
    )
    //- searh post by title
    input-text(name='search' placeholder='search post')
    //- post list
    super-box-post(:data='post.list[filter] || {}') 
    br
    //- big button to load more post
    big-button(
      v-if='post.list[filter] && post.list[filter].status && post.list[filter].status === 200' 
      :loading='post.list[filter].loading'
      :onclick='() => morePosts()'
      type="blue" 
      text="more posts")

</template>

<script lang='ts'>
import Vue from "vue"
import { mapState } from "vuex"
import * as TYPES from "../../../vuex/types"

// components
import header from "../../../components/cards/header-tag.vue"
import superboxpost from "../../../components/boxs/super-post.vue"
import inputtext from "../../../components/form/input-text.vue"
import bigbutton from "../../../components/form/button-big.vue"

Vue.component("header-tag", header)
Vue.component("super-box-post", superboxpost)
Vue.component("input-text", inputtext)
Vue.component("big-button", bigbutton)

export default Vue.extend({
  name: "super-posts-list",

  data() {
    return {
      filter: "post_all"
    }
  },

  methods: {
    morePosts() {
      console.log("show more post...")
      const post = this.$store.state.post.list[this.filter].result
      let params = this.generateParams()
      params.lastcreatedon = post[post.length - 1].created_on

      // fetch lattest created on
      this.$store.dispatch(TYPES.GET_POSTS, params)
    },

    generateParams() {
      const { q } = this.$route.query

      let params: any = {
        filter: this.filter
      }
      if (q) params.keyword = q
      return params
    }
  },

  created() {
    let params = this.generateParams()
    this.$store.dispatch(TYPES.GET_POSTS, params)
  },

  computed: {
    ...mapState(["post"])
  }
})
</script>
