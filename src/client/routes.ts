import Home from './containers/home/index.vue'
import Error from './containers/error/index.vue'
import Post from './containers/post/index.vue'
import PostDetail from './containers/post/detail.vue'

import DefaultLayout from './layouts/default.vue'
import ErrorLayout from './layouts/error.vue'

export default [
  { 
    path: '/', 
    component: DefaultLayout, 
    children : [
      { path: '/', component: Home },
      { path: '/post', component: Post },
      { path: '/search', component: Post },
      { path: '/post/:title-:id', component: PostDetail }
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