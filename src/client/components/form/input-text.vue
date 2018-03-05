<template lang="pug">
  .form-input
    label(:for='name') {{ label }}
    input(
      :type='type' 
      :id='name' 
      :name='name'
      :value='data[name] || ""'
      v-on:keyup='onchange'
      ) 

    //- show message if input not valid
    .message(v-if='validation.result && validation.result[name] != undefined && !validation.result[name].is_valid') 
      small {{ validation.result[name].message }}
</template>

<script lang="ts">
  import Vue from 'vue'

  const props = {
    // name of input
    name: {
      type: String
    },
    label: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    // value of input
    value: {
      type: String
    },
    // maximal value of input
    maxVal: {
      type: Number
    },
    // minimal value of input
    minVal: {
      type: Number
    },
    // validation object result
    validation: {
      type: Object,
      default() {
        return {}
      }
    },
    // data of form
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    // handle change value
    onchange: {
      type: Function,
      default() {
        console.log('changed')        
      }
    }
  }

export default Vue.extend({
  name: 'input-text',
  props
})
</script>


<style lang="sass" scoped>
@import '../../../design/sass/form'
@import '../../../design/sass/color'

.form-input
  input
    padding: .5em
    font-size: 1.5em
    width: -webkit-fill-available
    margin-bottom: .3em
</style>
