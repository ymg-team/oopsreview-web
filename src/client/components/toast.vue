<template lang="pug">
  #toast-oopsreview
</template>

<style lang="sass" scoped>
  @import "../../design/sass/color"
  
  #toast-oopsreview
    width: 200px 
    padding: 10px
    position: fixed 
    bottom: -100px
    right: 10px
    background: $color-gray-verysoft
    color: $color-gray-medium
    cursor: pointer
    transition: all .3s ease
    &:hover
      padding: 15px
    &.error 
      background-color: $color-red-main 
      color: $color-gray-verysoft
    &.success 
      background-color: $color-green-main
      color: $color-gray-verysoft
    &.warning 
      background-color: $color-yellow-main
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "toast",
  mounted() {
    const Toast = <HTMLElement>document.getElementById("toast-oopsreview")
    Toast.addEventListener("click", () => {
      Toast.style.bottom = "-200px"
    })
  }
})
</script>
