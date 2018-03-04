<template lang='pug'>
  .super-posts-list
    header-tag(
      title='New Post'
    )
    #post-form
</template>

<script lang='ts'>
import Vue from 'vue'
// import Quill from 'quilljs'
import header from '../../components/cards/header-tag.vue'

Vue.component('header-tag', header)

const quill_options = {
  debug: 'info',
  modules: {
    toolbar: '#toolbar'
  },
  placeholder: 'Compose an epic...',
  readOnly: true,
  theme: 'snow'
};

export default Vue.extend({
  name: 'super-posts-new',
  created() {
    const formcontainer = document.getElementById('post-form')
    // const editor = new Quill(formcontainer, quill_options)
  }
})
</script>