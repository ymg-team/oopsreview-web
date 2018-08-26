<template lang='pug'>
  .row-post(:class="data.is_deleted ? 'disabled' : ''")
    router-link(:to='"/super/post/" + data._id') 
      h2 {{ data.title }} 
        label-component(v-if="data.draft" text="draft" custom_style="font-size: 15px;margin-top: 5px;position: absolute;margin-left: 5px;")
    p {{ data.content ? (stripTags(data.content)).substring(0, 300) : 'no content...' }}
    small 
      | by 
      a(:href='"/author/" + data.author.username' target="_blank") {{ data.author.username + " ("+ toCamelCase(data.author.fullname) +")" }} 
      | Last edited {{ epochToRelative(data.updated_on || 0) }}
    
    .btn-action
      btn-dropdown(:items="dropdown_item")
</template>

<script lang='ts'>
import Vue from "vue"
import { truncate, stripTags, toCamelCase } from "string-manager"
import { epochToRelative } from "../../modules/datetime"
import { DELETE_POST } from "../../vuex/types"

// components
import label from "../label.vue"
import BtnDropdown from "../buttons/BtnDropdown.vue"

Vue.component("label-component", label)
Vue.component("btn-dropdown", BtnDropdown)

export default Vue.extend({
  data() {
    const { handleDelete }: any = this
    return {
      dropdown_item: [
        {
          link: `/post/${this.data.nospace_title}-${this.data._id}`,
          type: "blank",
          text: "Preview"
        },
        {
          text: "Delete",
          type: "delete",
          action: () => handleDelete(this.data._id)
        }
      ]
    }
  },
  props: ["data"],
  methods: {
    // truncate(str, int=0, str='') {
    //   return truncate(str, int, str)
    // },
    stripTags(str) {
      return stripTags(str)
    },
    toCamelCase(str) {
      return toCamelCase(str)
    },
    epochToRelative(epochtime) {
      return epochToRelative(epochtime)
    },
    handleDelete(id) {
      console.log("delete post with id", id)
      this.$store.dispatch(DELETE_POST, id)
    }
  }
})
</script>

<style lang='sass'>
@import '../../../design/sass/color'
.row-post
  position: relative
  padding-left: 1.5em
  padding-bottom: 1em
  border-bottom: 1px solid $color-gray-verysoft
  &:last-child 
    border-bottom: none
  small 
    a 
      color: $color-gray-medium
    color: $color-gray-medium
  .btn-action 
    position: absolute 
    top: 0
    right: 0
</style>
