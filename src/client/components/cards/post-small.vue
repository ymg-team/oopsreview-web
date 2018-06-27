<template lang="pug">
  .col-4_sm-12.card-post-popular(v-if="data")
    .thumb
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        .thumb-image(:style="`background-image:url(${data.image[600]})`")
    .title
      router-link(:to="'/post/' + data.nospace_title + '-' + data._id")
        h2 {{ data.title }}
      small by 
        router-link(:to="'/user/' + data.author.username") {{ data.author.fullname }}.
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "card-post-small",
  props: ["data"]
})
</script>
