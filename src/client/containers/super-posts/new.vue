<template lang='pug'>
  .super-posts-list
    header-tag(
      title='New Post'
      subtitle='Just remember to Oopsreview vision and mission'
    )
    form(style='padding:1em 0')
      input-text(
        type='text',
        label='title'
      )
      #post-form
      div(padding:1em 0)
        submit(
          onclick='handleSubmit'
          type='submit'
          value='Publish'
        )
        submit(
          onclick='handleDraft'
          type='submit'
          value='Save to Draft'
        )
</template>

<script>
import Vue from 'vue'
import header from '../../components/cards/header-tag.vue'
import text from '../../components/form/input-text.vue'
import button from '../../components/form/button.vue'
import { injectCss, injectScript } from '../../modules/dom'

Vue.component('header-tag', header)
Vue.component('input-text', text)
Vue.component('submit', button)

function loadQuillJS()
{
  injectScript('/quilljs/quill.min.js', null)
  injectCss('/quilljs/quill.core.css', null)
  injectCss('/quilljs/quill.snow.css', null)
} 

export default Vue.extend({
  name: 'super-posts-new',
  data() {
    return {
      editor: null
    }
  },
  methods: {
    handleSubmit() {

    },
    handleDraft() {

    }
  },
  created() {
    const formcontainer = document.getElementById('post-form')
    window.Quill = null
    loadQuillJS()
    // config quilljs
    setTimeout(() => {
      const options = {
        modules: {
          toolbar: [[{header: [2,3,4]}], ['bold', 'italic'], ['link', 'image']]
        },
        placeholder: 'Write here...',
        theme: 'snow'
      }
      this.editor = new Quill('#post-form', options)
    }, 2000)
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/color'

#post-form
  height: 550px
  overflow-y: auto
  font-size: 1em
  color: $color-gray-medium
</style>
