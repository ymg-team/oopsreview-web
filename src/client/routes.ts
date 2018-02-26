import Home from './containers/home/index.vue'
import Error from './containers/error/index.vue'
import Post from './containers/post/index.vue'

import DefaultLayout from './layouts/default.vue'
import ErrorLayout from './layouts/error.vue'

export default [
  { 
    path: '/', 
    component: DefaultLayout, 
    children : [
      { path: '/', component: Home },
      { path: '/post/:title-:id', component: Post}
    ]
  },
  { 
    path: '*', 
    component:  ErrorLayout,
    children : [
      { path: '*', component: Error }
    ]
  }
]