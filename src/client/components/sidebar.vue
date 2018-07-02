<template lang="pug">
  .sidebar#sidebar(:class='fixed ? "fixed" : ""')
    a(href="https://m.do.co/c/e4eacf5d20a5" target="_blank")
      img(src='https://res.cloudinary.com/dhjkktmal/image/upload/v1530523135/oopsreview/2018/ADS_Digital_Ocean_Square.png')
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
