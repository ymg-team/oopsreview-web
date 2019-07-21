<template lang="pug">
  .oopsreview-editor
    //- ref: https://www.tiny.cloud/docs/configure/integration-and-setup/
    //- ref: https://stackoverflow.com/a/25233876/2780875
    editor(
      v-model="data[name]"
      api-key="234ds00dovxowmnuwjhba9m9pwkif7eksnvesgyqqedhp9un" 
      toolbar="image link bullist | formatselect fontselect fontsizeselect" 
      :menubar="false" 
      :init="{height : 480, plugins: 'wordcount image autolink link lists', selector: 'textarea'}")
</template>


<script>
import Vue from "vue"
import Editor from "@tinymce/tinymce-vue"

Vue.component("editor", Editor)

const props = {
  name: {
    type: String,
    default: ""
  },
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  onchange: {
    type: Function,
    default() {
      console.log("changed")
    }
  }
}

export default Vue.extend({
  name: 'tinymce-editor',
  props
})
</script>

