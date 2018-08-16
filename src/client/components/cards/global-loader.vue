<template lang="pug">
.oopsreview-loader-wrapper
  .oopsreview-loader
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
})
</script>


<style lang="sass" scoped>
  .oopsreview-loader-wrapper
    padding: 5em
    display: flex
    align-items: center
    justify-content: center

  // ref : https://codepen.io/yussan/pen/oMrxeL
  .oopsreview-loader
    width: 10em
    height: 3em
    border: 0.3em solid #b1b1b1
    border-radius: 3em
    font-size: 20px
    position: relative

    &:before 
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 3em
      height: 3em
      border-radius: 50%
      background-color: #b1b1b1
      animation: shift 1.5s linear infinite

  @keyframes spin
    to 
      transform: rotate(360deg)

  @keyframes shift
    50% 
      left: 7em
    
</style>

