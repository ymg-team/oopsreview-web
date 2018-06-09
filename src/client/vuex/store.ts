import Vue from 'vue'
import Vuex from 'vuex'

import post from '../containers/post/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post
  }
  // strict: process.env.NODE_ENV !== 'production'
})
