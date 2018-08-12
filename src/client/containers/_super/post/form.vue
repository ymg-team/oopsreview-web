<template lang='pug'>
  .super-posts-list
    header-tag(
      :title='title'
      subtitle='Just remember to Oopsreview vision and mission'
    )
    form(method='post' target='javascript:;' style='padding:1em 0')
      //- input post title
      input-text(
        name='title'
        label="Title"
        description="Please fill with post title which attracts users to read."
        type='text'
        :data='formdata'
        :validation='formvalidate'
        :onchange='handleChangeText'
      )

      //- input post content
      #post-form

      //- input post tags
      input-text(
        name='tags'
        label="Tags"
        description="Tags are used for group posts based on content"
        placeholder= ""
        type='text'
        :data='formdata'
        :validation='formvalidate'
        :onchange='handleChangeText'
      )

      //- buttons to submit
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
import toast from "../../../modules/toast"
import { injectCss, injectScript } from "../../../modules/dom"
import { validation } from "../../../modules/form"
import * as TYPES from "../../../vuex/types"
import { mapState } from "vuex"
import { router } from "../../../index"

Vue.component("header-tag", header)
Vue.component("input-text", text)
Vue.component("oops-button", button)

function loadQuillJS() {
  injectScript("/quilljs/quill.min.js", null)
  injectCss("/quilljs/quill.core.css", null)
  injectCss("/quilljs/quill.snow.css", null)
}

const rules = {
  title: 'required',
  tags: 'required'
}

export default Vue.extend({
  name: "super-posts-form",

  data() {
    return {
      editor: null,
      title: this.$route.params.id ? "Update Post" : "New Post",
      formdata: <any>{},
      formvalidate: <any>{},
      validation: new validation(rules)
    }
  },

  methods: {
    handleChangeText(e: any) {
      const { name, value } = e.target

      let nextformdata: any = this.formdata
      nextformdata[name] = value
      const validate = this.validation.validate(this.formdata)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate

      console.log('formvalidate', this.formvalidate)
    },

    handleSubmit() {
      this.formvalidate = this.validation.validate(this.formdata)
      if (this.formvalidate.isValid) {
      }
    },
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
      if (formcontainer) {
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
      }
    }, 2000)
  },

  watch: {
    ["post.detail"]() {
      console.log("get postdata from store...")
      const post = this.post.detail[this.id]
      if (post.status !== 200) {
        // give alert and redirect to post list
        toast("post not available", "error")
        router.push({ path: "/super/posts" })
      } else {
        // post available and set formdata
        this.formdata = {
          title: post.title,
          tags: post.tags
        }
      }
    },

    editor() {
      // initial quilljs editor
      const post = this.post.detail[this.id] || {}
      if (post.status === 200) {
        const { editor }: any = this
        // update html content based on api response
        editor.setContents('<strong>mama mia</strong>')
      }
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
