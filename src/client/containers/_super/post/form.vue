<template lang='pug'>
  .super-posts-list.grid
    .col-8_md-10_sm-12
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
        quill-editor#post-form(
          :content="formdata.content || ''"
          :options="editorOptions"
          @change="handleChangeQuill($event)"
        )

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
            :loading='loading'
            :onclick='handleSubmit'
            type='submit'
            :value='id ? "Update and publish" : "Publish this Post"'
            style='margin-right:10px'
          )

          //- only show if form not loading state
          oops-button(
            v-if="!loading"
            :onclick='() => handleSubmit(true)'
            type='submit'
            value='Save to Draft'
          )
</template>

<script lang="ts">
import Vue from "vue"
import VueQuillEditor, { quillEditor } from "vue-quill-editor"
import header from "../../../components/cards/header-tag.vue"
import text from "../../../components/form/input-text.vue"
import button from "../../../components/form/button.vue"
import toast from "../../../modules/toast"
import { injectCss, injectScript } from "../../../modules/dom"
import { validation } from "../../../modules/form"
import * as TYPES from "../../../vuex/types"
import { mapState } from "vuex"
import { router } from "../../../index"

import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"

const editorOptions = {
  modules: {
    toolbar: [[{ header: [2, 3, 4] }], ["bold", "italic"], ["link", "image"]]
  },
  placeholder: "Write here...",
  theme: "snow"
}

Vue.component("header-tag", header)
Vue.component("input-text", text)
Vue.component("oops-button", button)
Vue.component("quill-editor", quillEditor)

function loadQuillJS() {
  injectCss("/quilljs/quill.core.css", null)
  injectCss("/quilljs/quill.snow.css", null)
}

const rules = {
  title: "required",
  tags: "required"
}

export default Vue.extend({
  name: "super-posts-form",

  data() {
    const { id }: any = this

    return {
      editorOptions,
      loading: true,
      editorHtml: "",
      title: id ? "Update Post" : "New Post",
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

      console.log("formvalidate", this.formvalidate)
    },

    handleChangeQuill({ quill, html, text }) {
      this.editorHtml = html
    },

    handleSubmit(draft=false) {

      this.formvalidate = this.validation.validate(this.formdata)
      if (this.formvalidate.is_valid) {
        console.log("publishing post...")
        const params: any = {
          title: this.formdata.title,
          content: this.editorHtml,
          tags: this.formdata.tags,
          draft
        }
        if (this.id) params.id = this.id
        console.log("params to submit", params)
        this.$store.dispatch(TYPES.SUBMIT_POST, params)
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
    } else {
      this.loading = false
    }

    loadQuillJS()
  },

  watch: {
    ["post.detail"]() {
      console.log("get postdata from store...")
      const post = this.post.detail[this.id] || {}
      const response = this.post.detail.response || {}

      console.log("response", response)

      // button submit is read only if submit waiting response or response success
      if (response.loading || response.status === 201) {
        if(response.status === 201) {
          // success to create / update post
          toast("Post submited", "success")
          setTimeout(() => {
            location.href = "/super/posts"
          },1500)
        }
        this.loading = true
      } else {
        if (post.status !== 200) {
          // give alert and redirect to post list
          toast("post not available", "error")
          router.push({ path: "/super/posts" })
        } else {
          // post available and set formdata
          this.formdata = {
            title: post.title,
            tags: post.tags,
            content: post.content
          }
          this.editorHtml = post.content
          this.loading = false
        }
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
  margin-bottom: 1em
</style>
