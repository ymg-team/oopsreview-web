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
            v-if='formvalidate.is_valid == false' 
            type='error'
            message='form not valid'
            )
          div(style='padding:.5em')
          submit.blue(
            :loading="auth.loading || (auth.response.status && auth.response.status === 201)"
            :onclick='handleSubmit'
            :value='auth.loading || (auth.response.status && auth.response.status === 201) ? "loading..." : "Go inside !"'
          )
</template>

<script lang="ts">
import Vue from "vue"
import text from "../../components/form/input-text.vue"
import button from "../../components/form/button.vue"
import alert from "../../components/cards/alert.vue"
import toast from "../../modules/toast"
import * as TYPES from "../../vuex/types"
import { validation } from "../../modules/form"
import { router } from "../../index"
import { mapState } from "vuex"

const rules = {
  username: "required",
  password: "required"
}

Vue.component("input-text", text)
Vue.component("submit", button)
Vue.component("alert", alert)

export default Vue.extend({
  name: "auth",

  data() {
    return {
      formdata: <any>{},
      formvalidate: <any>{},
      validation: new validation(rules)
    }
  },

  methods: {
    handleChangeText(e: any) {
      const { name, value } = e.target

      if (e.keyCode === 13) {
        return this.handleSubmit()
      }

      let nextformdata: any = this.formdata
      nextformdata[name] = value
      const validate = this.validation.validate(this.formdata)
      console.log('validate', validate)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate
    },

    handleSubmit() {
      this.formvalidate = this.validation.validate(this.formdata)
      if (this.formvalidate.is_valid) {
        // router.push({ path: "/super/posts" })
        const { username, password } = this.formdata
        console.log("login super page...")
        this.$store.dispatch(TYPES.LOGIN, { email: username, password })
      } else {
        console.log("form not valid", this.formvalidate)
      }
    }
  },

  computed: {
    ...mapState(["auth"])
  },

  watch: {
    ["auth.response"](): any {
      if (this.auth.response.status) {
        if (this.auth.response.status === 201) {
          toast("Login success", "success")
          setTimeout(() => {
            location.href= "/super/posts"
          }, 1000)
        } else {
          toast("username and password not match, please try again", "error")
        }
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
