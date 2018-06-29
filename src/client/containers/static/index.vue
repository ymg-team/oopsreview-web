<template lang="pug">
  .static.bg-white(v-if="typeof content !== 'undefined'")
    .container
      .grid-center
        .col-6_md-12
          h1 {{ content.title  }}
          p Published {{ epochToRelative(content.created_at) }}
      .grid-center
        .col-6_md-12
          article
            img(:src=" content.image || 'https://res.cloudinary.com/dhjkktmal/image/upload/v1529931141/oopsreview/2018/default-thumb.png' ")
            article(v-html="content.html")

  error-box(v-else error_code="400" error_message="Content Not Found")
</template>

<script lang="ts">
import Vue from 'vue'
import { getData } from '../../../../internals/static-data'
import { epochToRelative } from '../../modules/datetime'

// components 
import ErrorContainer from '../../containers/error/index.vue'

Vue.component("error-box", ErrorContainer)

export default Vue.extend({
  name: 'static-detail',

  data() {
    return {
      content: getData(this.$route.params.title)
    }
  },

  methods: {
    epochToRelative(epochtime) {
      return epochToRelative(epochtime)
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.content = getData(to.params.title)
    next()
  },

  // on component created
  created() {
    console.log(this.content)
  }
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.static
  h1 
    font-size: $size-text-large
  img 
    padding: 1em 0
    max-width: 100%
    text-align: center
  article 
    line-height: 1.8
    letter-spacing: .3px
    font-size: 1.1em
    br 
      display: block
      margin: 1em 0
      
</style>
