<template lang="pug">
  .form-input(:class="validation.result && validation.result[name] != undefined && !validation.result[name].is_valid ? 'error' : ''")
    label(:for='name') {{ label }}
    img.preview(:src='image_preview' alt='upload preview')
    input(
      type='file' 
      :id='name' 
      :name='name'
      v-on:change='changeHandler'
      ) 
    .form-input-description(v-if="description !== ''") {{ description  }}

    //- show message if input not valid
    .message(v-if='validation.result && validation.result[name] != undefined && !validation.result[name].is_valid') 
      small {{ validation.result[name].message }}
</template>

<script lang="ts">
const reader = new FileReader()

// default props
const defaultProps = {
  name: {
    type: String
  },
  description: {
    type: String,
    default: ""
  },
  label: {
    type: String
  },
  validation: {
    type: Object,
    default() {
      return {}
    }
  },
  preview: {
    type: String,
    default:
      "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"
  },
  // handle change value
  onchange: {
    type: Function,
    default() {
      console.log("changed")
    }
  }
}

// component init
import Vue from "vue"
export default Vue.extend({
  name: "input-file",
  props: defaultProps,
  data(){
    return {
      image_preview: this.preview || "https://res.cloudinary.com/dhjkktmal/image/upload/v1535163093/oopsreview/2018/default_post_image.png"
    }
  },
  watch: {
    preview() {
      this.image_preview = this.preview
    }
  },
  methods: {
    changeHandler(e) {
      const file = e.target.files[0]
      if(file) {
        // generate url
        this.image_preview  = window.URL.createObjectURL(file)
        this.onchange(e)
      }
    }
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/form'
@import '../../../design/sass/color'

.form-input
  &.error 
    input 
      border: 1px solid $color-red-main
  img.preview 
    max-width: 100%
    max-height: 500px
  input
    padding: .5em
    width: -webkit-fill-available
    margin-bottom: .3em
    border: 1px solid $color-gray-soft
  .form-input-description 
    color: $color-gray-soft
</style>
