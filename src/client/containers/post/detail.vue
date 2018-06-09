<template lang="pug">
  .post-detail.bg-white
    .container
      .grid
        .col-12
          h1 This is Post Title You Want to See
          p By 
            router-link(to='/author/yussan') Yusuf Akhsan Hidayat
            | &nbsp;|
            | 26 January 2019, 14:00 WIB
            br
            | Posted in 
            router-link(to='/tag/macos') MacOS 
            router-link(to='/tag/cloud') Cloud
      
      .grid 
        .col-8_md-12
          article
            img(src='/images/sample.jpg')
            h2 Introduction
            p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu dignissim ex. Morbi eu viverra dui. Nam sit amet ante malesuada, elementum nisl id, egestas nibh. Nam nisl libero, iaculis eget dui id, malesuada posuere tellus. Aliquam in purus at lorem commodo pulvinar. Donec iaculis ex in neque consectetur, sit amet placerat dui feugiat. Aenean eu sollicitudin nunc, sit amet tincidunt lectus. Suspendisse vestibulum ut erat ut ultricies. Nulla vel scelerisque tortor. Phasellus tempus ipsum quis arcu vehicula dignissim. Ut aliquam imperdiet placerat. Ut nec pretium arcu. Cras congue, nisl ut ullamcorper tincidunt, magna orci iaculis mauris, eget malesuada mauris eros condimentum ante. In iaculis turpis sit amet purus volutpat facilisis.
            img(src='/images/sample.jpg')
            p Cras placerat, ante in blandit scelerisque, ligula lacus efficitur neque, nec sodales ipsum est ullamcorper urna. Sed imperdiet risus quis faucibus blandit. Vestibulum id iaculis nisl. Aliquam rhoncus tincidunt ipsum, sit amet congue risus semper ac. Vivamus risus leo, dignissim eu accumsan sollicitudin, euismod vitae mi. Aliquam id vestibulum massa, quis vehicula neque. Maecenas et nibh nec magna accumsan gravida.
            p Nunc eget ligula efficitur, pellentesque nibh sed, posuere lectus. Nam dictum, enim sit amet gravida commodo, metus nulla malesuada nisl, in pulvinar lorem mauris sit amet purus. Praesent at malesuada eros. Suspendisse mattis est nulla, non dictum felis fringilla quis. Proin rhoncus, magna quis fringilla pulvinar, ligula erat fringilla leo, non tempor nisi lorem eget nibh. Morbi et porttitor sem, a semper turpis. Phasellus eget lorem efficitur, efficitur tellus varius, ullamcorper diam. Nunc suscipit dui quis turpis imperdiet accumsan. Cras vitae ornare dolor. Praesent cursus purus at sem dignissim malesuada. Pellentesque aliquet malesuada libero, eu pellentesque nibh tincidunt ac. Praesent ac dolor finibus, eleifend sem vel, mollis orci. Praesent enim lectus, commodo cursus felis eu, porttitor tristique turpis. Sed malesuada ipsum turpis, tristique rhoncus enim maximus nec. Vestibulum ac ullamcorper nulla, at dapibus est.
            p Vivamus sagittis eleifend nisl, vel sollicitudin mauris iaculis eget. Pellentesque interdum semper aliquam. Maecenas tristique luctus massa vel dignissim. Ut sit amet tincidunt erat. Vestibulum rhoncus vulputate turpis ac facilisis. Maecenas varius, quam nec volutpat faucibus, libero ante consequat nulla, auctor congue dolor ante eget nisl. Suspendisse vehicula quam eu dui laoreet, sit amet fermentum est blandit. Duis vel est dui. Phasellus eget augue nec lectus tincidunt laoreet. Nam sed facilisis nunc. Vestibulum magna mi, aliquet sed nibh ac, tempus fermentum lectus. Donec malesuada libero nisl, at semper urna efficitur ut. Proin maximus bibendum risus aliquam vulputate.
            h2 Conclusion
            p Nunc tincidunt condimentum magna nec feugiat. Morbi in est at ipsum cursus pharetra. Integer porttitor posuere tortor ac sollicitudin. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vestibulum mauris et velit volutpat posuere id et odio. Nam finibus tristique justo, sit amet fermentum dolor laoreet vel. Quisque quis lectus eu leo eleifend tincidunt. Aliquam ultrices efficitur risus, in pellentesque erat tincidunt non. Nullam massa magna, semper tincidunt erat nec, feugiat molestie lectus. Donec orci tortor, iaculis at urna vel, consectetur placerat eros. Integer commodo pretium augue eget blandit. Mauris cursus metus et justo finibus scelerisque. Aliquam sollicitudin tellus ut libero volutpat, quis pretium libero iaculis. Etiam pharetra elit ex, non ornare tortor lobortis vitae. Fusce bibendum diam quis tortor fermentum, eget sagittis justo porta.
        
        .col-4_md-12
          sidebar(:link='link')

      .grid 
        .col-8_md-12 
          comment(:link='link') 

      .grid.p-t-2 
        .col-8_md-12
          h2.title-menu The Latest
          box-post


</template>

<script lang="ts">
import Vue from "vue"
import sidebar from "../../components/sidebar.vue"
import comment from "../../components/boxs/comment.vue"
import host from "../../../config/host"
import post from "../../components/boxs/post.vue"

Vue.component("sidebar", sidebar)
Vue.component("comment", comment)
Vue.component("box-post", post)

export default Vue.extend({
  name: "post-detail",
  data() {
    return {
      link: `/post/${this.title}-${this.id}`
    }
  },
  props: ["title", "id"]
})
</script>

<style lang="sass" scoped>
@import '../../../design/sass/size'
@import '../../../design/sass/color'

.post-detail
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
