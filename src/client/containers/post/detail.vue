<template lang="pug">
  div(v-if="typeof post.detail[id] !== 'undefined'")

    div(v-if="post.detail[id].status === 200")
      .post-detail.bg-white
        .container
          .grid
            .col-8_md-12(data-push-left="off-2_md-0")
              h1 {{ toCamelCase(post.detail[id].title) }}
              box-meta(:data="post.detail[id]" :link='link')
          
          .grid 
            .col-8_md-12(data-push-left="off-2_md-0")
              app-card(v-if="post.detail[id].app._id" :data="post.detail[id]" :app="post.detail[id].app")

          .grid 
            .col-12.post-detail-mainimage

              //- if have video show iframe
              .post-detail-video(v-if="post.detail[id].video") 
                iframe(:src="post.detail[id].video")
              //- end of iframe

              //- main image
              img(:src="post.detail[id].image.original")
              //- end of main image

            .col-8_md-12(data-push-left="off-2_md-0")
              article.post-detail-content
                div(v-html="post.detail[id].content")

          .grid 
            .col-8_md-12(data-push-left="off-2_md-0")
              comment(:link='link') 

          .grid.p-t-2 
            .col-8_md-12(data-push-left="off-2_md-0")
              h2.title-menu The Latest
              box-post(:data='post.list.latest_detail || {}') 
            
    div(v-else)
      error-box

  div(v-else)
    preloader


</template>

<script lang="ts">
import Vue from "vue"
import host from "../../../config/host"
import * as TYPES from "../../vuex/types"
import { mapState } from "vuex"
import { toCamelCase, truncate, stripTags } from "string-manager"
import { epochToRelative } from "../../modules/datetime"

// components
import sidebar from "../../components/sidebar.vue"
import comment from "../../components/boxs/comment.vue"
import meta from "../../components/boxs/post-meta.vue"
import post from "../../components/boxs/post.vue"
import appCard from "../../components/cards/post-app.vue"
import Preloader from "../../components/cards/global-loader.vue"
import ErrorBox from "../../containers/error/index.vue"

Vue.component("sidebar", sidebar)
Vue.component("comment", comment)
Vue.component("box-post", post)
Vue.component("box-meta", meta)
Vue.component("app-card", appCard)
Vue.component("error-box", ErrorBox)
Vue.component("preloader", Preloader)

export default Vue.extend({
  name: "post-detail",

  // metaInfo: this.meta,

  data() {
    // const title_arr = this.$route.params.title.split("-")
    return {
      link: `/post/${this.$route.params.title}`,
      meta: {
        title: "Oopsreview - Software Review Specialist",
        description:
          "Here we will help you to determine what best application is suitable for you to use."
      },
      id: 0
    }
  },

  metaInfo() {
    if (typeof this.post.detail[this.id] !== "undefined") {
      if (this.post.detail[this.id].status === 200) {
        const description = truncate(
          stripTags(this.post.detail[this.id].content),
          500,
          "..."
        )
        return {
          title: toCamelCase(this.post.detail[this.id].title),
          meta: [
            {
              vmid: "description",
              name: "description",
              content: description
            }
          ]
        }
      } else {
        return {
          title: "Page Not Found",
          meta: [
            {
              vmid: "description",
              name: "description",
              content: "Are you lost, click link bellow to acccess other page"
            }
          ]
        }
      }
    } else {
      return {}
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
  .post-detail-mainimage
    text-align: center
    img 
      max-width: 100%
  .post-detail-video
    background: $color-black-main
    margin-bottom: 50px
    padding: 0
    height: 500px
    iframe 
      border: none
      margin: 0
      height: 100% 
      width: -webkit-fill-available
      width: -moz-available
  article.post-detail-content 

    h2
      margin-top: 50px
      border-top: 1px solid gray
      border-bottom: 1px solid gray
      padding: 10px
      text-align: center
    h3 
      margin-top: 50px
      // text-align: center
    line-height: 1.8
    letter-spacing: .3px
    font-size: 1.1em
    img 
      max-width: 100%
      text-align: center
      display: block 
      margin: 2.5em auto
    br 
      display: block
      margin: 1em 0
</style>
