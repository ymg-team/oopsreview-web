<template lang="pug">
  .comment#comment
    h2.title-menu Read Comments
    #disqus_thread 
</template>

<script lang="ts">
import Vue from "vue"
import { injectScript } from "../../modules/dom"

function renderDisqus(target: string) {
  console.log("render DISQUS :", target)
  setTimeout(() => {
    if ((<any>window).DISQUS)
      (<any>window).DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = target
          this.page.url = target
        }
      })
  }, 1000)
}

export default Vue.extend({
  name: "comment",

  props: {
    link: {
      type: String,
      required: true
    }
  },

  watch: {
    link(val) {
      renderDisqus(`https://oopsreview.com${val}`)
    }
  },

  created() {
    if (!(<any>window).DISQUS)
      injectScript("//oopsreview.disqus.com/embed.js", () => {
        // waiting for DISQUS initialized
        renderDisqus(`https://oopsreview.com${this.link}`)
      })
    else renderDisqus(`https://oopsreview.com${this.link}`)
  }
})
</script>

<style lang="sass" scoped>

</style>

