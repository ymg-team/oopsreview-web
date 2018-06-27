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

        .col-4_md-12
          sidebar
</template>

<script lang="ts">
import Vue from "vue"

// components
import headerTag from "../../components/cards/header-tag.vue"
import post from "../../components/boxs/post.vue"
import sidebar from "../../components/sidebar.vue"
import * as TYPES from '../../vuex/types'
import { mapState } from "vuex";

Vue.component("header-tag", headerTag)
Vue.component("sidebar", sidebar)

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
    this.$store.dispatch(TYPES.GET_POSTS, {filter: this.filter})
    
  },

  mounted() {
   
  },

  computed: {
    ...mapState([
      'post'
    ])
  }
})
</script>
