<template lang='pug'>
  .super-posts-list
    header-tag(
      :title='title'
      subtitle='Just remember to Oopsreview vision and mission'
    )
    form(method='post' target='javascript:;' style='padding:1em 0')
      input-text(
        placeholder= 'title'
        type='text',
      )
      #post-form
      div(style='padding:1em 0')
        oops-button(
          :onclick='handleSubmit'
          type='submit'
          value='Publish'
        )
        oops-button(
          :onclick='handleDraft'
          type='submit'
          value='Save to Draft'
        )
</template>

<script lang="ts">
import Vue from "vue"
import header from "../../../components/cards/header-tag.vue"
import text from "../../../components/form/input-text.vue"
import button from "../../../components/form/button.vue"
import { injectCss, injectScript } from "../../../modules/dom"
import * as TYPES from "../../../vuex/types"
import { mapState } from "vuex"

Vue.component("header-tag", header)
Vue.component("input-text", text)
Vue.component("oops-button", button)

function loadQuillJS() {
  injectScript("/quilljs/quill.min.js", null)
  injectCss("/quilljs/quill.core.css", null)
  injectCss("/quilljs/quill.snow.css", null)
}

export default Vue.extend({
  name: "super-posts-form",

  data() {
    return {
      editor: null,
      title: this.$route.params.id ? "Update Post" : "New Post"
    }
  },

  methods: {
    handleSubmit() {},
    handleDraft() {}
  },

  props: ["id"],

  // why mounted?, ref: https://alligator.io/vuejs/component-lifecycle/
  mounted() {
    // this.id defined, this page is edit post
    if (typeof this.id !== "undefined") {
      this.$store.dispatch(TYPES.GET_POST, this.id)
    }

    const formcontainer = document.getElementById("post-form")

    loadQuillJS()
    // config quilljs
    setTimeout(() => {
      let { Quill }: any = window
      const options = {
        modules: {
          toolbar: [
            [{ header: [2, 3, 4] }],
            ["bold", "italic"],
            ["link", "image"]
          ]
        },
        placeholder: "Write here...",
        theme: "snow"
      }
      this.editor = new Quill("#post-form", options)
    }, 2000)
  },

  watch: {
    post() {
      console.log(this.id)
    }
  },

  // map state to global variable
  computed: {
    ...mapState(["post"])
  }
})
</script>

<style lang="sass" scoped>
@import '../../../../design/sass/color'
#post-form
  height: 550px
  overflow-y: auto
  font-size: 1em
  color: $color-gray-medium
</style>
