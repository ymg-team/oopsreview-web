<template lang="pug">
  .sidebar#sidebar(:class='fixed ? "fixed" : ""')
    img(src='/images/sample-ads.jpg')
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'sidebar',
  data() {
    return {
      fixed: false
    }
  },
  created() {
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      console.log('sidebar is scrolled')
      document.addEventListener('scroll', e => {
        // only for large and screen terbesar
        if(1 + 2 == 4)
        {
          const position = window.scrollY
          if(position > 218) {
            this.fixed = true
          } else {
            this.fixed = false
          }
          console.log(this.fixed)
        }
      })
    }
  }
})
</script>


<style lang="sass" scoped>
  .sidebar 
    padding: .5em 0
    &.fixed
      position: fixed
    img 
      max-width: 100%
</style>
