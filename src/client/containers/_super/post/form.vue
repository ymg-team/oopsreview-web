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
          :onchange='changeTextHandler'
        )

        //- input post image
        input-file(
          name='image'
          label="Image"
          description="Image size width 800px"
          :preview=" id && post.detail[id] && post.detail[id].status == 200 ? post.detail[id].image[600] : ''"
          :data='formdata'
          :validation='formvalidate'
          :onchange='changeFileHandler'
        )

        //- input video embed url
        input-text(
          name='video'
          label="Video Embed URL"
          description="Sample from Youtube: https://www.youtube.com/embed/_KOzKQfiYHE"
          type='text'
          :data='formdata'
          :validation='formvalidate'
          :onchange='changeTextHandler'
        )

        //- input post content
        quill-editor#post-form(
          :content="formdata.content || ''"
          :options="editorOptions"
          @change="changeQuillHandler($event)"
        )
        input(id="quill-upload-image" type="file" accept="image/*" style="display:none" @change="changelQuillImageHandler")

        //- input post tags
        input-text(
          name='tags'
          type='text'
          label="Tags"
          description="Tags are used for group posts based on content"
          placeholder= ""
          :data='formdata'
          :validation='formvalidate'
          :onchange='changeTextHandler'
        )

        //- buttons to submit
        div(style='padding:1em 0')
          oops-button(
            :loading='loading'
            :onclick='submitHandler'
            type='submit'
            :value='id ? "Update and publish" : "Publish this Post"'
            style='margin-right:10px'
          )

          //- only show if form not loading state
          oops-button(
            v-if="!loading"
            :onclick='() => submitHandler(true)'
            type='submit'
            button_type='white'
            value='Save to Draft'
          )
</template>

<script lang="ts">
import Vue from "vue"
import { quillEditor, Quill } from "vue-quill-editor"
import header from "../../../components/cards/header-tag.vue"
import inputText from "../../../components/form/input-text.vue"
import inputFile from "../../../components/form/input-file.vue"
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

Vue.component("header-tag", header)
Vue.component("input-text", inputText)
Vue.component("input-file", inputFile)
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
    const { id, imageHandler }: any = this
    const editorOptions = {
      modules: {
        clipboard: {
          matchVisual: false
        },
        // ref : https://stackoverflow.com/a/44152344/2780875
        toolbar: {
          handlers: {
            image() {
              const ImageUpload: any = document.getElementById(
                "quill-upload-image"
              )
              ImageUpload.click()
            }
          },
          container: [
            [{ header: [2, 3, 4] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"]
          ]
        }
      },
      placeholder: "Write content here...",
      theme: "snow"
    }

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
    resetForm() {
      this.loading = false
      this.editorHtml = ""
      this.title = this.id ? "Update Post" : "New Post"
      this.formdata = {}
      this.formvalidate = {}
      this.validation = new validation(rules)
    },

    changeTextHandler(e: any) {
      const { name, value } = e.target

      let nextformdata: any = this.formdata
      nextformdata[name] = value
      const validate = this.validation.validate(this.formdata)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate
    },

    changeFileHandler(e: any) {
      const { name, files } = e.target

      let nextformdata: any = this.formdata
      nextformdata[name] = files[0]
      const validate = this.validation.validate(this.formdata)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate
    },

    changeQuillHandler({ quill, html, text }) {
      this.editorHtml = html
    },

    changelQuillImageHandler(e: any) {
      const file = e.target.files[0]
      if (file) {
        const imageUrl = window.URL.createObjectURL(file)
        console.log("image", imageUrl)
        //push text to current cursor
      }
    },

    submitHandler(draft = false) {
      this.formvalidate = this.validation.validate(this.formdata)

      if (this.formvalidate.is_valid) {
        console.log("publishing post...")
        let params: any = {
          title: this.formdata.title,
          content: this.editorHtml,
          tags: this.formdata.tags,
          draft
        }
        if (this.id) params.id = this.id
        if (this.formdata.image) params.image = this.formdata.image
        if (this.formdata.video) params.video = this.formdata.video
        console.log("params to submit", params)
        this.$store.dispatch(TYPES.SUBMIT_POST, params)
      }
    }
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

  // unmount event
  beforeDestroy() {
    this.resetForm()
  },

  watch: {
    id() {
      // move from edit form to create form
      if (!this.id) this.resetForm()
    },
    ["post.detail"]() {
      console.log("get postdata from store...")
      const post = this.post.detail[this.id] || {}
      const response = this.post.detail.response || {}

      // button submit is read only if submit waiting response or response success
      if (response.loading || response.status) {
        this.loading = true
        if (typeof response.status !== "undefined") {
          if (response.status === 201) {
            // success to create / update post
            toast("Post submited", "success")
            setTimeout(() => {
              location.href = "/super/posts"
            }, 1500)
          } else {
            this.loading = false
            toast(response.message, "error")
          }
        }
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
            content: post.content,
            video: post.video
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

<style lang="sass">
@import '../../../../design/sass/color'
#post-form
  font-size: 1em
  color: $color-gray-medium
  margin-bottom: 1em

  // quill direct styling
  .ql-editor
    max-height: 500px !important
</style>
