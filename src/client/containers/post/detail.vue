<template lang="pug">
  .post-detail.bg-white
    .container
      div(v-if="typeof post.detail[id] !== 'undefined'")
        .grid
          .col-12
            h1 {{ post.detail[id].title }}
            p By 
              router-link(to='/author/yussan') {{ post.detail[id].author.fullname }}
              | &nbsp;|
              | 26 January 2019, 14:00 WIB
              div(v-if="typeof post.detail[id].tags === 'object' && post.detail[id].tags.length > 0")
                br
                | Posted in 
                span(v-for="item, key in post.detail[id].tags" :key="key") 
                  router-link(:to="'/tag/' + item" ) {{ item }}
                  | {{ key < post.detail[id].tags.length -1 ? ', ' : ''  }}
        
        .grid 
          .col-8_md-12
            article
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
            box-post

      div(v-else)
        loading


</template>

<script lang="ts">
import Vue from "vue"
import host from "../../../config/host"
import * as TYPES from '../../vuex/types'
import {mapState} from "vuex"

// components
import sidebar from "../../components/sidebar.vue"
import comment from "../../components/boxs/comment.vue"
import post from "../../components/boxs/post.vue"
import loading from "../../components/cards/loading.vue"

Vue.component("sidebar", sidebar)
Vue.component("comment", comment)
Vue.component("loading", loading)
// Vue.component("box-post", post)

export default Vue.extend({
  name: "post-detail",
  data() {
    const title_arr = this.$route.params.title.split('-')
    return {
      link: `/post/${this.$route.params.title}`,
      id: title_arr[title_arr.length - 1]
    }
  },

  created() {
    const title_arr = this.$route.params.title.split('-')
    this.$store.dispatch(TYPES.GET_POST, title_arr[title_arr.length - 1])
  },

  computed: {
    ...mapState([
      'post'
    ])
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.post-detail
  h1 
    font-size: $size-text-large
  img 
    padding: 1em 0
    max-width: 100%
    text-align: center
  article 
    line-height: 1.8
    letter-spacing: .3px
    font-size: 1.1em
    br 
      display: block
      margin: 1em 0
</style>
