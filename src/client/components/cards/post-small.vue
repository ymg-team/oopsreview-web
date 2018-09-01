<template lang="pug">
  .col-4_sm-12.card-post-popular(v-if="data")
    .thumb
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        .thumb-image(:style="`background-image:url(${data.image[600]})`")
          BtnPlay(v-if="data.video" size="big")
    .title
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        h2 {{ data.title }}
      small by 
        router-link(:to="'/author/' + data.author.username") {{ data.author.fullname }}.
</template>

<script lang="ts">
import Vue from "vue"
import BtnPlay from "../buttons/BtnVideoPlay.vue"

export default Vue.extend({
  name: "card-post-small",

  props: ["data"]
})
</script>

<style lang="sass">
  .thumb-image 
    position: relative
</style>
