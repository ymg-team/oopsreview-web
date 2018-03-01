<template lang="pug">
  footer 
    .container-medium 
      .grid
        .col-6_sm-12
          .link-collection 
            router-link(to='/static/about') About Oopsreview 
            | |&nbsp;
            router-link(to='/static/') Privacy
          p
            strong Oopsreview 
            | Software Review Specialist
            br 
            | Powered by 
            a(href='https://byidmore.com' target='_blank') IdMore
</template>

<style lang="sass" scoped>
  @import '../../design/sass/color'

  footer 
    border-top: 1px solid $color-gray-medium
    padding: 2em 0
    background-color: $color-black-main
    color: $color-gray-soft
    font-weight: 300
    a 
      color: $color-gray-soft
      &:hover
        color: $color-white-main
</style>

