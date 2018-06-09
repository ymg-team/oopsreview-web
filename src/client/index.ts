import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './vuex/store'

// routes declaration
export const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  template: '<router-view />'
})
