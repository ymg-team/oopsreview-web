<template lang="pug">
  .grid-center
    .col-4_md-12.p-0
      .login
        h1 Authentication 
        form.form(method='post' action='javascript:;') 
          input-text(
            label='Your Username'
            name='username' 
            :data='formdata' 
            :validation='formvalidate'
            :onchange='handleChangeText')
          input-text(
            label='Your Password'
            name='password' 
            type='password' 
            :data='formdata' 
            :validation='formvalidate'
            :onchange='handleChangeText')
          alert(
            v-if='formvalidate.isValid == false' 
            type='error'
            message='form not valid'
            )
          div(style='padding:.5em')
          submit.blue(
            :onclick='handleSubmit'
            value='Go inside !'
          )
</template>

<script lang="ts">
import Vue from 'vue'
import text from '../../components/form/input-text.vue'
import button from '../../components/form/button.vue'
import alert from '../../components/cards/alert.vue'
import { validation } from '../../modules/form'
import { router } from '../../index.ts'

const rules = {
  username: 'required',
  password: 'required'
}

Vue.component('input-text', text)
Vue.component('submit', button)
Vue.component('alert', alert)

export default Vue.extend({
  name: 'auth',
  
  data() {
    return {
      formdata: <any>{},
      formvalidate: <any>{} ,
      validation: new validation(rules)
    }
  },

  methods: {
    handleChangeText(e: any) {
      const { name, value } = e.target
      let nextformdata: any = this.formdata
      nextformdata[name] = value
      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = this.validation.validate(this.formdata)
    },

    handleSubmit() {
      this.formvalidate = this.validation.validate(this.formdata)
      if(this.formvalidate.isValid) 
      {
        router.push({path: '/super/posts'})
      }
    }
  }
})
</script>


<style lang="sass" scoped>
  @import '../../../design/sass/color'
  .login
    color: $color-white-main
    padding: 2em .5em
</style>
