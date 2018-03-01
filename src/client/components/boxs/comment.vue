<template lang="pug">
  .comment
    h2.title-menu Read Comments
    #disqus_thread 
</template>

<script lang="ts">
import Vue from 'vue'
import { injectScript } from '../../modules/dom'

function renderDisqus(target: string) {
  if((<any>window).DISQUS)
    (<any>window).reset({
      reload: true,
      config: function () {  
        this.page.identifier = target
        this.page.url = target
      }
    })
}

export default Vue.extend({
  name: 'comment',
  props: {
    link: {
      type: String,
      required: true
    }
  },
  created() {
    injectScript('//oopsreview.disqus.com/embed.js', () => {
      // waiting for DISQUS initialized
      setTimeout(() => { renderDisqus('https://oopsreview.com/post/this-is-title-6a4sde34'), 1000 })
    })   
  }
})
</script>

<style lang="sass" scoped>

</style>

