<template lang="pug">
  .post-detail.bg-white
    .container
      div(v-if="typeof post.detail[id] !== 'undefined'")
        .grid
          .col-12
            h1 {{ toCamelCase(post.detail[id].title) }}
            box-meta(:data="post.detail[id]")
        
        .grid 
          .col-8_md-12
            article.post-detail-content
              img(:src="post.detail[id].image.original")
              div(v-html="post.detail[id].content")
          
          .col-4_md-12
            sidebar(:link='link')

        .grid 
          .col-8_md-12 
            comment(:link='link') 

        .grid.p-t-2 
          .col-8_md-12
            h2.title-menu The Latest
            box-post(:data='post.list.latest_detail || {}') 

      div(v-else)
        loading


</template>

<script lang="ts">
import Vue from "vue"
import host from "../../../config/host"
import * as TYPES from "../../vuex/types"
import { mapState } from "vuex"
import { toCamelCase } from "string-manager"
import { epochToRelative } from "../../modules/datetime"

// components
import sidebar from "../../components/sidebar.vue"
import comment from "../../components/boxs/comment.vue"
import meta from "../../components/boxs/post-meta.vue"
import post from "../../components/boxs/post.vue"
import loading from "../../components/cards/loading.vue"

Vue.component("sidebar", sidebar)
Vue.component("comment", comment)
Vue.component("loading", loading)
Vue.component("box-post", post)
Vue.component("box-meta", meta)

export default Vue.extend({
  name: "post-detail",

  // metaInfo: this.meta,

  data() {
    // const title_arr = this.$route.params.title.split("-")
    return {
      link: `/post/${this.$route.params.title}`,
      meta: {
        title: 'Oopsreview - Software Review Specialist',
        description: 'Here we will help you to determine what best application is suitable for you to use.'
      },
      id: 0
    }
  },

  created() {
    const title_arr = this.$route.params.title.split("-")
    this.$store.dispatch(TYPES.GET_POSTS, { filter: "latest_detail", limit: 3 })
    this.fetchPostDetail(title_arr[title_arr.length - 1])
  },

  methods: {
    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epoch) {
      return epochToRelative(epoch)
    },
    fetchPostDetail(id) {
      this.id = id
      this.$store.dispatch(TYPES.GET_POST, id)
    }
  },

  beforeRouteUpdate(to, from, next) {
    // request post detail
    const title_arr = to.params.title.split("-")
    this.fetchPostDetail(title_arr[title_arr.length - 1])
    this.link = `/post/${to.params.title}`

    next()
  },

  computed: {
    ...mapState(["post"])
  }
})
</script>

<style lang="sass">
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.post-detail
  h1 
    font-size: $size-text-large
  article.post-detail-content 
    h2
      margin-top: 50px
      border-top: 1px solid gray
      border-bottom: 1px solid gray
      padding: 10px
      text-align: center
    h3 
      margin-top: 50px
      text-align: center
    line-height: 1.8
    letter-spacing: .3px
    font-size: 1.1em
    img 
      &:first-child 
        margin: .5em auto
      max-width: 100%
      text-align: center
      display: block 
      margin: 1.5em auto
    br 
      display: block
      margin: 1em 0
</style>
