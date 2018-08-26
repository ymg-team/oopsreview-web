<template lang="pug">
  a(href="javascript:;" v-on:click="() => handleClick()") {{ text }}
</template>

<script lang="ts">
  import Vue from "vue"
  import swal from "sweetalert"

  export default Vue.extend({
    name: "btn_delete",
    props: ["action", "text"],
    methods: {
      handleClick() {
        swal("Are you sure you want to do this?", {
          buttons: ["Cancel!", true]
        }).then(agree => {
          if(agree)
            return this.action()
        })
      }
    }
  })
</script>
